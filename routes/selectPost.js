const express = require("express");
const data = require("../data");
const postData = data.posts;
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("post/selectpost");
});

module.exports = router;
