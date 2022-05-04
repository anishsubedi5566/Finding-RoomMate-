const express = require("express");
const data = require("../data");
const userData = data.users;
const router = express.Router();
const xss = require("xss");
let { ObjectId } = require("mongodb");



router.route("/aboutUs").get(async (req, res) => {
  res.render("other/aboutNotAuth", { title: "About Us" });
});

module.exports = router;
