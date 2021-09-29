const mongoose = require("mongoose");

const citationSchema = mongoose.Schema({
  id: String,
  name: String,
  colour: String,
  itemCount: String,
});

citationSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Tag", citationSchema);
