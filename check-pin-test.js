'use strict';

const rpio = require('rpio');

// Test to check status of pin11 || GPIO17
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));

