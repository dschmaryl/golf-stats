var pars = function() {
  var tees = getJson("tees-json");

  return function() {
    var selectedCourse = getSelected("course"),
        selectedTeeColor = getSelected("tee-color");
    tees[selectedCourse][selectedTeeColor].forEach( function(par, i) {
      updateInner("hole" + (i + 1) + "_par", par);
    })
  };
};
