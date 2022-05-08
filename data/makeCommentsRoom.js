// create, update, delete, get

// const { ObjectID } = require("bson");
let { ObjectId } = require("mongodb");
const { postsRoom } = require(".");

const mongoCollections = require("../config/mongoCollections");
// const { create } = require("../routes/users");
const posts = mongoCollections.posts;
const postRoomData = posts.postRoomData;

function checkValue(value, var_Name) {
  if (!value) throw `${var_Name} not provided, please provide.`;
}

function checkIsString(str, var_Name) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${var_Name} is empty`;
}

function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}

async function createComment(postRoomId, user, date, comment) {
  const postsRoomCollection = await posts();
  checkValue(postRoomId, "Post id");
  checkIsString(postRoomId, "Post id");
  checkIsObjectID(postRoomId, "Post id");
  const postRoomObjId = ObjectId(postRoomId);
  console.log(postRoomObjId);
  let checkPostRoomId = await postsRoomCollection.findOne({
    _id: postRoomObjId,
  });
  if (checkPostRoomId === null) {
    throw "Post for room not found";
  }
  checkValue(user, "user");
  checkIsString(user, "user");

  checkValue(date, "date");
  checkIsString(date, "date");

  checkValue(comment, "comment");
  checkIsString(comment, "comment");

  const newComment = {
    _id: new ObjectId(),
    username: user,
    commentDate: date,
    comment: comment,
  };

  let updatePostRoom = await postsRoomCollection.updateOne(
    { _id: postRoomObjId },
    { $push: { comments: newComment } }
  );

  if (!updatePostRoom.matchedCount && !updatePostRoom.modifiedCount) {
    throw "Comment not created";
  }

  return newComment;
}

module.exports = {
  createComment,
};
