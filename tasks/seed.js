const connection = require("../config/mongoConnection");
const data = require("../data");
const { updateUserProfile } = require("../data/users");

const usersData = data.users;
const postRoomData = data.postsRoom;
const postRoommateData = data.postsRoomate;
const commentsRoomData = data.commentsRoom;
const commentsRoommateData = data.commentsRoommate;
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

  // //update user
  // try {
  //   const updateUser = await usersData.updateUserProfile(
  //     "62704fbcb416dbff77a8f9b2",
  //     "I am image",
  //     "Samuel",
  //     "King",
  //     "rap@gma.co",
  //     "Sit",
  //     "djsk",
  //     "sadasd",
  //     "None",
  //     18,
  //     "Male"
  //   );
  //   console.log(updateUser);
  // } catch (e) {
  //   console.log(e);
  // }
  //get user by id
  // try {
  //   const userId = await
  // }catch(e){
  //   console.log(e)
  // }

  // //Get post room by id

  // try {
  //   const getPost = await postRoomData.getPostRoomByID(
  //     "6277009e75d62271ea904834"
  //   );
  //   console.log(getPost);
  // } catch (e) {
  //   console.log(e);
  // }

  // //check comment for post room
  // try {
  //   const newComment = await commentsRoomData.createComment(
  //     "6277009e75d62271ea904834",
  //     "rahul123",
  //     "05/07/2022",
  //     "Hey I have a room"
  //   );
  //   console.log(newComment);
  // } catch (e) {
  //   console.log(e);
  // }

  // //Get post room by id

  // try {
  //   const getPost = await postRoomData.getPostRoomByID(
  //     "6277009e75d62271ea904834"
  //   );
  //   console.log(getPost);
  // } catch (e) {
  //   console.log(e);
  // }

  // //check comment for post roommate
  // try {
  //   const newComment = await commentsRoommateData.createComment(
  //     "62770ee3b4539d35c28e5f8f",
  //     "rahul123",
  //     "05/07/2022",
  //     "Hey I need a roommate"
  //   );
  //   console.log(newComment);
  // } catch (e) {
  //   console.log(e);
  // }

  //get post roommate by id
  try {
    const getPostRoommate = await postRoommateData.getPostRoommateByID(
      "62770ee3b4539d35c28e5f8f"
    );
    console.log(getPostRoommate);
  } catch (e) {
    console.log(e);
  }

  await connection.closeConnection();
}

main();
