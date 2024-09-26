import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";

const NoteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {};
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `http://localhost:5000/api/comments/note/${note._id}`;
        const response = await fetch(url, { method: "GET" });
        const json = await response.json();

        // Map through the comments to extract name and content
        const formattedComments = json.map((comment) => ({
          name: comment.user.name, // Get the user's name
          content: comment.content, // Get the comment content
        }));

        setComments(formattedComments); // Set the formatted comments
      } catch (err) {
        setError("Failed to fetch comments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (note) {
      fetchComments();
    }
  }, [note]);

  // Handle form submission for adding a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent) return;

    try {
      const url = `http://localhost:5000/api/comments/add/${note._id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ content: commentContent }), // Send only the content
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to post comment.");
      }

      // Construct the new comment object using the response
      const newComment = {
        name: json["user-name"], // Extract the user name
        content: json.comment.content, // Extract the content of the comment
      };

      setComments((prevComments) => [...prevComments, newComment]); // Update comments state
      setCommentContent(""); // Clear the input field
    } catch (err) {
      setError("Failed to post comment.");
      console.error(err);
    }
  };

  if (!note) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" color="text.secondary" align="center">
          No note data available
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {note.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {note.description}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ width: "100%", mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom align="center">
            Comments
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : comments.length > 0 ? (
            comments.map(({ name, content }, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h9" component="div">
                    {name || "Anonymous"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {content}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center">No comments yet.</Typography>
          )}

          {/* Comment input form, only visible if the user is logged in */}
          {token ? (
            <Box
              component="form"
              onSubmit={handleCommentSubmit}
              sx={{ mt: 3, width: "100%", textAlign: "center" }}
            >
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit Comment
              </Button>
            </Box>
          ) : (
            <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
              You need to{" "}
              <Button onClick={() => navigate("/login")}>log in</Button> to add
              a comment.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default NoteDetails;
