// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");

let exportedMethods = {
  users: usersData,
};

module.exports = exportedMethods;
