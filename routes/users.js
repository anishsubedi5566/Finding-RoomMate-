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
  const email = xss(req.body.email);
  const schoolName = xss(req.body.schoolName);
  const age = Number(xss(req.body.age));
  const city = xss(req.body.city);
  const state = xss(req.body.state);
  const gender = xss(req.body.gender);

  let homeCountry = xss(req.body.homeCountry);
  let userImage = "";

  if (
    !password ||
    !username ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    res.status(400).render("signup", { error: "Enter username or password" });
    return;
  }

  //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.

  const reg = /^[a-z0-9A-Z]+$/i;
  const validation = reg.test(username);

  if (!validation) {
    res.status(400).render("signup", {
      error: "only  alphanumeric is acceptable in username",
    });
    return;
  }

  let n = username.length;
  if (n < 4) {
    res
      .status(400)
      .render("signup", { error: "Username is less than 4 character" });
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
    res.status(400).render("signup", { error: "password  is not valid" });
    return;
  }

  //security question error check

  if (!securityQues) {
    res
      .status(400)
      .render("signup", { error: "Please provide a security question" });
    return;
  }
  if (typeof securityQues !== "string") {
    res
      .status(400)
      .render("signup", { error: `Security question must be a string value` });
    return;
  }
  if (securityQues.trim().length === 0) {
    res.status(400).render("signup", {
      error: "Security question input entered is invalid",
    });
    return;
  }
  if (securityQues == "None") {
    res
      .status(400)
      .render("signup", { error: "Security question should not be none" });
    return;
  }

  //security ans error check

  if (!securityAns) {
    res
      .status(400)
      .render("signup", { error: "Please provide a security answer" });
    return;
  }
  if (typeof securityAns !== "string") {
    res
      .status(400)
      .render("signup", { error: `Security answer must be a string value` });
    return;
  }
  if (securityAns.trim().length === 0) {
    res
      .status(400)
      .render("signup", { error: "Security answer input entered is invalid" });
    return;
  }

  //First Name error check
  if (!firstName) {
    res.status(400).render("signup", { error: `First Name is not provided` });
    return;
  }
  if (typeof firstName !== "string") {
    res
      .status(400)
      .render("signup", { error: `First Name is not a string value` });
    return;
  }
  if (firstName.trim().length === 0) {
    res
      .status(400)
      .render("signup", { error: "Invalid input entered for First name" });
    return;
  }
  if (firstName.length < 2) {
    res.status(400).render("signup", {
      error: "First name must be of 2 or more than 2 characters",
    });
    return;
  }

  //LastName error check
  if (!lastName) {
    res.status(400).render("signup", { error: `Last Name is not provided` });
    return;
  }
  if (typeof lastName !== "string") {
    res
      .status(400)
      .render("signup", { error: `Last Name is not a string value` });
    return;
  }
  if (lastName.trim().length === 0) {
    res
      .status(400)
      .render("signup", { error: "Invalid input entered for Last name" });
    return;
  }
  if (lastName.length < 2) {
    res.status(400).render("signup", {
      error: "Last name must be of 2 or more than 2 characters",
    });
    return;
  }

  //Email error handling
  if (!email) {
    res.status(400).render("signup", { error: `Email is not provided` });
    return;
  }
  if (typeof email !== "string") {
    res.status(400).render("signup", { error: `Email is not a string value` });
    return;
  }
  if (email.trim().length === 0) {
    res
      .status(400)
      .render("signup", { error: "Invalid input entered for Email" });
    return;
  }

  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailValidation = emailReg.test(email);

  if (!emailValidation) {
    res.status(400).render("signup", { error: "Email is invalid" });
  }

  //city error check
  if (!city) {
    res.status(400).render("signup", { error: `City is not provided` });
    return;
  }
  if (typeof city !== "string") {
    res.status(400).render("signup", { error: `City is not a string value` });
    return;
  }
  if (city.trim().length === 0) {
    res.status(400).render("signup", { error: "Invalid input entered" });
    return;
  }
  if (city == "None") {
    res.status(400).render("signup", { error: "City should not be none" });
    return;
  }

  //state error check
  if (!state) {
    res.status(400).render("signup", { error: `State is not provided` });
    return;
  }
  if (typeof state !== "string") {
    res.status(400).render("signup", { error: `State is not a string value` });
    return;
  }
  if (state.trim().length === 0) {
    res.status(400).render("signup", { error: "Invalid input entered" });
    return;
  }
  if (city == "City") {
    res.status(400).render("signup", { error: "City should not be none" });
    return;
  }

  //school name error check
  if (!schoolName) {
    res.status(400).render("signup", { error: `School Name is not provided` });
    return;
  }
  if (typeof schoolName !== "string") {
    res
      .status(400)
      .render("signup", { error: `School Name is not a string value` });
    return;
  }
  if (schoolName.trim().length === 0) {
    res.status(400).render("signup", { error: "Invalid input entered" });
    return;
  }
  if (schoolName == "None") {
    res
      .status(400)
      .render("signup", { error: "School name should not be none" });
    return;
  }

  //age error check
  if (!age) {
    res.status(400).render("signup", { error: "Please provide your age" });
    return;
  }

  if (typeof age !== "number") {
    res
      .status(400)
      .render("signup", { error: `Age is must be a valid number` });
    return;
  }

  if (age < 15 || age > 100) {
    res.status(400).render("signup", { error: "Age must be greater than 15" });
    return;
  }

  //gender error check
  if (!gender) {
    res.status(400).render("signup", { error: `Gender is not provided` });
    return;
  }
  if (typeof gender !== "string") {
    res.status(400).render("signup", { error: `Gender is not a string value` });
    return;
  }
  if (gender.trim().length === 0) {
    res.status(400).render("signup", { error: "Invalid input entered" });
    return;
  }
  if (gender == "None") {
    res.status(400).render("signup", { error: "Gender should not be none" });
    return;
  }

  try {
    const userCheck = await userData.checkUser(username, password);
    if (userCheck) {
      res.status(400).render("signup", { error: "User already exists" });
      return;
    }
  } catch (e) {
    error = e.message;
  }

  try {
    if (req.files) {
      let picture = req.files.picture;
      //console.log(req.files);
      let pictureName = picture.name.replaceAll(" ", "-");
      picture.mv(`./public/uploads/` + pictureName);
      userImage = `/public/uploads/` + pictureName;
    } else if (!req.files) {
      userImage = `/public/images/user_profile_default.png`;
    }
  } catch (e) {
    const error = e;
    res.status(400).render("signup", { title: "Error", error: error });
  }

  try {
    console.log(userImage);
    const adduser = await userData.create(
      username,
      password,
      securityQues,
      securityAns,
      firstName,
      lastName,
      email,
      schoolName,
      city,
      state,
      homeCountry,
      age,
      gender,
      userImage
    );
    res.redirect("/login?msg=Congratulations, you are user now");
  } catch (e) {
    const error = e;
    res.status(400).render("signup", { title: "Error", error: error });
  }

  //   try {
  //     //defult user image will appear
  //     if (!req.files) {
  //       const adduser = await userData.create(
  //         username,
  //         password,
  //         securityQues,
  //         securityAns,
  //         firstName,
  //         lastName,
  //         email,
  //         schoolName,
  //         city,
  //         state,
  //         homeCountry,
  //         age,
  //         gender,

  //         `/public/images/user_profile_default.png`
  //       );
  //       res.redirect("/login?msg=Congratulations, you are user now");
  //     } else {
  //       //user can upload image
  //       let picture = req.files.picture;
  //       //console.log(req.files);
  //       let pictureName = picture.name.replaceAll(" ", "-");
  //       picture.mv(`./public/uploads/` + pictureName);

  //       const adduser = await userData.create(
  //         username,
  //         password,
  //         securityQues,
  //         securityAns,
  //         firstName,
  //         lastName,
  //         email,
  //         schoolName,
  //         city,
  //         state,
  //         homeCountry,
  //         age,
  //         gender,

  //         `/public/uploads/` + pictureName
  //       );

  //       res.status(200).render("login", { title: "Login" });
  //       // res.redirect("/login?msg=Congratulations, you are user now");
  //     }
  //   } catch (e) {
  //     const error = e;
  //     res.status(400).render("signup", { title: "Error", error: error });
  //   }
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
    res.status(400).render("login", { error: "Enter username or password" });
    return;
  }

  //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.

  //username = username.trim();
  let n = username.length;

  if (n < 4) {
    res
      .status(400)
      .render("login", { error: "Username is less than 4 character" });
    return;
  }

  const reg = /^[a-z0-9A-Z]+$/i;
  const validation = reg.test(username);

  if (!validation) {
    res.status(400).render("login", {
      error: "only  alphanumeric is acceptable in username",
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
    res.status(400).render("login", { error: "password  is not valid" });
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
  res.render("logout", { title: "Logged out" });
  //res.redirect("/login");
});

//get user profile data

router.route("/private/profile").get(async (req, res) => {
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

  try {
    const user = await userData.getUserByID(id);

    res.status(200).render("userProfile/profile", {
      title: "Your Profile",
      user: user,
    });
  } catch (e) {
    error = e;
    res.status(400).render("private", error);

    return;
  }
});

router.route("/private/profile/edit").get(async (req, res) => {
  const username = req.session.user.username;
  const getAllUsers = await userData.getAllUsers();
  let userDefaultImage = "";
  let id;
  //console.log(getAllUsers);
  getAllUsers.forEach((user) => {
    if (user.username === username) {
      userDefaultImage = user.userProfileImage;
      id = user._id.toString();
    }
    userImage = user.userProfileImage;
  });
  console.log(userImage);

  try {
    const user = await userData.getUserByID(id);
    console.log(user);
    res
      .status(200)
      .render("userProfile/edit", { title: "Edit Profile", user: user });
  } catch (e) {
    error = e;
    res
      .status(400)
      .render("userProfile/edit", { title: "Error", error: error.message });

    return;
  }
});

//Update user profile
router.route("/private/profile/edit").post(async (req, res) => {
  const username = req.session.user.username;
  const getAllUser = await userData.getAllUsers();
  let userDefaultImage = "";
  let id;
  //console.log(getAllUsers);
  getAllUser.forEach((user) => {
    if (user.username === username) {
      userDefaultImage = user.userProfileImage;
      id = user._id.toString();
    }
  });

  const firstName = xss(req.body.firstName);
  const lastName = xss(req.body.lastName);
  const email = xss(req.body.email);
  const schoolName = xss(req.body.schoolName);
  const city = xss(req.body.city);
  const state = xss(req.body.state);
  const homeCountry = xss(req.body.homeCountry);
  const age = Number(xss(req.body.age));
  const gender = xss(req.body.gender);

  //First Name error check
  if (!firstName) {
    res
      .status(400)
      .render("userProfile/edit", { error: `First Name is not provided` });
    return;
  }
  if (typeof firstName !== "string") {
    res.status(400).render("userProfile/edit", {
      error: `First Name is not a string value`,
    });
    return;
  }
  if (firstName.trim().length === 0) {
    res.status(400).render("userProfile/edit", {
      error: "Invalid input entered for First Name",
    });
    return;
  }
  if (firstName.length < 2) {
    res.status(400).render("userProfile/edit", {
      error: "First name must be of 2 or more than 2 characters",
    });
    return;
  }

  //LastName error check
  if (!lastName) {
    res
      .status(400)
      .render("userProfile/edit", { error: `Last Name is not provided` });
    return;
  }
  if (typeof lastName !== "string") {
    res
      .status(400)
      .render("userProfile/edit", { error: `Last Name is not a string value` });
    return;
  }
  if (lastName.trim().length === 0) {
    res.status(400).render("userProfile/edit", {
      error: "Invalid input entered for Last Name",
    });
    return;
  }
  if (lastName.length < 2) {
    res.status(400).render("userProfile/edit", {
      error: "Last name must be of 2 or more than 2 characters",
    });
    return;
  }

  //Email error handling
  if (!email) {
    res
      .status(400)
      .render("userProfile/edit", { error: `Email is not provided` });
    return;
  }
  if (typeof email !== "string") {
    res
      .status(400)
      .render("userProfile/edit", { error: `Email is not a string value` });
    return;
  }
  if (email.trim().length === 0) {
    res
      .status(400)
      .render("userProfile/edit", { error: "Invalid input entered for Email" });
    return;
  }

  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailValidation = emailReg.test(email);

  if (!emailValidation) {
    res.status(400).render("userProfile/edit", { error: "Email is invalid" });
  }

  //city error check
  if (!city) {
    res
      .status(400)
      .render("userProfile/edit", { error: `City is not provided` });
    return;
  }
  if (typeof city !== "string") {
    res
      .status(400)
      .render("userProfile/edit", { error: `City is not a string value` });
    return;
  }
  if (city.trim().length === 0) {
    res
      .status(400)
      .render("userProfile/edit", { error: "Invalid input entered for City" });
    return;
  }

  //state error check
  if (!state) {
    res
      .status(400)
      .render("userProfile/edit", { error: `State is not provided` });
    return;
  }
  if (typeof state !== "string") {
    res
      .status(400)
      .render("userProfile/edit", { error: `State is not a string value` });
    return;
  }
  if (state.trim().length === 0) {
    res
      .status(400)
      .render("userProfile/edit", { error: "Invalid input entered for State" });
    return;
  }

  //school name error check
  if (!schoolName) {
    res
      .status(400)
      .render("userProfile/edit", { error: `School Name is not provided` });
    return;
  }
  if (typeof schoolName !== "string") {
    res.status(400).render("userProfile/edit", {
      error: `School Name is not a string value`,
    });
    return;
  }
  if (schoolName.trim().length === 0) {
    res.status(400).render("userProfile/edit", {
      error: "Invalid input entered for School name",
    });
    return;
  }

  //age error check
  if (!age) {
    res
      .status(400)
      .render("userProfile/edit", { error: "Please provide your age" });
    return;
  }

  if (typeof age !== "number") {
    res
      .status(400)
      .render("userProfile/edit", { error: `Age is must be a valid number` });
    return;
  }

  if (age < 15 && age > 110) {
    res
      .status(400)
      .render("userProfile/edit", { error: "Age must be greater than 15" });
    return;
  }

  //gender error check
  if (!gender) {
    res
      .status(400)
      .render("userProfile/edit", { error: `Gender is not provided` });
    return;
  }
  if (typeof gender !== "string") {
    res
      .status(400)
      .render("userProfile/edit", { error: `Gender is not a string value` });
    return;
  }
  if (gender.trim().length === 0) {
    res.status(400).render("userProfile/edit", {
      error: "Invalid input entered for Gender",
    });
    return;
  }

  //home country error check
  // if (typeof homeCountry !== "string") {
  //   res.status(400).render("userProfile/profile", {
  //     error: `Native country is not a string value`,
  //   });
  //   return;
  // }
  // if (homeCountry.trim().length === 0) {
  //   res
  //     .status(400)
  //     .render("userProfile/edit", { error: "Invalid input entered" });
  //   return;
  // }

  //bio error check
  // if (!bio) {
  //   bio = "N/A";
  // }
  // if (typeof bio !== "string") {
  //   res
  //     .status(400)
  //     .render("userProfile/edit", { error: `Bio is not a string value` });
  //   return;
  // }
  // if (bio.trim().length === 0) {
  //   res
  //     .status(400)
  //     .render("userProfile/edit", { error: "Invalid input entered" });
  //   return;
  // }
  // try {
  //   const user = await userData.getUserByID(id);
  //   console.log(user);
  //   res.status(200).render("userProfile/edit", {
  //     user: user,
  //   });
  // } catch (e) {
  //   error = e;
  //   res.status(400).render("userProfile/edit", error);

  //   return;
  // }
  try {
    if (req.files) {
      let picture = req.files.picture;
      let pictureName = picture.name.replaceAll(" ", "-");
      picture.mv(`./public/uploads/` + pictureName);
      const updateUser = await userData.updateUserProfile(
        id,
        `/public/uploads/` + pictureName,
        firstName,
        lastName,
        email,
        schoolName,
        city,
        state,
        homeCountry,
        age,
        gender
      );
    } else {
      const updateUser = await userData.updateUserProfile(
        id,
        userDefaultImage,
        firstName,
        lastName,
        email,
        schoolName,
        city,
        state,
        homeCountry,
        age,
        gender
      );
    }
    return res.redirect("/private/profile");
  } catch (e) {
    const user = await userData.getUserByID(id);
    if (e) {
      console.log("Im in error");
      console.log(e);
      res
        .status(400)
        .render("userProfile/edit", { error: e.message, user: user });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.route("/private/deleteProfile").get(async (req, res) => {
  const username = req.session.user.username;
  const getAllUsers = await userData.getAllUsers();
  let id;
  //console.log(getAllUsers);
  getAllUsers.forEach((user) => {
    if (user.username === username) {
      id = user._id.toString();
    }
  });
  const deleteUser = await userData.deleteUser(id);
  req.session.destroy();
  // res.render("logout", { title: "Logged out" });
  res.redirect("/login");
});

module.exports = router;
