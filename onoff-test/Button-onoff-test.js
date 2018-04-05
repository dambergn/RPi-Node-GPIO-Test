'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');
let onOff = 0;

button.watch(function (err, value) {
  console.log('Button Pressed');
  if(onOff = 0) {
    onOff = 1;
  } else {
    onOff = 0;
  }

  if(onOff = 1) {
    led.writeSync(value);
  }
});