'use strict';

const rpio = require('rpio');

// Test to check status of pin11 || GPIO17
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));

// If button pressed on pin 11 then light LED on pin 40
rpio.open(13, rpio.OUTPUT, rpio.LOW);

if (rpio.read(11) === high) {
  console.log('button is presed');
  rpio.write(13, rpio.HIGH);
} else {
  rpio.write(13, rpio.LOW);
};