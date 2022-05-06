function firecontactUs(e) {
  e.preventDefault();

  let yournameVal = document.getElementById("yourname").value;
  let emailVal = document.getElementById("email").value;
  let message_queryVal = document.getElementById("message_query").value;
  var message = document.getElementById("output_text");

  let errorMessage = null;

  if (
    !yournameVal ||
    yournameVal.trim().length == "" ||
    yournameVal == null ||
    yournameVal == undefined
  ) {
    errorMessage = "Please enter name";
  } else if (yournameVal.length < 4) {
    errorMessage = "Name must be more than 3 characters";
  } else if (!emailVal || emailVal == null || emailVal == undefined) {
    errorMessage = "Please provide your email";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)) {
    errorMessage = "Provided email is invalid";
  } else if (
    !message_queryVal ||
    message_queryVal.trim().length == "" ||
    message_queryVal == null ||
    message_queryVal == undefined
  ) {
    errorMessage = "Please Enter Message";
  } else {
    errorMessage = null;
  }

  if (errorMessage == null) {
    var saveData = $.ajax({
      type: "POST",
      url: "/private/contactUs",
      data: {
        yourname: yournameVal,
        email: emailVal,
        message_query: message_queryVal,
      },
      success: function (resultData) {
        console.log("success");
        message.innerHTML = "We received your message successfully";
        // yournameVal.innerHTML = "";
        // emailVal.innerHTML = "";
        // message_queryVal.innerHTML = "";
      },
    });
  } else {
    console.log(errorMessage);
    message.innerHTML = `ERROR:${errorMessage}`;
  }
}
