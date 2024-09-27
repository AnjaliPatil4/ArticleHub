const mongoose = require("mongoose");
const { Schema } = mongoose;
const user = require("./User");
const notes = require("./Notes");
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notes",
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comment", NotesSchema);
