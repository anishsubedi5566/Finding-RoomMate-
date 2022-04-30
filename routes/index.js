const usersRoute = require("./users");
const postRoomRoute = require("./postsRoom");
const postRoomateRoute = require("./postsRoomate");
const selectPostRoute = require("./selectPost");
const findPostRoute = require("./findPost");
const aboutUsRoute = require("./other");

const constructorMethod = (app) => {
  app.use("/", usersRoute);
  app.use("/private/postRoom", postRoomRoute);
  app.use("/private/postRoomate", postRoomateRoute);
  app.use("/private/selectpost", selectPostRoute);
  app.use("/private/findPost", findPostRoute);
  app.use("/", aboutUsRoute);
  app.use("*", (request, response) => {
    const error = { error: "Error 404 Not found" };
    response.status(404).render("errors/notfound", error);
  });
};

module.exports = constructorMethod;
