const usersRoute = require("./users");
const postRoute = require("./posts");
const selectPostRoute = require("./selectPost");

const constructorMethod = (app) => {
  app.use("/", usersRoute);
  app.use("/private/post", postRoute);
  app.use("/private/selectpost", selectPostRoute);
  app.use("*", (request, response) => {
    const error = { error: "Error 404 Not found" };
    response.status(404).render("errors/notfound", error);
  });
};

module.exports = constructorMethod;
