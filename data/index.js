// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");
const postsData = require("./posts")
// const albumsData = require("./albums");

let exportedMethods = {
  users: usersData,
  // albums: albumsData,
  posts: postsData
};

module.exports = exportedMethods;
