const express = require("express");
const data = require("../data");
const userData = data.users;
const router = express.Router();
const xss = require("xss");
let { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  if (req.session.user) {
    //1.If the user is authenticated, it will redirect to /private.
    res.redirect("/private");
  } else {
    res.redirect("/login");
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup", { title: "Sign up" });
});

router.get("/login", async (req, res) => {
  res.render("login", { title: "Login" });
  // const out = { errors: "the user is not logged in" };
  // res.status(403).render("login", out);
});

router.post("/signup", async (req, res) => {
  //1.You must make sure that username and password are supplied in the req.body
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  const securityQues = xss(req.body.securityQues);
  const securityAns = xss(req.body.securityAns);
  const firstName = xss(req.body.firstName);
  const lastName = xss(req.body.lastName);
  const schoolName = xss(req.body.schoolName);
  const age = Number(xss(req.body.age));
  const city = xss(req.body.city);
  const state = xss(req.body.state);
  const gender = xss(req.body.gender);
  let bio = xss(req.body.bio);
  let homeCountry = xss(req.body.homeCountry);

  if (
    !password ||
    !username ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    const out = { errors: "Enter username or password" };
    res.status(400).render("signup", out);
    return;
  }

  //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.

  const reg = /^[a-z0-9A-Z]+$/i;
  const validation = reg.test(username);

  if (!validation) {
    const out = { errors: "only  alphanumeric is acceptable in username" };
    res.status(400).render("signup", out);
    return;
  }

  let n = username.length;
  if (n < 4) {
    const out = { errors: "Username is less than 4 character" };
    res.status(400).render("signup", out);
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
    const out = { errors: "password  is not valid" };
    res.status(400).render("signup", out);
    return;
  }

  //security question error check

  if (!securityQues) {
    const error = { errors: "Please provide a security question" };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof securityQues !== "string") {
    const error = { errors: `Security question must be a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (securityQues.trim().length === 0) {
    const error = { errors: "Security question input entered is invalid" };
    res.status(400).render("signup", error);
    return;
  }

  //security ans error check

  if (!securityAns) {
    const error = { errors: "Please provide a security answer" };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof securityAns !== "string") {
    const error = { errors: `Security answer must be a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (securityAns.trim().length === 0) {
    const error = { errors: "Security answer input entered is invalid" };
    res.status(400).render("signup", error);
    return;
  }

  //First Name error check
  if (!firstName) {
    const error = { errors: `${firstName} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof firstName !== "string") {
    const error = { errors: `${firstName} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (firstName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //LastName error check
  if (!lastName) {
    const error = { errors: `${lastName} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof lastName !== "string") {
    const error = { errors: `${lastName} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (lastName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //city error check
  if (!city) {
    const error = { errors: `${city} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof city !== "string") {
    const error = { errors: `${city} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (city.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //state error check
  if (!state) {
    const error = { errors: `${state} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof state !== "string") {
    const error = { errors: `${state} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (state.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //school name error check
  if (!schoolName) {
    const error = { errors: `${schoolName} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof schoolName !== "string") {
    const error = { errors: `${schoolName} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (schoolName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //age error check
  if (!age) {
    const error = { errors: "Please provide your age" };
    res.status(400).render("signup", error);
    return;
  }

  if (typeof age !== "number") {
    const error = { errors: `${age} is must be a valid number` };
    res.status(400).render("signup", error);
    return;
  }

  if (age < 15 && age > 110) {
    const error = { errors: "Age must be greater than 15" };
    res.status(400).render("signup", error);
    return;
  }

  //gender error check
  if (!gender) {
    const error = { errors: `${gender} is not provided` };
    res.status(400).render("signup", error);
    return;
  }
  if (typeof gender !== "string") {
    const error = { errors: `${gender} is not a string value` };
    res.status(400).render("signup", error);
    return;
  }
  if (gender.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("signup", error);
    return;
  }

  //homeCountry error check
  if (!homeCountry) {
    homeCountry = "N/A";
  }

  //bio error check
  if (!bio) {
    bio = "N/A";
  }

  try {
    if (error == null) {
      const usercheck = await userFetch.checkUser(username, password);
      if (usercheck) {
        error = "User already exists";
      }
    }
  } catch (e) {
    error = e;
  }

  try {
    if (!req.files) {
      const adduser = await userData.create(
        username,
        password,
        securityQues,
        securityAns,
        firstName,
        lastName,
        schoolName,
        city,
        state,
        homeCountry,
        age,
        gender,
        bio,
        `/public/images/user_profile_default.png`
      );
      return res.redirect("/login?msg=Congratulations, you are user now");
    } else {
      let picture = req.files.picture;

      picture.mv(`./public/uploads/` + picture.name);

      const adduser = await userData.create(
        username,
        password,
        securityQues,
        securityAns,
        firstName,
        lastName,
        schoolName,
        city,
        state,
        homeCountry,
        age,
        gender,
        bio,
        `/public/uploads/` + picture.name
      );
      console.log("Image uploaded");
      res.status(200).render("login", { title: "Login" });
      return res.redirect("/login");
    }
  } catch (e) {
    const error = e;
    res.status(400).render("/signup", { title: "Error", error: error });
    return;
  }
});

router.post("/login", async (req, res) => {
  //1.You must make sure that username and password are supplied in the req.body
  const username = xss(req.body.username);
  const password = xss(req.body.password);

  if (
    !password ||
    !username ||
    username.trim() === 0 ||
    password.trim() === 0
  ) {
    const out = { errors: "Enter username or password" };
    res.status(400).render("login", out);
    return;
  }

  //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.

  //username = username.trim();
  let n = username.length;

  if (n < 4) {
    const out = { errors: "Username is less than 4 character" };
    res.status(400).render("login", out);
    return;
  }

  const reg = /^[a-z0-9A-Z]+$/i;
  const validation = reg.test(username);

  if (!validation) {
    const out = { errors: "only  alphanumeric is acceptable in username" };
    res.status(400).render("login", out);
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
    const error = { errors: "password  is not valid" };
    res.status(400).render("login", error);
    return;
  }

  try {
    const check = await userData.checkUser(username, password);

    if (check) {
      req.session.user = {
        username: username,
      };
      res.redirect("/private");
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };
      res.status(400).render("login", out);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.get("/private", async (req, res) => {
  try {
    if (req.session.user) {
      const name = {
        username: req.session.user.username,
      };
      res.render("private", {
        title: "Private",
        username: req.session.user.username,
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("users/logout", { title: "Logged out" });
  //res.redirect("/login");
});

//get user profile data

router.route("/private/profile").get(async (req, res) => {
  // const id = xss(req.params.id);
  // console.log(id);
  // //id error handle
  // if (!id) {
  //   let error = { errors: "ID not provided" };
  //   res.status(400).render("userProfile/profile", error);
  //   return;
  // }
  // if (typeof id !== "string") {
  //   let error = { errors: "ID must be a string type" };
  //   res.status(400).render("userProfile/profile", error);
  //   return;
  // }
  // if (id.trim().length === 0) {
  //   let error = { errors: "ID is consists of empty spaces" };
  //   res.status(400).render("userProfile/profile", error);
  //   return;
  // }

  // try {
  //   ObjectId(id);
  // } catch (e) {
  //   let error = { errors: "Invalid Object Id" };
  //   res.status(400).render("userProfile/profile", error);
  //   return;
  // }

  const username = req.session.user.username;
  const getAllUsers = await userData.getAllUsers();
  let id;
  //console.log(getAllUsers);
  getAllUsers.forEach((user) => {
    if (user.username === username) {
      console.log(user._id);
      id = user._id.toString();
    }
  });
  console.log(id);
  try {
    const user = await userData.getUserByID(id);
    console.log(user);
    res.status(200).render("userProfile/profile", {
      title: "User Profile",
      user: user,
    });
  } catch (e) {
    error = e;
    res.status(400).render("private", error);
    console.log(e);
    return;
  }
});

//Update user profile
router.route("/private/:id/profile/edit").put(async (req, res) => {
  const id = xss(req.params.id);
  const picture = xss(req.body.picture);
  const firstName = xss(req.body.firstName);
  const lastName = xss(req.body.lastName);
  const schoolName = xss(req.body.schoolName);
  const city = xss(req.body.city);
  const state = xss(req.body.state);
  const homeCountry = xss(req.body.homeCountry);
  const age = Number(xss(req.body.age));
  const gender = xss(req.body.gender);
  const bio = xss(req.body.bio);

  //id error handle
  if (!id) {
    let error = { errors: "ID not provided" };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof id !== "string") {
    let error = { errors: "ID must be a string type" };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (id.trim().length === 0) {
    let error = { errors: "ID is consists of empty spaces" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  try {
    ObjectId(id);
  } catch (e) {
    let error = { errors: "Invalid Object Id" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //First Name error check
  if (!firstName) {
    const error = { errors: `${firstName} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof firstName !== "string") {
    const error = { errors: `${firstName} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (firstName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //LastName error check
  if (!lastName) {
    const error = { errors: `${lastName} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof lastName !== "string") {
    const error = { errors: `${lastName} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (lastName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //city error check
  if (!city) {
    const error = { errors: `${city} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof city !== "string") {
    const error = { errors: `${city} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (city.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //state error check
  if (!state) {
    const error = { errors: `${state} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof state !== "string") {
    const error = { errors: `${state} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (state.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //school name error check
  if (!schoolName) {
    const error = { errors: `${schoolName} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof schoolName !== "string") {
    const error = { errors: `${schoolName} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (schoolName.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //age error check
  if (!age) {
    const error = { errors: "Please provide your age" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  if (typeof age !== "number") {
    const error = { errors: `${age} is must be a valid number` };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  if (age < 15 && age > 110) {
    const error = { errors: "Age must be greater than 15" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //gender error check
  if (!gender) {
    const error = { errors: `${gender} is not provided` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (typeof gender !== "string") {
    const error = { errors: `${gender} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (gender.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //homeCountry error check
  if (!homeCountry) {
    homeCountry = "N/A";
  }
  if (typeof homeCountry !== "string") {
    const error = { errors: `${homeCountry} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (homeCountry.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }

  //bio error check
  if (!bio) {
    bio = "N/A";
  }
  if (typeof bio !== "string") {
    const error = { errors: `${bio} is not a string value` };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  if (bio.trim().length === 0) {
    const error = { errors: "Invalid input entered" };
    res.status(400).render("userProfile/profile", error);
    return;
  }
  try {
    if (req.files) {
      let picture = req.files.picture;
      picture.mv(`./public/uploads/` + picture.name);
      const updateUser = await userData.updateUser(
        id,
        firstName,
        lastName,
        schoolName,
        city,
        state,
        homeCountry,
        age,
        gender,
        bio,
        `/public/uploads/` + picture.name
      );
    }
    return res.redirect("/profile");
  } catch (e) {
    const error = e;
    res.status(400).render("/profile", error);
    return;
  }
});

module.exports = router;
