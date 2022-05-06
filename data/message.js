// let { ObjectId } = require("mongodb");
// const mongoCollections = require("../config/mongoCollections");
// const messages = mongoCollections.messages;


// let exportedMethods = {
//   async createMessage(
//     message,
//     sendBy,
//     receivedBy,
//     date
//   ) {
   
//     const message_detail = {
//       message: message,
//       date: date,
//       sendBy: sendBy,
//       receivedBy: receivedBy,
//     };
//     try {
//       const messageCollection = await messages();
//       const inserted_user = await messageCollection.insertOne(message_detail);
//       if (!inserted_user.acknowledged) {
//         throw `insertion of post failed`;
//       } else {
//         return { message: "Message is sent successfully" };
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   },

//   async getPost(user) {
//     try {
//       const messageCollection = await messages();
//       const allMessage = await messageCollection.find({
//         "sendBy": user,
//         "receivedBy": user
//       }).toArray();
//       allMessage.map((item) => (item._id = item._id.toString()));
//       allMessage.sort((a, b) => b.postDate - a.postDate);
//       return allMessage;
//     } catch (error) {
//       console.log("error", error);
//     }
//   },
// //   async getPost() {
// //     try {
// //       const postCollection = await posts();
// //       const allpost = await postCollection.find().toArray();
// //       allpost.map((item) => (item._id = item._id.toString()));

// //       allpost.sort((a, b) => b.postDate - a.postDate);

// //       return allpost;
// //     } catch (error) {
// //       console.log("error", error);
// //     }
// //   },
// };

// module.exports = exportedMethods;
let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const messages = mongoCollections.messages;


let exportedMethods = {
  async createMessage(
    message,
    receivedBy,
    sendBy,
    date
  ) {
   
    const message_detail = {
      message: message,
      date: date,
      sendBy: sendBy,
      receivedBy: receivedBy,
    };
    try {
      const messageCollection = await messages();
      const inserted_user = await messageCollection.insertOne(message_detail);
      if (!inserted_user.acknowledged) {
        throw `insertion of post failed`;
      } else {
        return { message: "Message is sent successfully" };
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  async getMessage(user) {
    try {
      const messageCollection = await messages();
      const allMessage = await messageCollection.find({ $or: [
        { "sendBy": user },
        { "receivedBy": user}
      ]}).toArray();
      allMessage.map((item) => (item._id = item._id.toString()));
      allMessage.sort((a, b) => b.postDate - a.postDate);
      return allMessage;
    } catch (error) {
      console.log("error", error);
    }
  },
  async getSpecificMessage(user) {
    var arr = user.split("-");
    let first = arr[0]
    let second = arr[1]
    try {
      const messageCollection = await messages();
      const allMessage = await messageCollection.find({ $or: [
        { "sendBy": first },
        { "receivedBy": second},
        { "sendBy": second },
        { "receivedBy": first}
      ]}).toArray();
      allMessage.map((item) => (item._id = item._id.toString()));
      allMessage.sort((a, b) => b.postDate - a.postDate);
      return allMessage;
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = exportedMethods;
