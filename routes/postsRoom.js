const express = require("express");
const data = require("../data");
const postRoomData = data.postsRoom;
const commentsRoomData = data.commentsRoom;
const router = express.Router();
const xss = require("xss");
let { ObjectId } = require("mongodb");
const { commentsRoom } = require("../data");
const userData = data.users;

router.get("/", async (req, res) => {
  const allPost = await postRoomData.getPost();
  res.render("post/postRoom", { title: "Find a room", allpost: allPost });
});

router.post("/", async (req, res) => {
  // let { title, city, state, schoolName, budget, otherdescription }

  let title = xss(req.body.title);
  let city = xss(req.body.city);
  let state = xss(req.body.state);
  let schoolName = xss(req.body.schoolName);
  let budget = xss(req.body.budget);
  let otherdescription = xss(req.body.otherdescription);

  
  try {
    const postDate = new Date().toDateString();
    if (!title || title.trim().length === 0) throw "Enter valid title";
    if (!city || city.trim().length === 0) throw "Enter valid city";
    if (!state || state.trim().length === 0) throw "Enter valid state";
    if (!schoolName || schoolName.trim().length === 0)
      throw "Enter valid schoolName";

    if (!budget || isNaN(budget)) throw `Enter valid budget`;
    budget = parseInt(budget);
    if (budget < 100) throw "budget must be greater eqaul to 100";

    let parkingAvailable = (pets = sharingAllowed = student = false);

    if (xss(req.body.parkingAvailable)) {
      parkingAvailable = true;
    }
    if (xss(req.body.pets)) {
      pets = true;
    }
    if (xss(req.body.sharingAllowed)) {
      sharingAllowed = true;
    }

    if (xss(req.body.student)) {
      student = true;
    }
    const username = req.session.user.username;
    const getAllUser = await userData.getAllUsers();

    let userId;
    //console.log(getAllUsers);
    getAllUser.forEach((user) => {
      if (user.username === username) {
        userDefaultImage = user.userProfileImage;
        userId = user._id.toString();
      }
    });

    const output = await postRoomData.createPost(
      username,
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
      otherdescription,
      userId
    );

    if (output) {
      res.render("post/postRoom", { result: "Submitted Successfully" });
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
