// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");
// const albumsData = require("./albums");

let exportedMethods = {
  users: usersData,
  // albums: albumsData,
};

module.exports = exportedMethods;
