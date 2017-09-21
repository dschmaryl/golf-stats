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

var getInner = function(id) {
   return asNumber(parseInt(document.getElementById(id).innerHTML));
};

var getSelected = function(elementId) {
  var element = document.getElementById(elementId);
  return element.options[element.selectedIndex].text;
};

var getJson = function(elementId) {
  return JSON.parse(document.getElementById(elementId).innerHTML);
};

var updateInner = function(id, value) {
  document.getElementById(id).innerHTML = value;
};
