var updatePars = function() {
  var courseName = getSelected("course"),
      teeColor = getSelected("tee_color");

  for (var hole = 1; hole < 19; hole++) {
    var par = getInner(courseName + "_" + teeColor + "_" + hole);
    updateInner("hole" + hole + "_par", par);
  }
};
