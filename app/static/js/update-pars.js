var loadPars = () => {
  var tees = getJson("tees-json");

  return {
    update: function() {
      var selectedCourse = getSelected("course");
      var selectedTeeColor = getSelected("tee-color");

      tees[selectedCourse][selectedTeeColor].forEach((par, i) => {
        updateInner("hole" + (i + 1) + "_par", par);
      })
    }
  };
};
