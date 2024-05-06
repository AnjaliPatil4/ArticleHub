const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017";

const ConnectToMongo = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
};

module.exports = ConnectToMongo;
