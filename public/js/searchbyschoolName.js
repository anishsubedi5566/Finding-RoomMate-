function validate_searchbyschoolName(e) {
  e.preventDefault();

  let schoolNameVal = document.getElementById("schoolName").value;
  let schoolName_searchForm = document.getElementById("schoolName_search");

  let errorMessage = null;

  if (schoolNameVal == "") {
    errorMessage = "Please select a schoolName";
  } else {
    errorMessage = null;
    schoolName_searchForm.submit();
  }
  if (errorMessage == null) {
    return;
  } else {
    alert(errorMessage);
    return;
  }
}
