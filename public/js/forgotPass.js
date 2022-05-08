function validateForgotPassInputs(e) {
  e.preventDefault();

  let usernameVal = document.getElementById("username").value;
  let securityQuesVal = document.getElementById("securityQues").value;
  let securityAnsVal = document.getElementById("securityAns").value;
  let passwordVal = document.getElementById("password").value;
  let forgotPassForm = document.getElementById("forgot-form").value;

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
  } else if (securityQuesVal == "") {
    errorMessage = "Please select a security question";
  } else if (
    !securityAnsVal ||
    securityAnsVal.trim().length == "" ||
    securityAnsVal == null ||
    securityAnsVal == undefined
  ) {
    errorMessage = "Please provide a Answer to the security question";
  } else if (
    !passwordVal ||
    passwordVal == null ||
    passwordVal == undefined ||
    passwordVal.trim().length == ""
  ) {
    errorMessage = "Please provide a valid password";
  } else if (passwordVal.length < 6) {
    errorMessage = "Password must be more than 5 characters";
  } else {
    errorMessage = null;
    forgotPassForm.submit();
  }
  if (errorMessage == null) {
    return;
  } else {
    alert(errorMessage);
    return;
  }
}
