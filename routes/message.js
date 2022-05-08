const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const userData = data.users;
const postMessage = data.message;
const router = express.Router();
const xss = require("xss");

router.get("/", async (req, res) => {
  const allMessage = await postMessage.getMessage(req.session.user.username);

  if (allMessage == [] || allMessage == "") {
    res.status(200).render("message/message", {
      title: "Conversations",
      noMessage: "There is no message",
    });
    return;
  }

  res.status(200).render("message/message", {
    title: "Conversations",
    allMessage: allMessage,
  });
});

router.get("/groupmessage", async (req, res) => {
  res
    .status(200)
    .render("message/groupmessage", { title: "Group Conversations" });
});

router.post("/groupmessage", async (req, res) => {
  let allUserArray = xss(req.body.sendto).split(",");
  let output;
  let sendBy = req.session.user.username;
  let date = new Date().toDateString();
  let message = xss(req.body.message);
  let i = 0;
  let receivedBy;

  try {
    if (xss(req.body.sendto.length < 1)) throw "Send field cannot be empty";
    if (xss(req.body.message < 1)) throw "Send message cannot be empty";

    allUserArray = allUserArray.map((each) => each.trim(each));
    allUserArray = allUserArray.filter((element) => {
      return element !== "";
    });

    for (let i = 0; i < allUserArray.length; i++) {
      await userData.getUserByUsername(allUserArray[i]);
    }

    for (i = 0; i < allUserArray.length; i++) {
      receivedBy = allUserArray[i];
      output = await postMessage.createMessage(
        message,
        receivedBy,
        sendBy,
        date
      );
    }
    if (output) {
      res.redirect("/private/message");
    }
  } catch (e) {
    if (e) {
      console.log("error", e);
      res
        .status(400)
        .render("message/groupmessage", { title: "Error", error: e });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.get("/viewall/:id", async (req, res) => {
  try {
    if (!req.params.id) throw "Id cannot be empty";
    if (typeof req.params.id !== "string") throw "Id cannot be empty";
    const allMessage = await postMessage.getSpecificMessage(req.params.id);
    if (allMessage.length < 1) {
      res.render("message/individualMessage", {
        message: "No conversation is found",
      });
    }
    let array = req.params.id.split("-");
    let senderinfo = req.session.user.username;
    let receiver;
    if (array[0] == senderinfo) {
      receiver = array[1];
    } else {
      receiver = array[0];
    }

    res.render("message/individualMessage", {
      title: "Conversations",
      allMessage: allMessage,
      sender: senderinfo,
      receiver: receiver,
    });
  } catch (e) {
    if (e) {
      const out = { errors: e };
      console.log("error", e);
      res
        .status(400)
        .render("message/groupmessage", { title: "Error", error: e.message });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.post("/", async (req, res) => {
  let message = xss(req.body.message);
  let receivedBy = xss(req.body.receiver);
  let sendBy = xss(req.body.sender);
  try {
    if (!message || typeof message != "string") throw "must have message";
    if (!receivedBy || typeof receivedBy != "string")
      throw "must have receiver name";
    if (!sendBy || typeof sendBy != "string") throw "must have sender name";

    date = new Date().toDateString();
    const output = await postMessage.createMessage(
      message,
      receivedBy,
      sendBy,
      date
    );

    if (output) {
      res.redirect(`/private/message/viewall/${sendBy}-${receivedBy}`);
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };

      res.redirect(`/private/message/viewall/${sendBy}-${receivedBy}`);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.post("/indi", async (req, res) => {
  try {
    let message = xss(req.body.message);
    let receivedBy = xss(req.body.receiver);

    if (!message || typeof message != "string") throw "must have message";
    if (!receivedBy || typeof receivedBy != "string")
      throw "must have receiver name";

    let sendBy = req.session.user.username;

    date = new Date().toDateString();
    const output = await postMessage.createMessage(
      message,
      receivedBy,
      sendBy,
      date
    );

    if (output) {
      res.redirect("/private/message");
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };
      res
        .status(400)
        .render("post/postRoom", { title: "Error", error: e.message });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

module.exports = router;
