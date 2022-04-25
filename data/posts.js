let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

let exportedMethods = {
  async createPost(postDate, sizeOfApartment, petsAllowed, coupleAllowed, parkingAvailable, numberOfRooms, sharingAllowed, city, state, comments) {
    if(!postDate) throw "postDate is empty"
    if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    if(!city || typeof city != "string" || city == " ") throw "Enter city"
    if(!state || typeof state != "string" || state == " ")  throw "Enter state"
    if(typeof petsAllowed != "boolean") throw "Pets allowed is empty"
    if(typeof coupleAllowed != "boolean") throw "Couple allowed is empty"
    if(typeof parkingAvailable != "boolean") throw "Parking is empty"
    if(typeof sharingAllowed != "boolean") throw "Sharing allowed is empty"
    
    const post_detail = {
      postDate: postDate,
      sizeOfApartment: sizeOfApartment,
      petsAllowed: petsAllowed,
      coupleAllowed: coupleAllowed,
      parkingAvailable: parkingAvailable,
      numberOfRooms: numberOfRooms,
      sharingAllowed: sharingAllowed,
      city: city,
      state: state,
      comments: comments,
    };

    try {
    const postCollection = await posts();
    const inserted_user = await postCollection.insertOne(post_detail);
    if (!inserted_user.acknowledged) {
      throw `insertion of post failed`;
    } else {
      return { message: "Post is posted successfully"};
    }
    } catch (error) {
      console.log("error", error)
    }
    
  },

  async getPost() {
    try {
    const postCollection = await posts();
    const allpost = await postCollection.find().toArray();
    
    // allpost.map(item=>console.log(item._id.toString()))
    allpost.map(item=>(item._id = item._id.toString()))

    allpost.sort((a, b) => b.postDate - a.postDate)
    
    return allpost
    } catch (error) {
      console.log("error", error)
    }
    
  },

};

module.exports = exportedMethods;
