// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");
const postsRoomData = require("./postsRoom");
const postsRoomateData = require("./postsRoomate");
const searchData = require("./findPost");
const commentData = require("./makeComments");
const findIndividualPost = require("./findIndividualPost");
// const albumsData = require("./albums");

let exportedMethods = {
  users: usersData,
  postsRoom: postsRoomData,
  postsRoomate: postsRoomateData,
  search: searchData,
  comment: commentData,
  findIndividualPost: findIndividualPost
};

module.exports = exportedMethods;
