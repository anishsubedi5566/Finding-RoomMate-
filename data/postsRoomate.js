let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const { all } = require("../routes/users");
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
    street,
    city,
    state,
    schoolName,
    roomNumber,
    roomarea,
    petsAllowed,
    parkingAvailable,
    sharingAllowed,
    rent,
    peoplelivingcurrently,
    otherdescription,
    picture
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
    console.log(
      user,
      postDate,
      title,
      street,
      city,
      state,
      roomNumber,
      roomarea,
      petsAllowed,
      parkingAvailable,
      sharingAllowed,
      rent,
      peoplelivingcurrently,
      otherdescription
    );

    //check for username
    checkValue(user);
    checkIsString(user);

    //check postdate is valid or not
    if (!postDate) throw "postDate is empty";

    //check title is valid or not
    checkValue(title);
    checkIsString(title);

    //check street is valid or not
    checkValue(street);
    checkIsString(street);

    //city error check
    checkValue(city);
    checkIsString(city);

    //state error check
    checkValue(state);
    checkIsString(state);

    //schoolName error check
    checkValue(schoolName);
    checkIsString(schoolName);

    //roomNumber
    checkValue(roomNumber);
    checkIsNumber(roomNumber);
    //convert roomNumber into integer
    roomNumber = parseInt(roomNumber);
    if (roomNumber < 1 || roomNumber > 15)
      throw "roomNumber must be between 1 to 15";

    //roomarea
    checkValue(roomarea);
    checkIsNumber(roomarea);
    //convert roomarea into integer
    roomarea = parseInt(roomarea);
    if (roomarea < 100) throw "roomarea must be greater eqaul to 100";

    //rent
    checkValue(rent);
    checkIsNumber(rent);
    //convert rent into integer
    rent = parseInt(rent);
    console.log("data rent", rent, rent < 100, typeof rent);
    if (rent < 100) throw "rent must be greater eqaul to 100";

    //peoplelivingcurrently
    checkValue(peoplelivingcurrently);
    checkIsNumber(peoplelivingcurrently);
    //convert peoplelivingcurrently into integer
    peoplelivingcurrently = parseInt(peoplelivingcurrently);
    if (peoplelivingcurrently < 1)
      throw "peoplelivingcurrently must be greater than zero";

    const post_detail = {
      field: "roommate",
      user: user,
      postDate: postDate,
      title: title,
      street: street,
      city: city,
      state: state,
      schoolName: schoolName,
      roomNumber: roomNumber,
      roomarea: roomarea,
      petsAllowed: petsAllowed,
      parkingAvailable: parkingAvailable,
      sharingAllowed: sharingAllowed,
      rent: rent,
      peoplelivingcurrently: peoplelivingcurrently,
      otherdescription: otherdescription,
      postImages: picture,
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
      const allpost = await postCollection.find({ field: "roomate" }).toArray();
      // allpost.map(item=>console.log(item._id.toString()))
      allpost.map((item) => (item._id = item._id.toString()));

      allpost.sort((a, b) => b.postDate - a.postDate);

      return allpost;
    } catch (error) {
      console.log("error", error);
    }
  },
};

module.exports = exportedMethods;
