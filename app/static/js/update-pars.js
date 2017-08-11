var writePars = function() {
  var tees = getJson("tees_json");

  return function() {
    var selectedCourse = getSelected("course"),
        selectedTeeColor = getSelected("tee_color");
    tees[selectedCourse][selectedTeeColor].forEach( function(par, i) {
      updateInner("hole" + (i + 1) + "_par", par);
    })
  };
};
