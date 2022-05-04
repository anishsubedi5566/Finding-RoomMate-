let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;



function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}

let exportedMethods = {
  async searchPost(id) {
    
    // checkIsObjectID(id)
    const postCollection = await posts();
    console.log("Inside Data/findIndividualPost")
    const fetch_data = await postCollection.find({ _id: ObjectId(id) }).toArray();
    console.log(fetch_data);
    if (fetch_data.length === 0) {
      throw `There is not any post for  Id ${id}`;
    } else {
      return fetch_data;
    }
  },
};

module.exports = exportedMethods;
