function validatecity_searchInputs(e) {
  e.preventDefault();

  let cityVal = document.getElementById("city").value;
  let city_searchForm = document.getElementById("city_search");

  let errorMessage = null;

  if (cityVal == "") {
    errorMessage = "Please select a city";
  } else {
    errorMessage = null;
    city_searchForm.submit();
  }
  if (errorMessage == null) {
    return;
  } else {
    alert(errorMessage);
    return;
  }
}
