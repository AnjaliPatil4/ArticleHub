import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const NoteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {}; // Get note from state

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
          justifyContent: "center",
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
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: -20,
            backgroundColor: "#b958bf", // Light background for the tag
            padding: "4px 8px",
            borderRadius: "4px",
            boxShadow: 1, // Optional shadow for better visibility
            zIndex: 10, // Ensures the tag is above the card
          }}
        >
          <Typography variant="h6" color="text.primary">
            {note.tag}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NoteDetails;
