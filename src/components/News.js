import React, { useState } from "react";
import { TextField } from "@mui/material";
import lastest from "../assets/Screenshot 2024-10-23 121133.png";
import img1 from "../assets/Screenshot 2024-10-23 121827.png";
import img2 from "../assets/Screenshot 2024-10-23 121711.png";
import img3 from "../assets/Screenshot 2024-10-23 121737.png";
import img4 from "../assets/Screenshot 2024-10-23 121747.png";
import img5 from "../assets/Screenshot 2024-10-23 121800.png";
import img6 from "../assets/Screenshot 2024-10-23 121819.png";
import { useNavigate } from "react-router-dom";

const styles = {
  body: {
    backgroundColor: "white",
    margin: 0,
    padding: "40px",
    margin: "30px 90px",
    fontFamily: "Arial, sans-serif",
    borderRadius: "15px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginLeft: "10px",
    color: "#333",
    letterSpacing: "2px",
  },
  container: {
    display: "flex",
    flexWrap: "nowrap",
    gap: "20px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  contain: {
    display: "flex",
    flexWrap: "nowrap",
    gap: "15px",
    flexDirection: "column",
  },
  card: {
    position: "relative",
    width: "230px",
    height: "220px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  largeCard: {
    marginLeft: "15px",
    marginTop: "20px",
    width: "400px",
    height: "420px",
    flexShrink: 0,
    fontSize: "40px",
  },
  smallCardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    fontSize: "25px",
  },
  icon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#888",
  },
  lightblue: {
    backgroundColor: "#d6e8f7",
    color: "#d8b2d2",
  },
  orange: {
    backgroundColor: "#ef601e",
    color: "#d6e8f7",
  },
  brown: {
    backgroundColor: "#cb962e",
    color: "#f1dfb6",
  },
  beige: {
    backgroundColor: "#f1dfb6",
    color: "#ef601e",
  },
};

const Card = ({ style, text, image, onClick }) => (
  <div style={{ ...styles.card, ...style }} onClick={onClick}>
    <div style={styles.icon}>+</div>
    {image && (
      <img
        src={image}
        alt={text}
        style={{
          position: "absolute",
          top: "10px",
          width: "100px",
          height: "auto",
        }}
      />
    )}
    <div
      style={{
        position: "relative",
        margin: "70px 10px 10px 10px",
        padding: "0 10px",
      }}
    >
      {text}
    </div>
  </div>
);

const LargeCard = ({ style, text, image, onClick }) => (
  <div style={{ ...styles.card, ...style }} onClick={onClick}>
    <div style={styles.icon}>+</div>
    {image && (
      <img
        src={image}
        alt={text}
        style={{
          position: "absolute",
          top: "10px",
          width: "55%",
          height: "auto",
        }}
      />
    )}
    <div
      style={{
        position: "relative",
        margin: "150px 10px 10px 10px",
        padding: "0 10px",
      }}
    >
      {text}
    </div>
  </div>
);

const categories = {
  "Entertainment Buzz": "entertainment",
  "Health News": "health",
  "Trending News": "top",
  "Business Insights": "business",
  "Science & Tech": "science",
  "Sport Highlights": "sports",
  "Latest Updates": "latest",
};

const News = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardClick = (category) => {
    navigate("/cards", { state: { category } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    navigate("/cards", { state: { query: searchQuery } }); // Pass search query
  };
  return (
    <div style={styles.body}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={styles.header}>NEWS+</h1>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              width: "900px",
              height: "45px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "purple",
              color: "white",
              border: "none",
              borderRadius: "3px",
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div style={styles.container}>
        {/* Large card */}
        <LargeCard
          style={{ ...styles.lightblue, ...styles.largeCard }}
          text="Latest Updates"
          image={lastest}
          onClick={() => handleCardClick(categories["Latest Updates"])}
        />
        <div style={styles.contain}>
          <div style={styles.smallCardsContainer}>
            <Card
              style={styles.brown}
              text="Entertainment Buzz"
              image={img2}
              onClick={() => handleCardClick(categories["Entertainment Buzz"])}
            />
            <Card
              style={styles.beige}
              text="Health News"
              image={img3}
              onClick={() => handleCardClick(categories["Health News"])}
            />
            <Card
              style={styles.orange}
              text="Trending News"
              image={img4}
              onClick={() => handleCardClick(categories["Trending News"])}
            />
          </div>
          <div style={styles.smallCardsContainer}>
            <Card
              style={styles.orange}
              text="Business Insights"
              image={img1}
              onClick={() => handleCardClick(categories["Business Insights"])}
            />
            <Card
              style={styles.lightblue}
              text="Science & Tech"
              image={img6}
              onClick={() => handleCardClick(categories["Science & Tech"])}
            />
            <Card
              style={styles.brown}
              text="Sport Highlights"
              image={img5}
              onClick={() => handleCardClick(categories["Sport Highlights"])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
