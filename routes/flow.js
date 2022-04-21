const express = require("express");
const data = require("../data");
const userData = data.userData;
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    //1.If the user is authenticated, it will redirect to /private.
    res.redirect("/private");
  } else {
    res.redirect("/login");
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  const out = { errors: "the user is not logged in" };
  res.status(403).render("login", out);
});

router.post("/signup", async (req, res) => {
  //1.You must make sure that username and password are supplied in the req.body
  const { username, password } = req.body;

  if (
    !password ||
    !username ||
    username.trim() === 0 ||
    password.trim() === 0
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

  try {
    const output = await userData.createUser(username, password);

    if (output) {
      res.redirect("/");
    }
  } catch (e) {
    if (e) {
      const out = { errors: e };
      res.status(400).render("signup", out);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  //1.You must make sure that username and password are supplied in the req.body
  const { username, password } = req.body;

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
      res.render("private", name);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
