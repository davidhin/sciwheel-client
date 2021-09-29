const Tag = require("./models/tag");
const Reference = require("./models/reference");
const Comment = require("./models/comment");
const sciwheel = require("./sciwheel");

module.exports = {
  search: async function (req, res) {
    let query = req.body["text"];
    let tags = await Reference.find({
      $or: [
        { abstractText: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });
    return res.json(tags);
  },

  sync: async function func(req, res) {
    let username = "";
    let password = "";
    let cookie = await sciwheel.cookie(username, password);
    let tags = await sciwheel.tags(cookie);
    let references = await sciwheel.references(cookie);
    let comments = await sciwheel.comments(cookie);
    await Comment.remove();
    await Comment.create(comments);
    console.log("Synced comments.");
    await Reference.remove();
    await Reference.create(references);
    console.log("Synced references.");
    await Tag.remove();
    await Tag.create(tags);
    console.log("Synced tags.");
    return res.json(references);
    return res.status(200).send({ message: "Successfully synced." });
  },
};
