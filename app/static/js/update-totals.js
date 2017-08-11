var getNineHoleTotal = function(start, stop, stat) {
  var nineHoleTotal = 0;
  for (var hole = start; hole < stop; hole++) {
    nineHoleTotal += getValue('hole' + hole + '_' + stat);
  }
  return nineHoleTotal;
};

var createTotal = function(stat) {
  var frontNineTotal = 0,
      backNineTotal = 0;

  var updateTotals = function(nine, nineHoleTotal) {
    updateInner('total-' + nine + '-' + stat, nineHoleTotal);
    updateInner('total-' + stat, frontNineTotal + backNineTotal);
  }

  return {
    updateFront: function() {
      frontNineTotal = getNineHoleTotal(1, 10, stat);
      updateTotals('front', frontNineTotal);
    },
    updateBack: function() {
      backNineTotal = getNineHoleTotal(10, 19, stat);
      updateTotals('back', backNineTotal);
    },
    update: function() {
      this.updateFront();
      this.updateBack();
    }
  }
};
