const connection = require("../config/mongoConnection");
const data = require("../data");
//const data = require("../data");
const usersData = data.users;
// const albumsData = data.albums;

async function main() {
  const db = await connection.connectToDb();

  try {
    const user = await usersData.create(
      "James5",
      "anserson123",
      "image",
      "Jack",
      "Anderson",
      "USA",
      "hoboken",
      "NJ",
      42,
      "male",
      "sit",
      "What is your nickname?",
      "Kitto",
      "Hey this is bio"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const user = await usersData.create(
      "abhishek",
      "abhishek123",
      "image",
      "abhishek",
      "desai",
      "USA",
      "hoboken",
      "NJ",
      22,
      "male",
      "sit",
      "What is your nickname?",
      "abhi",
      "Hey this is bio"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const user = await usersData.create(
      "keyur",
      "keyur123",
      "image",
      "keyur",
      "senjaliya",
      "USA",
      "jersey city",
      "NJ",
      42,
      "male",
      "sit",
      "What is your nickname?",
      "Kitto",
      "Hey this is bio"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const user = await usersData.create(
      "rahul",
      "rahul123",
      "image",
      "rahul",
      "pawar",
      "USA",
      "hoboken",
      "NJ",
      22,
      "male",
      "sit",
      "What is your nickname?",
      "Kitto",
      "Hey this is bio"
    );
  } catch (e) {
    console.log(e);
  }

  

  await connection.closeConnection();
}

main();
