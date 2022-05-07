let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const { get } = require("express/lib/response");
const salRounds = 11;

function checkIsString(str, var_Name) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${var_Name} is empty`;
}


function checkIsNumber(num,var_Name) {
  if (typeof num !== "number") throw `${num} is not a number`;

  if (isNaN(num)) throw `${var_Name} is NaN`;
}

function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}
function checkValue(value, var_Name) {
  if (!value) throw `${var_Name} not provided, please provide.`;
}

function validateEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    throw "Email is invalid";
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

  if (n < 4) throw `${var_Name} must be atleast 4 characters`;
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
    email,
    schoolName,
    city,
    state,
    homeCountry,
    age,
    gender,

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

    //security question error handling
    checkValue(securityQues,'securityQues');
    checkIsString(securityQues,'securityQues');
    if (securityQues == "None") {
      throw "Security question should not be none";
    }

    //Email error handling
    checkValue(email,'email');
    checkIsString(email,'email');
    validateEmail(email);

    //First Name error check
    checkValue(firstName,'firstName');
    checkIsString(firstName,'firstName');
    if (firstName.length < 2) {
      throw "First name must be of 2 or more than 2 characters";
    }

    //LastName error check
    checkValue(lastName,'lastName');
    checkIsString(lastName,'lastName');
    if (lastName.length < 2) {
      throw "Last name must be of 2 or more than 2 characters";
    }

    //city error check
    checkValue(city,'city');
    checkIsString(city,'city');

    if (city == "None") {
      throw "City should not be none";
    }

    //state error check
    checkValue(state,'state');
    checkIsString(state,'state');
    if (state == "None") {
      throw "State should not be none";
    }

    //school name error check
    checkValue(schoolName,'schoolName');
    checkIsString(schoolName,'schoolName');
    if (schoolName == "None") {
      throw "School name should not be none";
    }

    //age error check
    checkValue(age,'age');
    checkIsNumber(age,'age');
    if (age < 15 || age > 100) throw "Age is invalid";

    //gender error check
    checkValue(gender,'gender');
    checkIsString(gender,'gender');
    if (gender == "None") {
      throw "Gender should not be none";
    }

    //homeCountry error check
    if (!homeCountry) {
      homeCountry = "N/A";
    }

    //securityQues error handling
    checkValue(securityQues,'securityQues');
    checkIsString(securityQues,'securityQues');

    //securityAns error handling
    checkValue(securityAns,'securityAns');
    checkIsString(securityAns,'securityAns');

    const usersCollection = await users();
    const user_detail = {
      username: username,
      password: hashPass,
      securityQuestion: securityQues,
      securityAns: securityAns,
      firstName: firstName,
      lastName: lastName,
      email: email,
      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,

      userProfileImage: picture,

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
    checkIsString(id,'id');

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
    email,
    schoolName,
    city,
    state,
    homeCountry,
    age,
    gender
  ) {
    //ID error handling
    checkValue(id,'id');
    checkIsString(id,'id');
    checkIsObjectID(id);

    //Email error handling
    checkValue(email,'email');
    checkIsString(email,'email');
    validateEmail(email);

    //First Name error check
    checkValue(firstName,'firstName');
    checkIsString(firstName,'firstName');
    if (firstName.length < 2) {
      throw "First name must be of 2 or more than 2 characters";
    }

    //LastName error check
    checkValue(lastName,'lastName');
    checkIsString(lastName,'lastName');
    if (lastName.length < 2) {
      throw "Last name must be of 2 or more than 2 characters";
    }
    //city error check
    checkValue(city,'city');
    checkIsString(city,'city');

    //state error check
    checkValue(state,'state');
    checkIsString(state,'state');

    //school name error check
    checkValue(schoolName,'schoolName');
    checkIsString(schoolName,'schoolName');

    //age error check
    checkValue(age,'age');
    checkIsNumber(age,'age');
    if (age < 15 && age > 110) throw "Age is invalid";

    //gender error check
    checkValue(gender,'gender');
    checkIsString(gender,'gender');


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
      email: email,
      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,
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
      email: email,
      schoolName: schoolName,
      city: city,
      state: state,
      homeCountry: homeCountry,
      age: age,
      gender: gender,
    };
  },

  async updatePassword(username, password) {
    //1. Both username and password must be supplied or you will throw an error
    if (!username) throw `please provide username`;
    //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error.
    username_string_Check(username, "username");
    username = username.trim();
    //3. The username should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.
    username = username.toLowerCase();

    //password error check
    if (!password) throw `please enter password`;
    //5. For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be at least 6 characters long. If it fails any of those conditions, you will throw an error.
    password_string_check(password, "password");

    password = password.trim();
    const hashPass = await bcrypt.hash(password, salRounds);

    let usersCollection = await users();
    const updateInfo = await usersCollection.updateOne(
      { username: username },
      { $set: { password: hashPass } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
      throw "Update failed";
    } else {
      return { updated: true };
    }
  },

  // async getUserByUsername(username) {
  //   if (!username) throw "You should provide a username";
  //   if (username.length == 0) throw "username is blank";
  //   if (username == null) throw "username cannot be null";
  //   if (username == undefined) throw "username should be defined";
  //   if (typeof username != "string") throw "username is not string";
  //   const user = await users();
  //   const getUser = await user.findOne({ username });

  //   getUser._id = getUser._id.toString();
  //   if (getUser == null || getUser == undefined) throw "No User with that Name";
  //   return getUser;
  // },

  async getUserByUsername(username) {
    //1. Both username and password must be supplied or you will throw an error
    if (!username) throw `please provide username`;
    //2.For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error.
    username_string_Check(username, "username");
    username = username.trim();
    //3. The username should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.
    username = username.toLowerCase();

    const userCollection = await users();
    const exist_user = await userCollection.findOne({ username: username });
    if (exist_user) {
      console.log("data updated successfully");
      return exist_user;
    } else {
      throw "User does not exist";
    }
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
