let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const salRounds = 16;

function checkIsString(str) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${str} is empty`;
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) throw "Not an array";
  if (arr.length === 0) throw "Array is an empty array";
  for (let i = 0; i < arr.length; i++) {
    checkIsString(arr[i]);
  }
}

function checkIsNumber(num) {
  if (typeof num !== "number") throw `${num} is not a number`;

  if (isNaN(num)) throw `${num} is NaN`;
}

function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}
function checkValue(value) {
  if (!value) throw `${value} not provided, please provide.`;
}

let username_string_Check = (string, var_Name) => {
  if (typeof string !== "string")
    throw `given parameter ${var_Name} is not string`;

  const reg = /^[a-z0-9A-Z]+$/i;
  const validation = reg.test(string);
  if (!validation) throw `only  alphanumeric is acceptable in ${var_Name}`;

  string = string.trim();
  let n = string.length;
  for (let i = 0; i < n; i++) {
    if (string[i] === " ")
      throw `please, remove inbetween space in ${var_Name}`;
  }

  if (n < 4) throw `${var_Name} must be atleast 4 digit`;
};

const password_string_check = (string, var_Name) => {
  if (typeof string !== "string")
    throw `given parameter ${var_Name} is not string`;
  let n = string.length;
  for (let i = 0; i < n; i++) {
    if (string[i] === " ") throw `space are not allowed in  ${var_Name}`;
  }
  if (n < 6) throw `${var_Name} must be atleast 6 digit`;
};

let exportedMethods = {
  async create(
    username,
    password,
    securityQues,
    securityAns,
    firstName,
    lastName,
    schoolName,
    city,
    state,
    homeCountry,
    age,
    gender,
    bio,
    picture
  ) {
    //1. Both username and password must be supplied or you will throw an error
    if (!username) throw `please provide username`;
    if (!password) throw `please enter password`;

    //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error.
    username_string_Check(username, "username");
    username = username.trim();

    //3. The username should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.
    username = username.toLowerCase();

    //4.YOU MUST NOT allow duplicate usernames in the system. If the username is already in the database you will throw an error stating there is already a user with that username
    const userCollection = await users();
    const exist_user = await userCollection.findOne({ username: username });
    if (exist_user) throw `already a user with that ${username}`;

    //if user not exists then create
    //5. For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be at least 6 characters long. If it fails any of those conditions, you will throw an error.
    password_string_check(password, "password");

    password = password.trim();
    const hashPass = await bcrypt.hash(password, salRounds);

    //First Name error check
    checkValue(firstName);
    checkIsString(firstName);

    //LastName error check
    checkValue(lastName);
    checkIsString(lastName);

    //city error check
    checkValue(city);
    checkIsString(city);

    //state error check
    checkValue(state);
    checkIsString(state);

    //school name error check
    checkValue(schoolName);
    checkIsString(schoolName);

    //age error check
    checkValue(age);
    checkIsNumber(age);
    if (age < 15 || age > 100) throw "Age is invalid";

    //gender error check
    checkValue(gender);
    checkIsString(gender);

    //homeCountry error check
    if (!homeCountry) {
      homeCountry = "N/A";
    }

    //securityQues error handling
    checkValue(securityQues);
    checkIsString(securityQues);

    //securityAns error handling
    checkValue(securityAns);
    checkIsString(securityAns);

    //bio error check
    if (typeof bio === "undefined") {
      bio = "Bio is empty.";
    } else if (typeof bio === "string") {
      if (bio.trim().length === 0) {
        bio = "Bio is empty.";
      }
    }

    const usersCollection = await users();
    const user_detail = {
      username: username,
      password: hashPass,
      securityQuestion: securityQues,
      securityAns: securityAns,
      firstName: firstName,
      lastName: lastName,

      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,
      bio: bio,
      userProfileImage: picture,
      followers: [],
      posts: [],
    };

    // const insertInfo = await usersCollection.insertOne(user_detail);
    // if (insertInfo.insertedCount === 0) throw "Could not create user";

    // const newId = insertInfo.insertedId;

    // let user = await this.get(newId.toString());
    // return user;

    const inserted_user = await userCollection.insertOne(user_detail);
    if (inserted_user.insetedCount === 0) {
      throw `insertion of user failed`;
    } else {
      return { userInserted: true };
    }
  },

  async checkUser(username, password) {
    //1. Both username and password must be supplied or you will throw an error
    if (!username) throw `please provide username`;
    if (!password) throw `please enter password`;

    //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error.
    username_string_Check(username, "username");
    username = username.trim();

    //3. The username should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.
    username = username.toLowerCase();

    //4.For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be at least 6 characters long. If it fails any of those conditions, you will throw an error.
    password_string_check(password, "password");

    password = password.trim();
    //1.Query the db for the username supplied, if it is not found, throw an error stating "Either the username or password is invalid".
    const userCollection = await users();
    const exist_user = await userCollection.findOne({ username: username });
    if (!exist_user) throw `Either the username or password is invalid`;

    //if user exist then verify password
    const hashPass = exist_user.password;
    let password_validation = false;

    //If the username supplied is found in the DB, you will then use bcrypt to compare the hashed password in the database with the password input parameter.
    try {
      password_validation = await bcrypt.compare(password, hashPass);
    } catch (e) {}
    if (password_validation) {
      //3. If the passwords match your function will return {authenticated: true}
      return { authenticated: true };
    } else {
      throw "Either the username or password is invalid";
    }
  },
  // Get by ID method
  async getUserByID(id) {
    if (!id) throw "Id parameter must be supplied";
    checkIsObjectID(id);
    checkIsString(id);

    let newObjId = ObjectId(id);

    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: newObjId });

    if (user === null) throw "No user with that id";

    //result = JSON.parse(JSON.stringify(band));
    user._id = user["_id"].toString();
    console.log(user.firstName);
    return user;
  },

  async updateUserProfile(
    id,
    picture,
    firstName,
    lastName,
    schoolName,
    city,
    state,
    homeCountry,
    age,
    gender,
    bio
  ) {
    //ID error handling
    checkValue(id);
    checkIsString(id);
    checkIsObjectID(id);

    // firstName error handling
    checkValue(firstName);
    checkIsString(firstName);

    //LastName error check
    checkValue(lastName);
    checkIsString(lastName);

    //city error check
    checkValue(city);
    checkIsString(city);

    //state error check
    checkValue(state);
    checkIsString(state);

    //school name error check
    checkValue(schoolName);
    checkIsString(schoolName);

    //age error check
    checkValue(age);
    checkIsNumber(age);
    if (age < 15 && age > 110) throw "Age is invalid";

    //gender error check
    checkValue(gender);
    checkIsString(gender);

    //homeCountry error check
    // checkIsString(homeCountry);

    // //bio error check
    // checkIsString(bio);

    let obj = ObjectId(id);
    let usersCollection = await users();

    let user = await this.getUserByID(id);
    if (!user) {
      throw "User not found";
    }

    let updateUserProfile = {
      userProfileImage: picture,
      firstName: firstName,
      lastName: lastName,
      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,
      bio: bio,
    };

    const updateInfo = await usersCollection.updateOne(
      { _id: obj },
      { $set: updateUserProfile }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    //return await this.get(id);
    return {
      _id: id,
      userProfileImage: picture,
      firstName: firstName,
      lastName: lastName,
      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,
      bio: bio,
    };
  },

  async getUserByUsername(username) {
    if (!username) throw "You should provide a username";
    if (username.length == 0) throw "username is blank";
    if (username == null) throw "username cannot be null";
    if (username == undefined) throw "username should be defined";
    if (typeof username != "string") throw "username is not string";
    const user = await users();
    const getUser = await user.findOne({ username });
    getUser._id = getUser._id.toString();
    if (getUser == null || getUser == undefined) throw "No User with that id";
    return getUser;
  },
  //Checked
  async getAllUsers() {
    const userget = await users();
    const getAllUser = await userget.find({}).toArray();
    for (var i = 0; i < getAllUser.length; i++) {
      getAllUser[i]._id = getAllUser[i]._id.toString();
    }
    if (getAllUser == null || getAllUser == undefined)
      throw "User does not exists!";
    return getAllUser;
  },
  async deleteUser(_id) {
    if (_id === undefined || _id === null) {
      throw "Id is undefined";
    }
    if (_id.length === 0) {
      throw "Id is blank";
    }
    if (typeof _id != "string" || !_id.replace(/\s/g, "").length)
      throw "Id should be string";
    if (!ObjectId.isValid(_id)) {
      throw "Enter a valid object id";
    }
    const userCollection = await users();
    // await removeReviewByaUserId(_id);
    const deletionInfo = await userCollection.deleteOne({ _id: ObjectId(_id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${_id}`;
    }
    // await discussionCollection.removeDiscussionByUserId(_id);
    // await removeCommentsByUserId(_id);
    return true;
  },
};

module.exports = exportedMethods;
