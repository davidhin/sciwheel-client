const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  id: String,
  annotationId: String,
  color: String,
  created: Number,
  libraryItem: Map,
  quote: String,
  text: String,
  uri: String,
});

commentSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
