function validatepostRoom(e) {
  e.preventDefault();

  let titleVal = document.getElementById("title").value;
  let cityVal = document.getElementById("city").value;
  let stateVal = document.getElementById("state").value;
  let schoolNameVal = document.getElementById("schoolName").value;
  let budgetVal = Number(document.getElementById("budget").value);

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

  // budget error check
  else if (!budgetVal || budgetVal == null || budgetVal == undefined) {
    errorMessage = "Please provide a budget";
  } else if (budgetVal < 100) {
    errorMessage = "budget must be greater eqaul to 100";
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
