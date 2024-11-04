import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

const CardsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const category = location.state?.category || "general"; // Default to "general"
  const query = location.state?.query;
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (query) {
          response = await fetch(
            `https://newsapi.org/v2/everything?q=${query}&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe`
          );
        } else if (category === "top") {
          response = await fetch(
            `https://newsapi.org/v2/everything?sortBy=popularity&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe`
          );
        } else if (category === "latest") {
          response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe`
          );
        } else {
          response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe`
          );
        }
        const data = await response.json();

        // Filter out articles with null values for `urlToImage`, `title`, or `description`
        const validArticles = data.articles.filter(
          (article) =>
            article.urlToImage && article.title && article.description
        );

        setArticles(validArticles);
      } catch (error) {
        console.error("Error fetching articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [category]); // Re-fetch articles if the category changes

  if (loading) {
    return <div>Loading...</div>;
  }

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return title;
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }
    return description;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {/* Wrap the Card in an anchor tag to make it clickable */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card style={{ height: "350px" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={article.urlToImage}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {truncateTitle(article.title)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateDescription(article.description)}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CardsPage;
