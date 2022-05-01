let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

function checkIsString(str) {
  if (typeof str !== "string") throw `${str} is not a string`;
  if (str.trim().length === 0) throw "String contains only spaces";
  if (str.length === 0) throw `${str} is empty`;
}

function checkIsObjectID(id) {
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }
}

function checkValue(value) {
  if (!value) throw `${value} not provided, please provide.`;
}

let exportedMethods = {
  async searchCity(city) {
    console.log("city in data", city);

    checkValue(city);
    checkIsString(city);

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
    checkValue(schoolName);
    checkIsString(schoolName);

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
    checkValue(user);
    checkIsString(user);

    const postCollection = await posts();
    const fetch_data = await postCollection.find({ user: user }).toArray();
    console.log(fetch_data);

    if (fetch_data.length === 0) {
      throw `There is not any post for user ${user}`;
    } else {
      return fetch_data;
    }
  },
};

module.exports = exportedMethods;
