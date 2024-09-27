// PostComment.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostComment = ({ noteId, onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Handle form submission for adding a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent || rating === 0) {
      setError("Please add a comment and select a rating.");
      return;
    }

    try {
      const url = `http://localhost:5000/api/comments/add/${noteId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ content: commentContent, rating }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to post comment.");
      }

      const newComment = {
        name: json["user-name"], // Extract the user name
        content: json.comment.content, // Extract the content of the comment
        rating: json.comment.rating, // Extract the rating
      };

      onCommentAdded(newComment); // Notify parent component about the new comment
      setCommentContent(""); // Clear the input field
      setRating(0); // Reset the rating
      setError("");
    } catch (err) {
      setError("Failed to post comment.");
      console.error(err);
    }
  };

  if (!token) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
        You need to <Button onClick={() => navigate("/login")}>log in</Button>{" "}
        to add a comment.
      </Typography>
    );
  }

  return (
    <Card
      component="form"
      onSubmit={handleCommentSubmit}
      sx={{
        mt: 3,
        width: "100%",
        textAlign: "center",
        outline: "1px solid #ccc",
        padding: 2,
      }}
    >
      <Rating
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="secondary">
        Submit Comment
      </Button>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Card>
  );
};

export default PostComment;
