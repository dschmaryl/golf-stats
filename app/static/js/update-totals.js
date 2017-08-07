var getNineHoleTotal = function(start, stop, stat) {
  var nineHoleTotal = 0;
  for (var hole = start; hole < stop; hole++) {
    nineHoleTotal += getValue('hole' + hole + '_' + stat);
  }
  return nineHoleTotal;
};

var updateNineHoleTotal = function(nine, stat) {
  if (nine === 'front') {
    var nineHoleTotal = getNineHoleTotal(1, 10, stat),
        otherNineTotal = getInner('total_back_' + stat);
  } else {
    var nineHoleTotal = getNineHoleTotal(10, 19, stat),
        otherNineTotal = getInner('total_front_' + stat);
  }
  updateInner('total_' + nine + '_' + stat, nineHoleTotal);
  updateInner('total_' + stat, nineHoleTotal + otherNineTotal);
};

var updateTotals = function(stat) {
  updateNineHoleTotal('front', stat);
  updateNineHoleTotal('back', stat);
};
