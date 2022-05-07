
const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const postMessage = data.message;
const router = express.Router();

router.get("/", async (req, res) => {
  
  const allMessage = await postMessage.getMessage(req.session.user.username);
  
  res.render("message/message", {allMessage: allMessage,
   sender: allMessage[0].sendBy,
     receiver: allMessage[0].receivedBy
  });
});

router.get("/groupmessage", async (req, res) => {
  
  // const allMessage = await postMessage.getMessage(req.session.user.username);
  
  res.render("message/groupmessage");
});

router.post("/groupmessage", async (req, res) => {
  
  const allUserArray = req.body.sendto.split(" ");
  for(let i = 0 ; i < allUserArray.length -1 ; i++){
try {
  console.log("passed one")
  sendBy = req.session.user.username;
  date = new Date()
  message = req.body.message
  receivedBy = allUserArray[i]
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
  }
  res.render("message/groupmessage");
});

router.get("/viewall/:id", async (req, res) => {
  const allMessage = await postMessage.getSpecificMessage(req.params.id);
  
res.render("message/individualMessage", {allMessage: allMessage,
  sender: allMessage[0].sendBy,
  receiver: allMessage[0].receivedBy});
});

router.post("/", async (req, res) => {

    let {message, messageTo,sender,receiver} = req.body
    let sendBy, receivedBy
    if(req.body.messageTo){
      sendBy = req.session.user.username;
      receivedBy = messageTo
    }
    if(req.body.sender || req.body.receiver){
      sendBy =sender;
      receivedBy = receiver
    }

    sendBy = req.session.user.username;
    if(sendBy){
      if(sendBy == sender){
        receivedBy = receiver
      }
      else{
        receivedBy = sender
      }
    }
    
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