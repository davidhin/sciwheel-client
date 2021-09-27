var express = require("express");
var citCtrl = require("./controllers/citationController");

var router = express.Router();

router.route("/citation").get(citCtrl.getCitation);

module.exports = router;
