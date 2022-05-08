const express = require("express");
const router = express.Router();
const data = require("../data");
const searchData = data.search;
const xss = require("xss");

router.get("/", async (req, res) => {
  res.render("find/findPost");
});

router.get("/searchbyCity", async (req, res) => {
  res.render("find/searchbyCity");
});

router.post("/searchbyCity", async (req, res) => {
  const city = xss(req.body.city);
  console.log(city);
  try {
    //check if city is provided and valid
    if (!city || city.trim().length === 0) throw "Enter valid city name";

    const result = await searchData.searchCity(city);

    res.render("find/searchbyCity", { allpost: result });
  } catch (e) {
    if (e) {
      res.status(400).render("find/searchbyCity", { errors: e });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

//searchbyschoolName
router.get("/searchbyschoolName", async (req, res) => {
  res.render("find/searchbyschoolName");
});

router.post("/searchbyschoolName", async (req, res) => {
  const schoolName =xss(req.body.schoolName);

  try {
    //check if schoolName is provided and valid
    if (!schoolName || schoolName.trim().length === 0)
      throw "Enter valid schoolName";

    const result = await searchData.searchschoolName(schoolName);
    // console.log(result);
    res.render("find/searchbyschoolName", { allpost: result });
  } catch (e) {
    if (e) {
      res.status(400).render("find/searchbyschoolName", { errors: e });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

//Mypost

router.get("/searchbymyPost", async (req, res) => {
  const user = req.session.user.username;
  try {
    //check if user is provided and valid
    
    const result = await searchData.searchmyPost(user);
    console.log("result in routes", result);
    res.render("find/searchbymyPost", { allpost: result });
  } catch (e) {
    if (e) {
      res.status(400).render("find/searchbymyPost", { errors: e });
      return;
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

// router.post("/searchbymyPost", async (req, res) => {
//   user = req.session.user.username;

//   try {
//     //check if user is provided and valid
//     if (!user || user.trim().length === 0) throw "Enter valid user name";

//     const result = await searchData.searchmyPost(user);
//     console.log("result in routes", result);
//     res.render("find/searchbymyPost", { allpost: result });
//   } catch (e) {
//     if (e) {
//       res.status(400).render("find/searchbymyPost", { errors: e });
//       return;
//     } else {
//       res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   }
// });

module.exports = router;
