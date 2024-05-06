const ConnectToMongo = require("./db");
const express = require("express");

ConnectToMongo();

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
