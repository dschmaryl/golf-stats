function calcNineHoleTotal(nine, stat) {
  var nineHoleTotal = 0;
  if (nine === 'front') {
    for (var hole = 1; hole < 10; hole++) {
      nineHoleTotal += getValue('hole' + hole + '_' + stat);
    }
    var otherNineTotal = getInner('total_back_' + stat);
  } else {
    for (var hole = 10; hole < 19; hole++) {
      nineHoleTotal += getValue('hole' + hole + '_' + stat);
    }
    var otherNineTotal = getInner('total_front_' + stat);
  }
  updateInner('total_' + nine + '_' + stat, nineHoleTotal);
  updateInner('total_' + stat, nineHoleTotal + otherNineTotal);
}

function calcAllTotals() {
  calcNineHoleTotal('front', 'strokes');
  calcNineHoleTotal('front', 'putts');
  calcNineHoleTotal('back', 'strokes');
  calcNineHoleTotal('back', 'putts');
}
