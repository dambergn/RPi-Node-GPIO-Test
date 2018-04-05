'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

button.watch(function (err, value) {
  console.log('Button pressed', value);
  led.writeSync(led.readSync(value) ^ 1); // 1 = on, 0 = off :)
});