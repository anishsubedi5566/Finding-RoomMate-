// const express=require('express');
// const router=express.Router();
// const data=require("../data");
// const postRoomateData=data.postsRoomate;
// const postsRoomData=data.postsRoom;

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("find/findPost");
});

router.get("/searchbyCity", async (req, res) => {
  res.render("find/searchbyCity");
});

router.post("/searchbyCity", async (req, res) => {
  const city=req.body.city;
  
  //check if city is provided and valid
  if(!city || city.trim().length===0){
    res.status(400).render("find/searchbyCity",{error:'Enter valid city name'})
    return
  }

  

})

module.exports = router;
