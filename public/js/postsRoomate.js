function validatepostRoomate(e) {
  e.preventDefault();

  let titleVal = document.getElementById("title").value;
  let streetVal = document.getElementById("street").value;
  let cityVal = document.getElementById("city").value;
  let stateVal = document.getElementById("state").value;
  let schoolNameVal = document.getElementById("schoolName").value;
  let roomNumberVal = Number(document.getElementById("roomNumber").value);
  let roomareaVal = Number(document.getElementById("roomarea").value);
  let rentVal = Number(document.getElementById("rent").value);
  let peoplelivingcurrentlyVal = Number(
    document.getElementById("peoplelivingcurrently").value
  );

  const postRoomForm = document.getElementById("post-form");
  console.log("title is", titleVal);

  let errorMessage = null;

  //title error check
  if (
    !titleVal ||
    titleVal.trim().length == "" ||
    titleVal == null ||
    titleVal == undefined
  ) {
    errorMessage = "Please provide a title";
  }

  //street error check
  else if (
    !streetVal ||
    streetVal.trim().length == "" ||
    streetVal == null ||
    streetVal == undefined
  ) {
    errorMessage = "Please provide a street";
  }

  //city error check
  else if (
    !cityVal ||
    cityVal.trim().length == "" ||
    cityVal == null ||
    cityVal == undefined
  ) {
    errorMessage = "Please provide a city";
  }

  //state error check
  else if (
    !stateVal ||
    stateVal.trim().length == "" ||
    stateVal == null ||
    stateVal == undefined
  ) {
    errorMessage = "Please provide a state";
  }

  //schoolName error check
  else if (
    !schoolNameVal ||
    schoolNameVal.trim().length == "" ||
    schoolNameVal == null ||
    schoolNameVal == undefined
  ) {
    errorMessage = "Please provide a schoolName";
  }

  //  room avilable error check
  else if (
    !roomNumberVal ||
    roomNumberVal == null ||
    roomNumberVal == undefined
  ) {
    errorMessage = "Please provide a room avilable";
  } else if (roomNumberVal < 1 || roomNumberVal > 15) {
    errorMessage = "room avilable must be between 1 to 15";
  }

  // roomarea error check
  else if (!roomareaVal || roomareaVal == null || roomareaVal == undefined) {
    errorMessage = "Please provide a roomarea";
  } else if (roomareaVal < 100) {
    errorMessage = "roomarea must be greater eqaul to 100";
  }

  // rent error check
  else if (!rentVal || rentVal == null || rentVal == undefined) {
    errorMessage = "Please provide a rent";
  } else if (rentVal < 100) {
    errorMessage = "rent must be greater eqaul to 100";
  }

  // peoplelivingcurrently error check
  else if (
    !peoplelivingcurrentlyVal ||
    peoplelivingcurrentlyVal == null ||
    peoplelivingcurrentlyVal == undefined
  ) {
    errorMessage = "Please provide a peoplelivingcurrently";
  } else if (peoplelivingcurrentlyVal < 1) {
    errorMessage = "peoplelivingcurrently must be greater than zero";
  } else {
    errorMessage = null;
    postRoomForm.submit();
  }
  if (errorMessage == null) {
    return;
  } else {
    alert(errorMessage);
    return;
  }
}
