const mongoose = require("mongoose");

const referenceSchema = mongoose.Schema({
  id: String,
  abstractText: String,
  authors: Array,
  tags: Array,
  title: String,
  pdfResource: Map,
});

referenceSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Reference", referenceSchema);
