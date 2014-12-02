'use strict';

var cars = require('./cars.json');
var util = require('util');
var filter, result, propertyIn;

filter = {
  carName: ['Volvo'],
  pieceName: ['engine']
};

propertyIn = function(name, val) {
  return function(obj) {
    return val.some( function(el) {
    	return el === obj[name];
    });
  }
};

result = cars
	.filter( propertyIn('name', filter.carName) )
	.map( function(car) {

    return Object.keys(car).reduce( function(obj, key) {
      if( key !== 'pieces' ) obj[key] = car[key];
      return obj;
    }, { pieces: car.pieces.filter( propertyIn('name', filter.pieceName) ) } );

	});

console.log(util.inspect(result, {showHidden: false, depth: null}));
