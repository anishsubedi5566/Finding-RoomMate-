const express = require("express");
const data = require("../data");
const userData = data.users;
const searchData = data.search;
const router = express.Router();
const xss = require("xss");
let { ObjectId } = require("mongodb");

//forgot password
router.get("/", async (req, res) => {
  res.status(200).render("forgot", { title: "Forgot Password" });
});

router.post("/", async (req, res) => {
  const username = xss(req.body.username);
  const securityQues = xss(req.body.securityQues);
  const securityAns = xss(req.body.securityAns);
  const password = xss(req.body.password);

  console.log("yes in post", password);
  if (
    !password ||
    !username ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    res
      .status(400)
      .render("forgot", {
        title: "Error",
        error: "Enter username or password",
      });
    return;
  }

  let password_n = password.length;
  //password = password.trim();
  let password_space = false;
  for (let i = 0; i < password_n; i++) {
    if (password[i] === " ") {
      password_space = true;
    }
  }

  if (password_space || password_n < 6) {
    res
      .status(400)
      .render("forgot", { error: "password  is not in valid format" });
    return;
  }

  //security question error check
  if (!securityQues) {
    res
      .status(400)
      .render("forgot", { error: "Please provide a security question" });
    return;
  }
  if (typeof securityQues !== "string") {
    res
      .status(400)
      .render("forgot", { error: `Security question must be a string value` });
    return;
  }
  if (securityQues.trim().length === 0) {
    res.status(400).render("forgot", {
      error: "Security question input entered is invalid",
    });
    return;
  }
  if (securityQues == "None") {
    res
      .status(400)
      .render("forgot", { error: "Security question should not be none" });
    return;
  }

  if (!securityAns) {
    res
      .status(400)
      .render("forgot", { error: "Please provide a security answer" });
    return;
  }
  if (typeof securityAns !== "string") {
    res
      .status(400)
      .render("forgot", { error: `Security answer must be a string value` });
    return;
  }
  if (securityAns.trim().length === 0) {
    res
      .status(400)
      .render("forgot", { error: "Security answer input entered is invalid" });
    return;
  }

  try {
    //check username exists or not
    const userCheck = await userData.getUserByUsername(username);
    console.log("usercheck route", userCheck);
    if (userCheck) {
      //if user exist
      if (
        userCheck.securityQuestion === securityQues &&
        userCheck.securityAns === securityAns
      ) {
        //update password in database
        const updateCheck = await userData.updatePassword(username, password);
        console.log("success");
        res.redirect("/");
      } else {
        res
          .status(400)
          .render("forgot", {
            title: "Error",
            error: "Sequrity question and answer does not match",
          });
        return;
      }
    }
  } catch (e) {
    console.log("error", e);
    res.status(400).render("forgot", { title: "Error", error: e });
    return;
  }
});

module.exports = router;
