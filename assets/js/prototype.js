Array.prototype.sum = function (prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += this[i][prop]
  }
  return total
};

Array.prototype.max = function (prop) {
  var maximum = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      if (this[i][prop] > maximum) maximum = this[i][prop];
  }
  return maximum
};

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};
