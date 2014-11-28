'use strict';

var _ = require('lodash');
var cars = require('./cars.json');
var util = require('util');
var filter, filterFn, result, propertyIn;

filter = {
  carName: ['Volvo'],
  pieceName: ['engine']
};

propertyIn = function(name, val) {
  return function(obj) {
    return _.contains(val, obj[name]);
  }
};

result = _.filter(cars, propertyIn('name', filter.carName));
result = _.map(result, function(car) {
  var pieces = _.filter(car.pieces, propertyIn('name', filter.pieceName));
  return _.assign(car, {pieces: pieces});
})


console.log(util.inspect(result, {showHidden: false, depth: null}));
