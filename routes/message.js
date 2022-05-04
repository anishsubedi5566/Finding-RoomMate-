const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const postMessage = data.message;
const router = express.Router();
// import date from 'date-and-time';
// const now = new Date();
// import date from 'date-and-time';

// router.get("/", async (req, res) => {
//   const allPost = await postRoomData.getPost();
//   res.render("post/postRoom", { allpost: allPost });
// });

router.post("/", async (req, res) => {
    let {message, messageTo} = req.body
    let sendBy = req.session.user.username
    receivedBy = messageTo,
    // date = date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
    date = new Date()
    console.log(sendBy, receivedBy, message,date)
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
