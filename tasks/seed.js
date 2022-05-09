const connection = require("../config/mongoConnection");
const data = require("../data");
const { updateUserProfile } = require("../data/users");

const usersData = data.users;
const postRoomData = data.postsRoom;
const postRoommateData = data.postsRoomate;
const commentsRoomData = data.commentsRoom;
const commentsRoommateData = data.commentsRoommate;
const messageData = data.message;
// const albumsData = data.albums;

async function main() {
  const db = await connection.connectToDb();
  await db.dropDatabase();
  //async create(username,password,securityQues,securityAns,firstName,lastName,email,
  //  schoolName,city,state,homeCountry,age,gender,picture)

  try {
    let date = new Date().toDateString();

    let user1 = await usersData.create(
      "rahul68",
      "rahulpawar",
      "Who is your first childhood friend?",
      "keyur",
      "rahul",
      "pawar",
      "rahul8@gmail.com",
      "University of Texas at Austin",
      "Austin",
      "Texas",
      "United Kingdom",
      23,
      "Male",
      "/public/uploads/transaction-in-month.png"
    );

    user1 = await usersData.getUserByUsername("rahul68");

    //user,postDate,title,city,state,schoolName,parkingAvailable,pets,
    //sharingAllowed,budget,student,otherdescription, userId,comments = []

    let p1 = await postRoomData.createPost(
      user1.username,
      date,
      "Room in Austin",
      "Austin",
      "Texas",
      "University of Texas at Austin",
      true,
      false,
      true,
      600,
      true,
      "I am activley looking for living place.",
      user1._id,
      []
    );

    let p2 = await postRoommateData.createPost(
      user1.username,
      date,
      "I am looking for roommate",
      "18 griffith street",
      "Austin",
      "Texas",
      "University of Texas at Austin",
      2,
      200,
      true,
      false,
      true,
      400,
      2,
      "I need roomate",
      [],
      user1._id
    );

    let user2 = await usersData.create(
      "keyur123",
      "1234567",
      "What is your nickname?",
      "keyur",
      "keyur",
      "senjaliya",
      "ksenfgf@gmail.com",
      "Stevens Institute of Technology",
      "Jersey City",
      "New Jersey",
      "United States of America",
      22,
      "Male",
      "/public/images/user_profile_default.png"
    );

    user2 = await usersData.getUserByUsername("keyur123");

    let p3 = await postRoomData.createPost(
      user2.username,
      date,
      "Room in Jersey City",
      "Jersey City",
      "New Jersey",
      "Stevens Institute of Technology",
      true,
      false,
      true,
      400,
      true,
      "I am activley looking for places in jersey city.",
      user2._id,
      []
    );

    let p4 = await postRoommateData.createPost(
      user2.username,
      date,
      "I am looking for roomate to share",
      "132  central street",
      "Jersey City",
      "New Jersey",
      "Stevens Institute of Technology",
      12,
      150,
      true,
      false,
      true,
      600,
      4,
      "I am opern to share",
      [],
      user2._id
    );

    const user3 = await usersData.create(
      "abhishek13",
      "abhi78",
      "Which is your favourite place to spend vacation?",
      "rushikesh",
      "abhishek",
      "desai",
      "abhi56@stevens.edu",
      "New York University",
      "New York",
      "New York",
      "India",
      23,
      "Male",
      "/public/uploads/bivariate-analysis.png"
    );

    const user4 = await usersData.create(
      "anish",
      "anish99",
      "Which is your favourite place to spend vacation?",
      "florida",
      "anish",
      "subedi",
      "anish@stevens.edu",
      "San Jose State University",
      "San Jose",
      "California",
      "Nepal",
      22,
      "Male",
      "/public/uploads/transaction-at-hour-of-day.png"
    );

    let fetch_data = await postRoomData.getPost();
    // console.log("fetchdata len is", fetch_data.length());
    console.log("fetch");
    fetch_data.forEach((element) => console.log(element));

    // createComment(postRoomId, user, date, comment)
    //
    let c1 = await commentsRoomData.createComment(
      fetch_data[0]._id,
      "keyur123",
      date,
      "I like your post "
    );
    let c2 = await commentsRoomData.createComment(
      fetch_data[0]._id,
      "abhishek13",
      date,
      "I aloso like your post "
    );
    let c3 = await commentsRoomData.createComment(
      fetch_data[2]._id,
      "anish",
      date,
      "I am interested "
    );
    let c4 = await commentsRoomData.createComment(
      fetch_data[2]._id,
      "abhishek13",
      date,
      "it is very good "
    );

    let c5 = await commentsRoommateData.createComment(
      fetch_data[1]._id,
      "abhishek13",
      date,
      "This is very good post "
    );
    let c6 = await commentsRoommateData.createComment(
      fetch_data[1]._id,
      "anish",
      date,
      "This is very good post "
    );

    // async createMessage(message,receivedBy,sendBy,date)
    let m1 = await messageData.createMessage(
      "I sent you personal message because  I like your post",
      user1.username,
      user2.username,
      date
    );

    // async createMessage(message,receivedBy,sendBy,date)
    let m2 = await messageData.createMessage(
      "Hi are you doing?",
      user2.username,
      user1.username,
      date
    );

    let m3 = await messageData.createMessage(
      "Hi, good morning",
      user2.username,
      user3.username,
      date
    );
  } catch (e) {
    console.log(e);
  }

  console.log("success");
  await connection.closeConnection();
}

main();
