const flowRoute = require("./flow");
const constructorMethod = (app) => {
  app.use("/", flowRoute);
  app.use("*", (request, response) => {
    response.status(404).json({
      error: "Not found",
    });
  });
};

module.exports = constructorMethod;
