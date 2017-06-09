function updateInner(id, value) {
  document.getElementById(id).innerHTML = value;
}

function updatePars() {
  var courseElement = document.getElementById("course");
  var courseName = courseElement.options[courseElement.selectedIndex].text;
  var teeElement = document.getElementById("tee_color");
  var teeColor = teeElement.options[teeColor.selectedIndex].text;

}
