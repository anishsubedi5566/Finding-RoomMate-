
const express = require("express");
const constructorMethod = require(".");
const data = require("../data");
const postMessage = data.message;
const router = express.Router();
const xss = require('xss')

router.get("/", async (req, res) => {
  const allMessage = await postMessage.getMessage(req.session.user.username);

  if(allMessage == [] || allMessage == ""){
    res.status(200).render("message/message", { noMessage: "There is no message"
    });
  }


  res.status(200).render("message/message", {allMessage: allMessage
  });


});

router.get("/groupmessage", async (req, res) => {
  res.status(200).render("message/groupmessage");
});

router.post("/groupmessage", async (req, res) => {
  
  let allUserArray = req.body.sendto.split(",");
  let output;
  let sendBy = req.session.user.username;
  let date = new Date()
  let message = req.body.message
  let i = 0
  let receivedBy;

try {
  if (xss(req.body.sendto.length < 1)) throw "Send field cannot be empty"
  if (xss(req.body.message < 1)) throw "Send message cannot be empty"
  allUserArray = allUserArray.map(each =>each.trim(each))
   allUserArray = allUserArray.filter(element => {
    return element !== '';
  });

  

  for(i = 0 ; i < allUserArray.length ; i++){
  receivedBy = allUserArray[i]
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
    const out = { errors: e };
    console.log("error", e)
    res.status(400).render("message/groupmessage", {e:e});
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
    if(!req.params.id) throw "Id cannot be empty"
    if(typeof req.params.id !== "string") throw "Id cannot be empty"
    const allMessage = await postMessage.getSpecificMessage(req.params.id);
    console.log("allMessage",allMessage)
    if(allMessage.length < 1) {
      res.render("message/individualMessage", {message: "No conversation is found"});
    }
    res.render("message/individualMessage", {allMessage: allMessage,
      sender: allMessage[0].sendBy,
      receiver: allMessage[0].receivedBy});
    }
    catch (e) {
    if (e) {
      const out = { errors: e };
      console.log("error", e)
      res.status(400).render("message/groupmessage", {e:e});
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  });


router.post("/", async (req, res) => {
  try {
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