const express = require("express");
const data = require("../data");
const postRoomData = data.postsRoom;
const router = express.Router();

router.get("/", async (req, res) => {
  const allPost = await postRoomData.getPost();
  res.render("post/postRoom", { allpost: allPost });
});

router.post("/", async (req, res) => {
  let { postDate, title, city, state, schoolName, budget, otherdescription } =
    req.body;
  try {
    // if(!postDate) throw "postDate is empty"
    // if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    // if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    // if(!city || typeof city != "string" || city == " ") throw "Enter city"
    // if(!state || typeof state != "string" || state == " ")  throw "Enter state"

    if (!postDate) throw `Enter post date`;
    if (!title || title.trim().length === 0) throw "Enter valid title";

    if (!city || city.trim().length === 0) throw "Enter valid city";
    if (!state || state.trim().length === 0) throw "Enter valid state";
    if (!schoolName || schoolName.trim().length === 0)
      throw "Enter valid schoolName";

    if (!budget || isNaN(budget)) throw `Enter valid budget`;
    budget = parseInt(budget);
    if (budget < 100) throw "budget must be greater eqaul to 100";

    let parkingAvailable = (pets = sharingAllowed = student = false);
    user = req.session.user.username;
    if (req.body.parkingAvailable) {
      parkingAvailable = true;
    }
    if (req.body.pets) {
      pets = true;
    }
    if (req.body.sharingAllowed) {
      sharingAllowed = true;
    }

    if (req.body.student) {
      student = true;
    }
    const output = await postRoomData.createPost(
      user,
      postDate,
      title,
      city,
      state,
      schoolName,
      parkingAvailable,
      pets,
      sharingAllowed,
      budget,
      student,
      otherdescription
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
