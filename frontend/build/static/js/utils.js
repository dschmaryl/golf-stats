var asNumber = function(value) {
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
};

var getValue = function(id) {
  return asNumber(parseInt(document.getElementById(id).value));
};

var getSelected = function(elementId) {
  var element = document.getElementById(elementId);
  return element.options[element.selectedIndex].text;
};

var updateInner = function(id, value) {
  document.getElementById(id).innerHTML = value;
};

var createTotal = function(stat) {
  var frontNineTotal = 0;
  var backNineTotal = 0;

  var nineHoleTotal = function(startHole, stat) {
    return Array(9).fill().reduce((total, v, index) => {
      var holeNumber = index + startHole;
      return total + getValue('hole' + holeNumber + '_' + stat);
    }, 0);
  };

  var updateTotals = function() {
    updateInner('total-front-' + stat, frontNineTotal);
    updateInner('total-back-' + stat, backNineTotal);
    updateInner('total-' + stat, frontNineTotal + backNineTotal);
  };

  return {
    updateFront: function() {
      frontNineTotal = nineHoleTotal(1, stat);
      updateTotals();
    },
    updateBack: function() {
      backNineTotal = nineHoleTotal(10, stat);
      updateTotals();
    },
    update: function() {
      this.updateFront();
      this.updateBack();
    }
  };
};

var loadPars = function() {
  const tees = JSON.parse(document.getElementById("tees-json").innerHTML);

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
