const usersRoute = require("./users");
const postRoute = require("./posts");
const constructorMethod = (app) => {
  app.use("/", usersRoute);
  app.use("/post", postRoute);
  app.use("*", (request, response) => {
    const error = { error: "Error 404 Not found" };
    response.status(404).render("errors/notfound", error);
  });
};

module.exports = constructorMethod;
