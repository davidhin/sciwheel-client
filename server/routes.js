var express = require("express");
var ctrl = require("./controller");

var router = express.Router();
router.route("/sync").get(ctrl.sync);
router.route("/search").post(ctrl.search);

module.exports = router;
