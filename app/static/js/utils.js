function asNumber(value) {
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
}

function getValue(id) {
  return asNumber(parseInt(document.getElementById(id).value));
}

function getInner(id) {
   return asNumber(parseInt(document.getElementById(id).innerHTML));
}

function getSelected(elementId) {
  var element = document.getElementById(elementId);
  return element.options[element.selectedIndex].text;
}

function updateInner(id, value) {
  document.getElementById(id).innerHTML = value;
}