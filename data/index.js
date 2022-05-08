// const users = require("./users");
// module.exports = { userData: users };
const usersData = require("./users");
const postsRoomData = require("./postsRoom");
const postsRoomateData = require("./postsRoomate");
const searchData = require("./findPost");
const commentsRoomData = require("./makeCommentsRoom");
const commentsRoommateData = require("./makeCommentsRoommate");
const findIndividualPost = require("./findIndividualPost");
const message = require("./message");

// const albumsData = require("./albums");

let exportedMethods = {
  users: usersData,
  postsRoom: postsRoomData,
  postsRoomate: postsRoomateData,
  search: searchData,
  commentsRoom: commentsRoomData,
  commentsRoommate: commentsRoommateData,
  findIndividualPost: findIndividualPost,
  message: message,
};

module.exports = exportedMethods;
