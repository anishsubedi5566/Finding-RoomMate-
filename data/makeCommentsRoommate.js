// create, update, delete, get

// const { ObjectID } = require("bson");
let { ObjectId } = require("mongodb");
const { postsRoom } = require(".");

const mongoCollections = require("../config/mongoCollections");
// const { create } = require("../routes/users");
const posts = mongoCollections.posts;
const postRoommateData = posts.postRoommateData;

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

async function createComment(postRoommateId, user, date, comment) {
  const postsRoommateCollection = await posts();
  checkValue(postRoommateId, "Post id");
  checkIsString(postRoommateId, "Post id");
  checkIsObjectID(postRoommateId, "Post id");
  const postRoommateObjId = ObjectId(postRoommateId);
  console.log(postRoommateObjId);
  let checkPostRoommateId = await postsRoommateCollection.findOne({
    _id: postRoommateObjId,
  });
  if (checkPostRoommateId === null) {
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

  let updatePostRoommate = await postsRoommateCollection.updateOne(
    { _id: postRoommateObjId },
    { $push: { comments: newComment } }
  );

  if (!updatePostRoommate.matchedCount && !updatePostRoommate.modifiedCount) {
    throw "Comment not created";
  }

  return newComment;
}

// async function getAllComments(postRoommateId) {
//   checkValue(postRoommateId, "Post id");
//   checkIsString(postRoommateId), "Post id";
//   checkIsObjectID(postRoommateId);

//   // const bandsCollection = await bands();
//   // const bandsList = await bandsCollection.find({}).toArray();

//   let postsRoommate = await postRoomData.get(pos);
//   if (!bands) throw "Band not found";
//   //if (bands["albums"].length === 0) return [];
//   // if (bands.albums.length === 0) {
//   //   return [];
//   // }

//   let res = bands["albums"];

//   for (let ele of res) {
//     ele["_id"] = ele["_id"].toString();
//   }

//   return res;
// }

module.exports = {
  createComment,
};
