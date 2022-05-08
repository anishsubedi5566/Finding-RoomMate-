function triggerSubmit(e) {
  e.preventDefault();

  let firstNameVal = document.getElementById("firstName").value;
  console.log(firstNameVal);
  let lastNameVal = document.getElementById("lastName").value;
  let emailVal = document.getElementById("email").value;
  let schoolNameVal = document.getElementById("schoolName").value;
  let cityVal = document.getElementById("city").value;
  let stateVal = document.getElementById("state").value;
  let homeCountryVal = document.getElementById("homeCountry").value;
  let ageVal = Number(document.getElementById("age").value);
  let genderVal = document.getElementById("gender").value;
  let imageVal = document.getElementById("inputGroupFile02").value;
  var message = document.getElementById("edit_text");
  console.log(imageVal);
  // let editProfileForm = document.getElementById("edit-form");

  let errorMessage = null;

  if (
    !firstNameVal ||
    firstNameVal.trim().length == "" ||
    firstNameVal == null ||
    firstNameVal == undefined
  ) {
    errorMessage = "Please provide a first name";
  } else if (firstNameVal.length < 2) {
    errorMessage = "First name must be of 2 or more than 2 characters";
  } else if (
    !lastNameVal ||
    lastNameVal.trim().length == "" ||
    lastNameVal == null ||
    lastNameVal == undefined
  ) {
    errorMessage = "Please provide a last name";
  } else if (lastNameVal.length < 2) {
    errorMessage = "Last name must be of 2 or more than 2 characters";
  } else if (!emailVal || emailVal == null || emailVal == undefined) {
    errorMessage = "Please provide your email";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)) {
    errorMessage = "Provided email is invalid";
  } else if (!ageVal || ageVal == null || ageVal == undefined) {
    errorMessage = "Please provide a age";
  } else if (ageVal < 15 || ageVal > 100) {
    errorMessage = "Age must be greater than 15 or less than 100";
  } else {
    errorMessage = null;
  }

  

  // window.location = "/private";

  if (errorMessage == null) {
    var saveData = $.ajax({
      type: "POST",
      url: "/private/profile/edit",
      data: {
        firstName: firstNameVal,
        lastName: lastNameVal,
        email: emailVal,
        schoolName: schoolNameVal,
        city: cityVal,
        state: stateVal,
        homeCountry: homeCountryVal,
        age: ageVal,
        gender: genderVal,
        userProfileImage: imageVal,
      },
      success: function (resultData) {
        message.innerHTML = "Profile Edited Successfully";
      },
    });
  } else {
    console.log(errorMessage);
    message.innerHTML = `ERROR:${errorMessage}`;
  }
}
