const usersRoute = require("./users");
const constructorMethod = (app) => {
  app.use("/", usersRoute);
  app.use("*", (request, response) => {
    response.status(404).json({
      error: "Not found",
    });
  });
};

module.exports = constructorMethod;
