const express = require("express");
const data = require("../data");
const postData = data.postData;
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("post");
});

router.post("/", async (req, res) => {
    const { postDate, sizeOfApartment, numberOfRooms, city, state, comments } = req.body 
    try {
    if(!postDate) throw "postDate is empty"
    if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    if(!city || typeof city != "string" || city == " ") throw "Enter city"
    if(!state || typeof state != "string" || state == " ")  throw "Enter state"
    
    let petsAllowed = coupleAllowed = parkingAvailable = sharingAllowed = false;

    if(req.body.petsAllowed){
      petsAllowed = true
    }
    if(req.body.coupleAllowed){
      coupleAllowed = true
    }
    if(req.body.parkingAvailable){
      parkingAvailable = true
    }
    if(req.body.sharingAllowed){
      sharingAllowed = true
    }
      const output = await postData.createPost(postDate, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms, sharingAllowed, city, State, comments);
      if (output) {
        res.redirect("/post");
      }
    } catch (e) {
      if (e) {
        const out = { errors: e };
        res.status(400).render("post", out);
        return;
      } else {
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  });

module.exports = router;
