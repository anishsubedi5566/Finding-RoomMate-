let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

function checkValue(value) {
  if (!value) throw `${value} not provided, please provide.`;
}

function checkIsString(str) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${str} is empty`;
}

function checkIsNumber(num) {
  if (typeof num !== "number") throw `${num} is not a number`;
  if (isNaN(num)) throw `${num} is NaN`;
}

let exportedMethods = {
  async createPost(
    user,
    postDate,
    title,
    city,
    state,
    schoolName,
    parkingAvailable,
    pets,
    sharingAllowed,
    budget,
    student,
    otherdescription
  ) {
    // if(!postDate) throw "postDate is empty"
    // if(!sizeOfApartment || typeof sizeOfApartment != "string" || sizeOfApartment == " ") throw "Enter size of apartment"
    // if(!numberOfRooms || typeof numberOfRooms != "string" || numberOfRooms == " ") throw "Enter number of rooms"
    // if(!city || typeof city != "string" || city == " ") throw "Enter city"
    // if(!state || typeof state != "string" || state == " ")  throw "Enter state"
    // if(typeof petsAllowed != "boolean") throw "Pets allowed is empty"
    // if(typeof coupleAllowed != "boolean") throw "Couple allowed is empty"
    // if(typeof parkingAvailable != "boolean") throw "Parking is empty"
    // if(typeof sharingAllowed != "boolean") throw "Sharing allowed is empty"

    //check for username
    checkValue(user);
    checkIsString(user);

    //check postdate is valid or not
    if (!postDate) throw "postDate is empty";

    //check title is valid or not
    checkValue(title);
    checkIsString(title);

    //city error check
    checkValue(city);
    checkIsString(city);

    //state error check
    checkValue(state);
    checkIsString(state);

    //schoolName error check
    checkValue(schoolName);
    checkIsString(schoolName);

    //budget
    checkValue(budget);
    checkIsNumber(budget);
    //convert budget into integer
    budget = parseInt(budget);
    if (budget < 100) throw "budget must be greater eqaul to 100";

    const post_detail = {
      field: "room",
      user: user,
      postDate: postDate,
      title: title,
      city: city,
      state: state,
      schoolName: schoolName,
      parkingAvailable: parkingAvailable,
      pets: pets,
      sharingAllowed: sharingAllowed,
      budget: budget,
      student: student,
      otherdescription: otherdescription,
    };
    try {
      const postCollection = await posts();
      const inserted_user = await postCollection.insertOne(post_detail);
      if (!inserted_user.acknowledged) {
        throw `insertion of post failed`;
      } else {
        return { message: "Post is posted successfully" };
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  async getPost() {
    try {
      const postCollection = await posts();
      const allpost = await postCollection.find({ field: "room" }).toArray();
      allpost.map((item) => (item._id = item._id.toString()));

      allpost.sort((a, b) => b.postDate - a.postDate);

      return allpost;
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = exportedMethods;
