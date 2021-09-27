const Citation = require("../models/citation");

module.exports = {
  getCitation: async function (req, res) {
    await Citation.updateOne(
      { title: "car2" },
      {
        $set: {
          title: "car2",
          author: ["Someone", "Someone2"],
        },
      },
      { upsert: true }
    );
    citations = await Citation.find({});
    res.json(citations);
  },
};
