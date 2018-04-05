'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

button.watch(function (err, value) {
  led.writeSync(value);
});