let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

let exportedMethods = {
  async createPost(postDate, image, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms,sharingAllowed, City, State, comments) {
      console.log("reached here data/posts")
    // if (!username) throw `please provide username`;
    // if (!password) throw `please enter password`;
      const post_detail = {
      postDate: postDate,
      image: image,
      sizeOfApartment: sizeOfApartment,
      petsAllowed: petsAllowed,
      coupleAllowed: coupleAllowed,
      parkingAvailable: parkingAvailable,
      numberOfRooms: numberOfRooms,
      sharingAllowed: sharingAllowed,
      City: City,
      State: State,
      comments: comments,
    };

    try {

    const postCollection = await posts();
    console.log("Connection established" )
    const inserted_user = await postCollection.insertOne(post_detail);

    if (!inserted_user.acknowledged) {
      throw `insertion of post failed`;
    } else {
      return { inserted_user_Id: inserted_user.insertedId};
    }
    } catch (error) {
      console.log("error", error)
    }
    
  },


};

module.exports = exportedMethods;
