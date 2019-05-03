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

function getSelected(elementId) {
  const element = document.getElementById(elementId);
  return element.options[element.selectedIndex].text;
}

function updateInner(id, value) {
  document.getElementById(id).innerHTML = value;
}

function createTotal(stat) {
  let frontNineTotal = 0;
  let backNineTotal = 0;

  function nineHoleTotal(startHole, stat) {
    return Array(9)
      .fill()
      .reduce((total, v, index) => {
        const holeNumber = index + startHole;
        return total + getValue('hole' + holeNumber + '_' + stat);
      }, 0);
  }

  function updateTotals() {
    updateInner('total-front-' + stat, frontNineTotal);
    updateInner('total-back-' + stat, backNineTotal);
    updateInner('total-' + stat, frontNineTotal + backNineTotal);
  }

  return {
    updateFront() {
      frontNineTotal = nineHoleTotal(1, stat);
      updateTotals();
    },
    updateBack() {
      backNineTotal = nineHoleTotal(10, stat);
      updateTotals();
    },
    update() {
      this.updateFront();
      this.updateBack();
    }
  };
}

function loadPars() {
  const tees = JSON.parse(document.getElementById('tees-json').innerHTML);

  return {
    update() {
      const selectedCourse = getSelected('course');
      const selectedTeeColor = getSelected('tee-color');

      tees[selectedCourse][selectedTeeColor].forEach((par, i) => {
        updateInner('hole' + (i + 1) + '_par', par);
      });
    }
  };
}
