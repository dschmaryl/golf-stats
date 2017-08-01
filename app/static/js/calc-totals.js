function calcNineHoleTotal(nine, stat) {
  var nineHoleTotal = 0;
  if (nine == 'front') {
    for (var i = 1; i < 10; i++) {
      nineHoleTotal += getValue('hole' + i + '_' + stat);
    }
    var otherNineTotal = getInner('total_back_9_' + stat);
  } else {
    for (var i = 10; i < 19; i++) {
      nineHoleTotal += getValue('hole' + i + '_' + stat);
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
