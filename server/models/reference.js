const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const referenceSchema = mongoose.Schema({
  id: String,
  // abstractText: String,
  firstAuthorsForView: Array,
  lastAuthorForView: Array,
  tags: Array,
  title: String,
  pdfResource: Map,
  publishedYear: Number,
  publicationInfo: String,
});

referenceSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

referenceSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "title",
      minSize: 2,
      weight: 5,
      prefixOnly: true,
    },
    {
      name: "publicationInfo",
      minSize: 2,
      weight: 5,
      prefixOnly: true,
    },
  ],
});

module.exports = mongoose.model("Reference", referenceSchema);
