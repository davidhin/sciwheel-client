const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

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

referenceSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "title",
      minSize: 3,
      weight: 5,
    },
  ],
});

module.exports = mongoose.model("Reference", referenceSchema);
