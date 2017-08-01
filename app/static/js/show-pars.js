function putPars(pars) {
  for (var i = 1; i < 19; i++) {
    var id = "hole" + i + "_par";
    var value = pars[i - 1];
    updateInner(id, value);
  }
}

function getPars() {
  var courseElement = document.getElementById("course");
  var courseName = courseElement.options[courseElement.selectedIndex].text;
  var teeElement = document.getElementById("tee_color");
  var teeColor = teeElement.options[teeElement.selectedIndex].text;

  var pars = [];
  for (var i = 1; i < 19; i++) {
    var id = courseName + "_" + teeColor + "_" + i;
    pars.push(getInner(id));
  }
  return pars;
}

function updatePars() {
  putPars(getPars());
}
