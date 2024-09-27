const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const user = require("./User");
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema);
