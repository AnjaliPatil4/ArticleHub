import React from "react";

const GetUser = () => {
  const getuserdata = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        // If the response is not OK, log the status and text
        console.error("Server error:", response.status, response.statusText);
        return;
      }

      const text = await response.text(); // Get response as text
      console.log("Response Text:", text);

      const json = JSON.parse(text); // Parse the text to JSON
      console.log(json);
    } catch (error) {
      // Catch and log any errors during fetch or parsing
      console.error("Error fetching or parsing data:", error);
    }
  };

  return (
    <div>
      <button className="btn" onClick={getuserdata}>
        GET User Data
      </button>
    </div>
  );
};

export default GetUser;
