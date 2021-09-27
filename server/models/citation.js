const mongoose = require("mongoose");

const citationSchema = mongoose.Schema({
  title: String,
  author: Array,
});

citationSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Citation", citationSchema);
