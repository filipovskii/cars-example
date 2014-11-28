'use strict';

var t = require('transducers-js'),
    _ = require('lodash'),
    util = require('util'),
    Immutable = require('immutable'),
    cars = Immutable.fromJS(require('./cars.json')),
    map = t.map,
    filter = t.filter,
    comp = t.comp,
    transduce = t.transduce,
    into = t.into;

var transformCars,
    transformProp,
    listBuilder,
    propertyIn,
    result;

var f = {
  carName: ['Volvo'],
  pieceName: ['engine']
};

propertyIn = function(name, val) {
  return function(obj) {
    return _.contains(val, obj.get(name));
  };
};


listBuilder = function(list, val) {
  return list.push(val);
};

transformProp = function(prop, xf) {
  return map(function(obj) {
    var init = Immutable.List();
    var res = transduce(xf, listBuilder, init, obj.get(prop));
    return obj.set(prop, res);
  });
};


transformCars = comp(
  filter(propertyIn('name', f.carName)),
  transformProp(
    'pieces',
    filter(propertyIn('name', f.pieceName))
  )
);

result = transduce(transformCars, listBuilder, Immutable.List(), cars);
console.log(util.inspect(result, {showHidden: false, depth: null}));
