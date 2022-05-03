const connection = require("../config/mongoConnection");
const data = require("../data");
const { updateUserProfile } = require("../data/users");
//const data = require("../data");
const usersData = data.users;
// const albumsData = data.albums;

async function main() {
  const db = await connection.connectToDb();

  // // create user
  // try {
  //   const user = await usersData.create(
  //     "James5",
  //     "anserson123",
  //     "image",
  //     "Jack",
  //     "Anderson",
  //     "USA",
  //     "hoboken",
  //     "NJ",
  //     42,
  //     "male",
  //     "sit",
  //     "What is your nickname?",
  //     "Kitto",
  //     "Hey this is bio"
  //   );
  // } catch (e) {
  //   console.log(e);
  // }

  // //delete user by id
  // try {
  //   const deleteUser = await usersData.deleteUser("6266ffaad4692e036c7071df");
  //   console.log(deleteUser);
  // } catch (e) {
  //   console.log(e);
  // }

  // //get all users
  // try {
  //   const getAllUsers = await usersData.getAllUsers();
  //   console.log(getAllUsers);
  // } catch (e) {
  //   console.log(e);
  // }

  //update user
  try {
    const updateUser = await usersData.updateUserProfile(
      "62704fbcb416dbff77a8f9b2",
      "I am image",
      "Samuel",
      "King",
      "rap@gma.co",
      "Sit",
      "djsk",
      "sadasd",
      "None",
      18,
      "Male"
    );
    console.log(updateUser);
  } catch (e) {
    console.log(e);
  }
  //get user by id
  // try {
  //   const userId = await
  // }catch(e){
  //   console.log(e)
  // }

  await connection.closeConnection();
}

main();
