const express = require("express");
const data = require("../data");
const postRoomateData = data.postsRoomate;
const router = express.Router();


router.get("/", async (req, res) => {
    const allPost = await postRoomateData.getPost();
    res.render("post/postRoomate", {allpost : allPost});
});

router.post("/", async (req, res) => {
    const {postDate,title,street,city,state,roomsize,roomarea,rent,peoplelivingcurrently,otherdescription } = req.body 
    // console.log("routes/postRoomate",title,street,city,state,roomsize,roomarea,petsAllowed,parkingAvailable,sharingAllowed,rent,peoplelivingcurrently,otherdescription )
    try {
    // if(!title) throw "title is empty"
    // if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    // if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    // if(!city || typeof city != "string" || city == " ") throw "Enter city"
    // if(!state || typeof state != "string" || state == " ")  throw "Enter state"
    
    let petsAllowed  = parkingAvailable = sharingAllowed = false;
    user = req.session.user.username
    if(req.body.petsAllowed){
      petsAllowed = true
    }
    if(req.body.parkingAvailable){
      parkingAvailable = true
    }
    if(req.body.sharingAllowed){
      sharingAllowed = true
    }
  
   
      const output = await postRoomateData.createPost(user, postDate, title,street,city,state,roomsize,roomarea,petsAllowed,parkingAvailable,sharingAllowed,rent,peoplelivingcurrently,otherdescription);
      if (output) {
        res.redirect("/private/postRoomate");
      }
    } catch (e) {
      if (e) {
        const out = { errors: e };
        res.status(400).render("private/postRoomate", out);
        return;
      } else {
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  });

module.exports = router;
