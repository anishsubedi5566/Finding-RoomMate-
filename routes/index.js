const usersRoute = require("./users");
const postRoute = require("./posts")
const constructorMethod = (app) => {
  app.use("/", usersRoute);
  app.use("/post", postRoute)
  app.use("*", (request, response) => {
    response.status(404).json({
      error: "Not found",
    });
  });
};

module.exports = constructorMethod;
