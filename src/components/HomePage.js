import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import imageNotes from "./imageNotes.png";
const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [notes, setNotes] = useState([]); // Track scroll position
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notes/allnotes"
        );
        if (response.ok) {
          const data = await response.json();
          setNotes(data); // Assuming the API returns an array of notes
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe"
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handlePrevClick = () => {
    setScrollIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setScrollIndex((prevIndex) =>
      prevIndex < Math.ceil(articles.length / 4) - 1 ? prevIndex + 1 : prevIndex
    );
  };
  const handleNextClickNotes = () => {
    setScrollIndex((prevIndex) =>
      prevIndex < Math.ceil(notes.length / 4) - 1 ? prevIndex + 1 : prevIndex
    );
  };
  const visibleNotes = notes.slice(scrollIndex * 4, (scrollIndex + 1) * 4);
  const visibleArticles = articles.slice(scrollIndex * 4, scrollIndex * 4 + 4);

  return (
    <Container
      style={{
        padding: 0,
        width: "100%",
      }}
    >
      {/* Hero Image */}
      <div
        style={{
          marginTop: "-40px",
          marginBottom: "20px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="300"
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

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handlePrevClick} disabled={scrollIndex === 0}>
          <ArrowBackIos />
        </IconButton>

        <div
          style={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {visibleArticles.map((article, index) => (
            <Card
              key={index}
              style={{
                flex: "1 1 25%", // 25% of the container width for 4 cards in a row
                margin: "0 10px",
              }}
            >
              {article.urlToImage && (
                <CardMedia
                  component="img"
                  height="130"
                  image={article.urlToImage}
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="h2">
                  {article.title.substring(0, 30)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description?.substring(0, 30)}...
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <IconButton
          onClick={handleNextClick}
          disabled={scrollIndex === Math.ceil(articles.length / 4) - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
      <Typography
        variant="h4"
        component="h5"
        gutterBottom
        style={{
          display: "flex",
          // justifyContent: "center",
          marginBottom: "20px",
          marginTop: "30px",
          marginLeft: "50px",
          fontSize: "30px",
        }}
      >
        Read from Article Hub...
      </Typography>

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handlePrevClick} disabled={scrollIndex === 0}>
          <ArrowBackIos />
        </IconButton>

        <div
          style={{
            display: "flex",
            overflow: "visible",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {visibleNotes.map((note, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                flex: "1 1 25%", // 25% of the container width for 4 cards in a row
                margin: "0 10px",
                height: "300px",
                overflow: "visible",
              }}
            >
              {/* Floating Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "-6px",
                  left: "-15px",
                  backgroundColor: note.tagColor || "#b958bf", // Default color or dynamic color
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {note.tag || "Default"}
              </div>

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
                      justifyContent: "center",
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
          disabled={scrollIndex === Math.ceil(notes.length / 4) - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </Container>
  );
};

export default HomePage;
