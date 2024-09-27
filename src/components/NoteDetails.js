// NoteDetails.jsx
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
  Rating,
} from "@mui/material";

import PostComment from "./PostComment"; // Import the PostComment component

const NoteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {};
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `http://localhost:5000/api/comments/note/${note._id}`;
        const response = await fetch(url, { method: "GET" });
        const json = await response.json();

        const formattedComments = json.map((comment) => ({
          name: comment.user.name,
          content: comment.content,
          rating: comment.rating || 3,
        }));

        setComments(formattedComments);
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

  // Function to handle adding a new comment
  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
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
              {note.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
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
            comments.map(({ name, content, rating }, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h9" component="div">
                      {name || "Anonymous"}
                    </Typography>
                    <Rating value={rating} readOnly sx={{ mt: 1 }} />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {content}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center">No comments yet.</Typography>
          )}

          {/* Use the PostComment component */}
          <PostComment noteId={note._id} onCommentAdded={handleCommentAdded} />
        </Box>
      </Box>
    </Container>
  );
};

export default NoteDetails;
