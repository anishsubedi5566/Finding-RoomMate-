const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const commentsRoomData = data.commentsRoom;

const xss = require("xss");
let { ObjectId } = require("mongodb");
const findIndividualPost = data.findIndividualPost;

// Error checking, call to data function, render the data to handlebars

router.get("/:postid", async (req, res) => {
  try {
    // if (!user) throw "user not provided, please provide.";

    const postDetail = await findIndividualPost.searchPost(req.params.postid);
    console.log("routes/individialpost/postDeatilbyID", postDetail[0]);
    console.log(postDetail);
    res.render("post/individualPost", {
      postDetail: postDetail[0],
      title: "Post",
    });
  } catch (e) {
    res.status(400).render("post/individualPost", { error: e.message });
  }
});

router.route("/:postRoomId").post(async (req, res) => {
  const username = req.session.user.username;

  const date = new Date().toDateString();
  const comment = xss(req.body.comment);
  const postRoomId = req.params.postRoomId;

  // if (!comment || comment.trim().length === 0) {
  //   res.render("post/individualPost", { error: "Please provide comment" });
  //   return;
  // }

  if (!req.params.postRoomId) {
    res.status(400).json({ error: "Please provide ID" });
    return;
  }

  if (typeof req.params.postRoomId !== "string") {
    res.status(400).json({ error: "ID is not a string" });
    return;
  }

  if (req.params.postRoomId.length === 0) {
    res.status(400).json({ error: "ID is empty" });
    return;
  }

  if (req.params.postRoomId.trim().length === 0) {
    res.status(400).json({ error: "ID is just empty spaces" });
    return;
  }

  try {
    ObjectId(req.params.postRoomId);
  } catch (e) {
    res.status(400).json({ error: "not a valid object id" });
    return;
  }

  try {
    const newComment = await commentsRoomData.createComment(
      postRoomId,
      username,
      date,
      comment
    );
    console.log(newComment);
    res.redirect("/private/post/" + postRoomId);
  } catch (e) {
    console.log(e);
    res.status(400).render("post/individualPost", { error: e.message });
  }
});

router.route("/:userID/userProfile").get(async (req, res) => {
  const userId = req.params.userID;
  try {
    const user = await userData.getUserByID(userId);

    res.status(200).render("userProfile/otherUserProfile", {
      title: "User Profile",
      user: user,
    });
  } catch (e) {
    error = e;
    console.log(e);

    return;
  }
});

module.exports = router;
