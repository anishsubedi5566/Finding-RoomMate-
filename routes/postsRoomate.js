const express = require("express");
const data = require("../data");
const postRoomateData = data.postsRoomate;
const router = express.Router();
const xss = require("xss");
const userData = data.users;

router.get("/", async (req, res) => {
  const allPost = await postRoomateData.getPost();
  res.render("post/postRoomate", { title: "Find a roommie", allpost: allPost });
});

router.post("/", async (req, res) => {
  // let {
  //   title,
  //   street,
  //   city,
  //   state,
  //   schoolName,
  //   roomNumber,
  //   roomarea,
  //   rent,
  //   peoplelivingcurrently,
  //   otherdescription,
  // }

  let title = xss(req.body.title);
  let street = xss(req.body.street);
  let city = xss(req.body.city);
  let state = xss(req.body.state);
  let schoolName = xss(req.body.schoolName);
  let roomNumber = xss(req.body.roomNumber);
  let roomarea = xss(req.body.roomarea);
  let rent = xss(req.body.rent);
  let peoplelivingcurrently = xss(req.body.peoplelivingcurrently);
  let otherdescription = xss(req.body.otherdescription);

  // console.log("routes/postRoomate",title,street,city,state,roomNumber,roomarea,petsAllowed,parkingAvailable,sharingAllowed,rent,peoplelivingcurrently,otherdescription )
  let postImages = [];
  const username = req.session.user.username;
  const getAllUsers = await userData.getAllUsers();
  let userId;
  //console.log(getAllUsers);
  getAllUsers.forEach((user) => {
    if (user.username === username) {
      userId = user._id.toString();
    }
  });
  try {
    const postDate = new Date().toDateString();

    if (!title || title.trim().length === 0) throw "Enter valid title";
    if (!street || street.trim().length === 0) throw "Enter valid street";
    if (!city || city.trim().length === 0) throw "Enter valid city";
    if (!state || state.trim().length === 0) throw "Enter valid state";
    if (!schoolName || schoolName.trim().length === 0)
      throw "Enter valid schoolName";

    if (!roomNumber || isNaN(roomNumber)) throw `Enter valid Rooms avilable`;
    roomNumber = parseInt(roomNumber);

    if (roomNumber < 1 || roomNumber > 15)
      throw "Rooms avilable must be between 1 to 15";

    if (!roomarea || isNaN(roomarea)) throw `Enter valid roomarea`;
    roomarea = parseInt(roomarea);
    if (roomarea < 100) throw "roomarea must be greater eqaul to 100";

    if (!rent || isNaN(rent)) throw `Enter valid rent`;
    rent = parseInt(rent);
    console.log("route rent", rent, rent < 100);
    if (rent < 100) throw "rent must be greater eqaul to 100";

    if (!peoplelivingcurrently || isNaN(peoplelivingcurrently))
      throw `Enter valid peoplelivingcurrently`;
    peoplelivingcurrently = parseInt(peoplelivingcurrently);
    if (peoplelivingcurrently < 1)
      throw "peoplelivingcurrently must be greater than zero";

    let petsAllowed = (parkingAvailable = sharingAllowed = false);

    if (xss(req.body.petsAllowed)) {
      petsAllowed = true;
    }
    if (xss(req.body.parkingAvailable)) {
      parkingAvailable = true;
    }
    if (xss(req.body.sharingAllowed)) {
      sharingAllowed = true;
    }

    if (req.files) {
      let picture = req.files.postImage;
      for (let i = 0; i < picture.length; i++) {
        let pictureName = picture[i].name.replaceAll(" ", "-");
        picture[i].mv(`./public/uploads/` + pictureName);
        postImages.push(`/public/uploads/` + pictureName);
      }
    } else if (!req.files) {
      postImages.push(`/public/images/house_default.png`);
    }

    const output = await postRoomateData.createPost(
      username,
      postDate,
      title,
      street,
      city,
      state,
      schoolName,
      roomNumber,
      roomarea,
      petsAllowed,
      parkingAvailable,
      sharingAllowed,
      rent,
      peoplelivingcurrently,
      otherdescription,
      postImages,
      userId
    );
    if (output) {
      res.render("post/postRoomate", { result: "Submitted Successfully" });
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
