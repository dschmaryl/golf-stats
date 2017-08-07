function calcNineHoleTotal(nine, stat) {
  var nineHoleTotal = 0;
  if (nine === 'front') {
    for (var hole = 1; hole < 10; hole++) {
      nineHoleTotal += getValue('hole' + hole + '_' + stat);
    }
    var otherNineTotal = getInner('total_back_9_' + stat);
  } else {
    for (var hole = 10; hole < 19; hole++) {
      nineHoleTotal += getValue('hole' + hole + '_' + stat);
    }
    var otherNineTotal = getInner('total_front_9_' + stat);
  }
  updateInner('total_' + nine + '_9_' + stat, nineHoleTotal);
  updateInner('total_' + stat, nineHoleTotal + otherNineTotal);
}

function calcAllTotals() {
  calcNineHoleTotal('front', 'strokes');
  calcNineHoleTotal('front', 'putts');
  calcNineHoleTotal('back', 'strokes');
  calcNineHoleTotal('back', 'putts');
}
