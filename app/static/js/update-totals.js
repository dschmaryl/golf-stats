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
  }

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
  }
};
