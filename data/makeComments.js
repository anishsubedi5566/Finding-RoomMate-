// create, update, delete, get 

// const { ObjectID } = require("bson");
ObjectId = require('mongodb').ObjectId
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const comments = mongoCollections.comments;




function checkValue(value) {
    if (!value) throw `${value} not provided, please provide.`;
  }
  
  function checkIsString(str) {
    if (typeof str !== "string") throw `${str} is not a string`;
    if (str.trim().length === 0) throw "String contains only spaces";
    if (str.length === 0) throw `${str} is empty`;
  }

  function checkIsObjectID(id) {
    if (!ObjectId.isValid(id)) {
      throw "ID is not a valid Object ID";
    }
  }
  
  

async function createComment(id, username, date, comment){
    
  //bandId error handling
  checkValue(id);
  checkIsString(id);
  checkIsObjectID(id);
  const postObjId = ObjectId(id);
  let checkPostId = await bandsCollection.findOne({ _id: postObjId });
  if (checkPostId === null) {
    throw "Post not found";
  }

    checkValue(username);
    checkIsString(username);

    if (!date) throw "date is empty";

    checkIsString(comment);

    const commentsCollection = await comments();

    const comment_detail = {
        _id: new ObjectId(id),
        username: username,
        date: date, 
        comment: comment
    };



    try{
        const postCollection = await posts();
        const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(id)},
        { $addToSet: { comments: { _id: ObjectId(), username: username, date: date, comment: comment } } }
    )
    console.log(updateInfo);
    if (!updateInfo.acknowledged) {
        throw `insertion of comment failed`;
      } else {
        return { message: "Comment is posted successfully" };
      }
      }
      catch (error) {
        console.log("error", error);
      }
    
      const insertInfo = await commentsCollection.insertOne(comment_detail);
      if (insertInfo.insertedCount === 0) throw "Could not create comment";
  
      const newId = insertInfo.insertedId;
  
      let comm = await this.get(newId.toString());
      return comm;

}

async function getAllComments(id){
  
    checkValue(id);
    checkIsString(id);
    checkIsObjectID(id);

    // const bandsCollection = await bands();
    // const bandsList = await bandsCollection.find({}).toArray();

    let post = await posts.get(bandId);
    if (!post) throw "Post not found";
    //if (bands["albums"].length === 0) return [];
    // if (bands.albums.length === 0) {
    //   return [];
    // }

    let res = post["comments"];

    for (let ele of res) {
      ele["_id"] = ele["_id"].toString();
    }

    return res;

}

module.exports = {
    createComment, getAllComments
}