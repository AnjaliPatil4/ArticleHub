const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Comment = require("../models/Comment");
const User = require("../models/User");
router.post("/add/:noteId", fetchuser, async (req, res) => {
  try {
    const { content } = req.body;
    const noteId = req.params.noteId;

    const comment = new Comment({
      content,
      user: req.user.id,
      // Add the user ID from the token
      note: noteId,
    });

    const savedComment = await comment.save();
    const user = await User.findById(req.user.id).select("name");
    console.log(req.user);
    res.json({ comment: savedComment, "user-name": user.name });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Fetch comments for a note
router.get("/note/:noteId", async (req, res) => {
  try {
    const comments = await Comment.find({ note: req.params.noteId }).populate(
      "user",
      "name"
    );
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a comment
router.delete("/delete/:commentId", fetchuser, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Ensure the comment belongs to the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await comment.remove();
    res.json({ msg: "Comment removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
