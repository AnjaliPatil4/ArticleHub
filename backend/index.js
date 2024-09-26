const ConnectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
ConnectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/comments", require("./routes/comment"));
app.listen(port, () => {
  console.log(`NoteTracker is listening on port http://localhost:${port}`);
});
