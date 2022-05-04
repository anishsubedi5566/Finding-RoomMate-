const usersRoute = require("./users");
const postRoomRoute = require("./postsRoom");
const postRoomateRoute = require("./postsRoomate");
const selectPostRoute = require("./selectPost");
const findPostRoute = require("./findPost");
const aboutUsRoute = require("./other");
const makeCommentRoute = require("./makeComments");
const individualPostRoute = require("./individualPostRoute")
const messageRoute = require("./message")


const constructorMethod = (app) => {
  app.use("/comment", makeCommentRoute);
  app.use("/", usersRoute);
  app.use("/private/post", individualPostRoute);
  app.use("/private/postRoom", postRoomRoute);
  app.use("/private/postRoomate", postRoomateRoute);
  app.use("/private/selectpost", selectPostRoute);
  app.use("/private/findPost", findPostRoute);
  app.use("/private/message",messageRoute)
  app.use("/", aboutUsRoute);
  app.use("*", (request, response) => {
    const error = { error: "Error 404 Not found" };
    response.status(404).render("errors/notfound", error);
  });
};

module.exports = constructorMethod;
