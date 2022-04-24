const express = require("express");
const data = require("../data");
const postData = data.postData;
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("post");
});

router.post("/", async (req, res) => {
    const { postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments } = req.body;

    try {
      const output = await postData.createPost(postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments);
      if (output) {
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
