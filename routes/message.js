const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const postMessage = data.message;
const router = express.Router();

router.get("/", async (req, res) => {
  const allMessage = await postMessage.getPost(req.session.user.username);
//   res.render("post/postRoom", { allpost: allPost });
res.render("message/message", {allMessage: allMessage});
});

router.post("/", async (req, res) => {
    let {message, messageTo} = req.body
    let sendBy = req.session.user.username
    receivedBy = messageTo,
    date = new Date()
  try {
    const output = await postMessage.createMessage(
        message,
        receivedBy,
        sendBy,
        date
    );
    if (output) {
      res.redirect("/private");
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };
      res.status(400).render("post/postRoom", out);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

module.exports = router;
