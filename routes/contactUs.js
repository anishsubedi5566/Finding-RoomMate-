const { Route } = require("express");
const express = require("express");
const router = express.Router();
const xss = require("xss");

router.get("/contactUs", async (req, res) => {
  res.render("other/contactUs");
});

router.post("/contactUs", async (req, res) => {
  // let { yourname, email, message_query } 

  let yourname=xss(req.body.yourname);
  let email=xss(req.body.email);
  let message_query=xss(req.body.message_query);

  console.log("yes get inside route");
  try {
    if (
      !yourname ||
      yourname.trim().length === 0 ||
      yourname == null ||
      yourname == undefined
    )
      throw "Please Enter valid Name";
    if (yourname.length < 4) throw "Name must be more than 3 characters";

    if (!email || email == null || email == undefined)
      throw "Please provide your email";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      throw "Provided email is invalid";

    if (
      !message_query ||
      message_query.trim().length === 0 ||
      message_query == null ||
      message_query == undefined
    )
      throw "Please Enter Message";

    res.render("other/contactUs");
  } catch (e) {
    if (e) {
      console.log(e);
      const out = { errors: e };
      res.status(400).render("other/contactUs", out);
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

module.exports = router;
