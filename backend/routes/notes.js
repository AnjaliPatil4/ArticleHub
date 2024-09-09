const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1 : Get all notes of LoggedIn User using GET "/api/notes/fetchnotes". Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    return res.status(500).send("Internal Server Error 1");
  }
});

//Route 2 : Add new notes using POST: "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter correct name").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      const notes = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });
      res.json(notes);
    } catch (error) {
      return res
        .status(500)
        .send({ errors: error.message, message: "Internal Server Error 2" });
    }
  }
);

//Route 3 : Update a existing note using PUT: "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    //if note is not found then return
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //if user is not the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    const newnote = {};
    const { title, description, tag } = req.body;
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    return res
      .status(500)
      .send({ errors: error.message, message: "Internal Server Error 2" });
  }
});

//Route 4 : delete a existing note using DELETE: "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    //if note is not found then return
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //if user is not the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ sucess: "Successfully Note is deleted", note: note });
  } catch (error) {
    return res
      .status(500)
      .send({ errors: error.message, message: "Internal Server Error 2" });
  }
});

module.exports = router;
