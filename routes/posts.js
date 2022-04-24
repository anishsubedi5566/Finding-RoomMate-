const express = require("express");
const data = require("../data");
const postData = data.postData;
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("post");
});

router.post("/", async (req, res) => {
    console.log("Reached here",req.body)
    const { postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments } = req.body;
    
    console.log( postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments )

    try {
        console.log("Requesting createpost")
      const output = await postData.createPost(postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments);
        console.log("Post Posted", output)
      if (output) {
        console.log("Got output", output)
        res.redirect("/post");
      }
    } catch (e) {
      if (e) {
        const out = { errors: e };
        res.status(400).render("post");
        return;
      } else {
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  });





module.exports = router;
