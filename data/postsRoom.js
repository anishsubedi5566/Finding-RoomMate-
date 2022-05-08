let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

function checkValue(value, var_Name) {
  if (!value) throw `${var_Name} not provided, please provide.`;
}

function checkIsString(str, var_Name) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${var_Name} is empty`;
}

function checkIsNumber(num,var_Name) {
  if (typeof num !== "number") throw `${num} is not a number`;
  if (isNaN(num)) throw `${var_Name} is NaN`;
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
    otherdescription,
    comments = []
  ) {
    

    //check for username
    checkValue(user,'user');
    checkIsString(user,'user');

    //check postdate is valid or not
    if (!postDate) throw "postDate is empty";

    //check title is valid or not
    checkValue(title, "title");
    checkIsString(title,"title");

    //city error check
    checkValue(city,'city');
    checkIsString(city,'city');

    //state error check
    checkValue(state,'state');
    checkIsString(state,'state');

    //schoolName error check
    checkValue(schoolName,'schoolName');
    checkIsString(schoolName,'schoolName');

    //budget
    checkValue(budget,'budget');
    checkIsNumber(budget,'budget');
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
      comments: comments,
    };

    // console.log(post_detail);

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


  // async getPost() {
  //   try {
  //     const postCollection = await posts();
  //     const allpost = await postCollection.find({ field: "room" }).toArray();
  //     allpost.map((item) => (item._id = item._id.toString()));

  //     allpost.sort((a, b) => b.postDate - a.postDate);

  //     return allpost;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // },
  
  async getPost() {
    try {
      const postCollection = await posts();
      const allpost = await postCollection.find().toArray();
      allpost.map((item) => (item._id = item._id.toString()));

      allpost.sort((a, b) => b.postDate - a.postDate);

      return allpost;
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = exportedMethods;
