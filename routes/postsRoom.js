const express = require("express");
const data = require("../data");
const postRoomData = data.postsRoom;
const router = express.Router();


router.get("/", async (req, res) => {
    const allPost = await postRoomData.getPost();
    res.render("post/postRoom", {allpost : allPost});
});

router.post("/", async (req, res) => {
    const { postDate, title, prefState, roomsize, budget,schoolName, otherdescription } = req.body 
    try {
    // if(!postDate) throw "postDate is empty"
    // if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    // if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    // if(!city || typeof city != "string" || city == " ") throw "Enter city"
    // if(!state || typeof state != "string" || state == " ")  throw "Enter state"
    
    let parkingAvailable = pets  = sharingAllowed =student= false;
    user = req.session.user.username
    if(req.body.parkingAvailable){
      parkingAvailable = true
    }
    if(req.body.pets){
      pets = true
    }
    if(req.body.sharingAllowed){
      sharingAllowed = true
    }

    if(req.body.student){
      student = true
    }
      const output = await postRoomData.createPost(user,postDate, title, prefState, roomsize, budget,schoolName, otherdescription,parkingAvailable,pets,parkingAvailable,sharingAllowed,student);
      if (output) {
        res.redirect("/private/postRoom");
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
