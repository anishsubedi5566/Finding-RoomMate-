function validateSignUpInputs(e) {
  e.preventDefault();
  let usernameVal = document.getElementById("username").value;
  let passwordVal = document.getElementById("password").value;
  let securityQuesVal = document.getElementById("securityQues").value;
  let securityAnsVal = document.getElementById("securityAns").value;
  let firstNameVal = document.getElementById("firstName").value;
  let lastNameVal = document.getElementById("lastName").value;
  let emailVal = document.getElementById("email").value;
  let schoolNameVal = document.getElementById("schoolName").value;
  let cityVal = document.getElementById("city").value;
  let stateVal = document.getElementById("state").value;
  let homeCountryVal = document.getElementById("homeCountry").value;
  let ageVal = Number(document.getElementById("age").value);
  let genderVal = document.getElementById("gender").value;
  const signupForm = document.getElementById("signup-form");

  let errorMessage = null;

  if (
    !usernameVal ||
    usernameVal == null ||
    usernameVal == undefined ||
    usernameVal.trim().length === ""
  ) {
    errorMessage = "Please provide a valid username";
  } else if (usernameVal.length < 4) {
    errorMessage = "Username must be more than 3 characters";
  } else if (
    !passwordVal ||
    passwordVal == null ||
    passwordVal == undefined ||
    passwordVal.trim().length == ""
  ) {
    errorMessage = "Please provide a valid password";
  } else if (passwordVal.length < 6) {
    errorMessage = "Password must be more than 5 characters";
  } else if (securityQuesVal == "") {
    errorMessage = "Please select the security question";
  } else if (
    !securityAnsVal ||
    securityAnsVal.trim().length == "" ||
    securityAnsVal == null ||
    securityAnsVal == undefined
  ) {
    errorMessage = "Please provide a Answer to the security question";
  } else if (
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
  } else if (schoolNameVal == "") {
    errorMessage = "Please select your school";
  } else if (cityVal == "") {
    errorMessage = "Please select a city where you want to live";
  } else if (stateVal == "") {
    errorMessage = "Please select a state where you want to live";
  } else if (!ageVal || ageVal == null || ageVal == undefined) {
    errorMessage = "Please provide a age";
  } else if (ageVal < 15 || ageVal > 100) {
    errorMessage = "Age must be greater than 15 or less than 100";
  } else if (genderVal == "") {
    errorMessage = "Please identify your gender";
  } else {
    errorMessage = null;
    signupForm.submit();
  }
  if (errorMessage == null) {
    return;
  } else {
    alert(errorMessage);
    return;
  }
}

// if (signupForm) {
//   signupForm.addEventListener("submit", (e) => {});
// }
