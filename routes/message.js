
const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const postMessage = data.message;
const router = express.Router();

router.get("/", async (req, res) => {
  const allMessage = await postMessage.getMessage(req.session.user.username);
  console.log("routes/message/message", allMessage[0].sendBy, allMessage[0].receivedBy)
  
  res.render("message/message", {allMessage: allMessage,
   sender: allMessage[0].sendBy,
     receiver: allMessage[0].receivedBy
  });
});


router.get("/viewall/:id", async (req, res) => {
  const allMessage = await postMessage.getSpecificMessage(req.params.id);
res.render("message/individualMessage", {allMessage: allMessage});
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
    console.log("posted routes", output)
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