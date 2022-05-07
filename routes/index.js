const usersRoute = require("./users");
const postRoomRoute = require("./postsRoom");
const postRoomateRoute = require("./postsRoomate");
const selectPostRoute = require("./selectPost");
const findPostRoute = require("./findPost");
const aboutUsRoute = require("./other");
const contactUsRoute = require("./contactUs");
const aboutUsNotAuthRoute = require("./notAuth");
const makeCommentRoute = require("./makeComments");
const individualPostRoute = require("./individualPostRoute");
const messageRoute = require("./message");
const forgotRoute = require("./forgot");

const constructorMethod = (app) => {
  app.use("/comment", makeCommentRoute);
  app.use("/", usersRoute);
  app.use("/private/post", individualPostRoute);
  app.use("/private/postRoom", postRoomRoute);
  app.use("/private/postRoomate", postRoomateRoute);
  app.use("/private/selectpost", selectPostRoute);
  app.use("/private/findPost", findPostRoute);
  app.use("/private/message", messageRoute);
  app.use("/private", aboutUsRoute);
  app.use("/private", contactUsRoute);
  app.use("/forgot", forgotRoute);
  app.use("/", aboutUsNotAuthRoute);
  app.use("*", (request, response) => {
    const error = { error: "Error 404 Not found" };
    response.status(404).render("errors/notfound", error);
  });
};

module.exports = constructorMethod;
