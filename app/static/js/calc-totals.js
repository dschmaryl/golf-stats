function asNumber(value) {
  if (!isNaN(value)) {
    return value;
  } else {
    return 0;
  }
}

function getValue(id) {
  return asNumber(parseInt(document.getElementById(id).value));
}

function getInner(id) {
   return asNumber(parseInt(document.getElementById(id).innerHTML));
}

function updateValue(id, value) {
  document.getElementById(id).innerHTML = value;
}

function calcNineHoleTotal(nine, stat) {
  var nineHoleTotal = 0;
  if (nine == 'front') {
    for (i = 1; i < 10; i++) {
      nineHoleTotal += getValue('hole' + i + '_' + stat);
    }
    var otherNineTotal = getInner('total_back_9_' + stat);
  } else {
    for (i = 10; i < 19; i++) {
      nineHoleTotal += getValue('hole' + i + '_' + stat);
    }
    var otherNineTotal = getInner('total_front_9_' + stat);
  }
  updateValue('total_' + nine + '_9_' + stat, nineHoleTotal);
  updateValue('total_' + stat, nineHoleTotal + otherNineTotal);
}

function calcAllTotals() {
  calcNineHoleTotal('front', 'strokes');
  calcNineHoleTotal('front', 'putts');
  calcNineHoleTotal('back', 'strokes');
  calcNineHoleTotal('back', 'putts');
}
