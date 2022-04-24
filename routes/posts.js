const express = require("express");
// const data = require("../data");
// const userData = data.users;
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("post");
});








module.exports = router;
