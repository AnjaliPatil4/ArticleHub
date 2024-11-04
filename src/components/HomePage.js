import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import imageNotes from "./lovely-flowers-concept-with-modern-notebook (1).jpg";
import News from "./News";

const HomePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [scrollIndexArticles, setScrollIndexArticles] = useState(0);
  const [scrollIndexNotes, setScrollIndexNotes] = useState(0);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notes/allnotes"
        );
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handlePrevClickNotes = () => {
    setScrollIndexNotes((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClickNotes = () => {
    setScrollIndexNotes((prevIndex) =>
      prevIndex < Math.ceil(notes.length / 4) - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const visibleNotes = notes.slice(
    scrollIndexNotes * 4,
    (scrollIndexNotes + 1) * 4
  );

  const handleViewDetails = (note) => {
    navigate("/note-details", { state: { note } });
  };

  return (
    <>
      <div
        style={{
          marginTop: "-47px",
          marginBottom: "20px",
          width: "119%",
          overflow: "hidden",
          marginLeft: "-110px",
          marginRight: "1px",
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={imageNotes}
          alt="Hero Image"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </div>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        Latest Articles
      </Typography>

      <div>
        <News />
      </div>

      <Typography
        variant="h4"
        component="h5"
        gutterBottom
        style={{
          display: "flex",
          marginBottom: "20px",
          marginTop: "50px",
          marginLeft: "50px",
          fontSize: "30px",
          justifyContent: "center",
        }}
      >
        Read from Article Hub...
      </Typography>

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={handlePrevClickNotes}
          disabled={scrollIndexNotes === 0}
        >
          <ArrowBackIos />
        </IconButton>

        <div
          style={{
            display: "flex",
            overflow: "visible",
            width: "100%",
            justifyContent: "space-between",
            height: "300px",
          }}
        >
          {visibleNotes.map((note, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                flex: "1 1 25%",
                margin: "0 10px",
                height: "300px",
                overflow: "visible",
                cursor: "pointer",
              }}
              onClick={() => handleViewDetails(note)}
            >
              {/* Updated Floating Tag using Material-UI Typography */}
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "white",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "5px",
                  padding: "5px 10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {note.tag || "Default"}
              </Typography>

              <Card style={{ minHeight: "150px" }}>
                {note.urlToImage && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={note.urlToImage}
                    alt={note.title}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{
                      // justifyContent: "center",
                      display: "flex",
                      marginBottom: "20px",
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.description?.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <IconButton
          onClick={handleNextClickNotes}
          disabled={scrollIndexNotes === Math.ceil(notes.length / 4) - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </>
  );
};

export default HomePage;
