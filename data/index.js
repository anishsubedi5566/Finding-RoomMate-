// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");
const postsRoomData = require("./postsRoom")
const postsRoomateData = require("./postsRoomate")
// const albumsData = require("./albums");

let exportedMethods = {
  users: usersData,
  // albums: albumsData,
  postsRoom: postsRoomData,
  postsRoomate: postsRoomateData,

};

module.exports = exportedMethods;
