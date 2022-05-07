let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

function checkIsString(str, var_Name) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${var_Name} is empty`;
}

function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}

function checkValue(value, var_Name) {
  if (!value) throw `${var_Name} not provided, please provide.`;
}

let exportedMethods = {
  async searchCity(city) {
    console.log("city in data", city);

    checkValue(city,'city');
    checkIsString(city,'city');

    const postCollection = await posts();
    const fetch_data = await postCollection.find({ city: city }).toArray();
    console.log(fetch_data);

    if (fetch_data.length === 0) {
      throw `There is not any post for city ${city}`;
    } else {
      return fetch_data;
    }
  },

  async searchschoolName(schoolName) {
    //schoolName error check
    checkValue(schoolName,'schoolName');
    checkIsString(schoolName,'schoolName');

    const postCollection = await posts();
    const fetch_data = await postCollection
      .find({ schoolName: schoolName })
      .toArray();
    console.log(fetch_data);

    if (fetch_data.length === 0) {
      throw `There is not any post for schoolName ${schoolName}`;
    } else {
      return fetch_data;
    }
  },

  async searchmyPost(user) {
    //user error check
    checkValue(user,'user');
    checkIsString(user,'user');

    const postCollection = await posts();
    const fetch_data = await postCollection.find({ user: user }).toArray();
    console.log(fetch_data);

    if (fetch_data.length === 0) {
      throw `There is not any post for user ${user}`;
    } else {
      return fetch_data;
    }
  },
  async getallPost() {
    const postCollection = await posts();
    const fetch_data = await postCollection.find({}).toArray();
    console.log(fetch_data.length);

    if (fetch_data.length === 0) {
      throw `There is not any post `;
    } else {
      return fetch_data;
    }
  },
};

module.exports = exportedMethods;
