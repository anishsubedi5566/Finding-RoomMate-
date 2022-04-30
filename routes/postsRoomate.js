const express = require("express");
const data = require("../data");
const postRoomateData = data.postsRoomate;
const router = express.Router();

router.get("/", async (req, res) => {
  const allPost = await postRoomateData.getPost();
  res.render("post/postRoomate", { allpost: allPost });
});

router.post("/", async (req, res) => {
  let {
    postDate,
    title,
    street,
    city,
    state,
    roomNumber,
    roomarea,
    rent,
    peoplelivingcurrently,
    otherdescription,
  } = req.body;
  // console.log("routes/postRoomate",title,street,city,state,roomNumber,roomarea,petsAllowed,parkingAvailable,sharingAllowed,rent,peoplelivingcurrently,otherdescription )

  try {
    if (!postDate) throw `Enter post date`;
    if (!title || title.trim().length === 0) throw "Enter valid title";
    if (!street || street.trim().length === 0) throw "Enter valid street";
    if (!city || city.trim().length === 0) throw "Enter valid city";
    if (!state || state.trim().length === 0) throw "Enter valid state";

    if (!roomNumber || isNaN(roomNumber)) throw `Enter valid roomNumber`;
    roomNumber = parseInt(roomNumber);
    console.log(roomNumber);
    if (roomNumber < 1 || roomNumber > 15) throw "roomNumber must be between 1 to 15";

    if (!roomarea || isNaN(roomarea)) throw `Enter valid roomarea`;
    roomarea = parseInt(roomarea);
    if (roomarea < 100) throw "roomarea must be greater eqaul to 100";

    if (!rent || isNaN(rent)) throw `Enter valid rent`;
    rent = parseInt(rent);
    if (rent < 100) throw "rent must be greater eqaul to 100";

    if (!peoplelivingcurrently || isNaN(peoplelivingcurrently))
      throw `Enter valid peoplelivingcurrently`;
    rent = parseInt(peoplelivingcurrently);
    if (peoplelivingcurrently < 1)
      throw "peoplelivingcurrently must be greater than zero";

    let petsAllowed = (parkingAvailable = sharingAllowed = false);
    user = req.session.user.username;
    if (req.body.petsAllowed) {
      petsAllowed = true;
    }
    if (req.body.parkingAvailable) {
      parkingAvailable = true;
    }
    if (req.body.sharingAllowed) {
      sharingAllowed = true;
    }

    const output = await postRoomateData.createPost(
      user,
      postDate,
      title,
      street,
      city,
      state,
      roomNumber,
      roomarea,
      petsAllowed,
      parkingAvailable,
      sharingAllowed,
      rent,
      peoplelivingcurrently,
      otherdescription
    );
    if (output) {
      res.redirect("/private/postRoomate");
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };
      res.status(400).render("post/postRoomate", out);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

module.exports = router;
