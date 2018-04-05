'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

led.writeSync(0);

let isLedOn = false;

button.watch(function (err, value) {
  // console.log('Button pressed', value);
  if (err) {
    throw (err);
  };
  if (value === 0) {
    isLedOn = !isLedOn;
    turnOnLed();
    console.log('led if statement triggered', isLedOn);
  }
});

function turnOnLed() {
  if (isLedOn === true) {
    led.writeSync(1);
    // console.log(isLedOn);
  };
  if (isLedOn === false) {
    led.writeSync(0);
    // console.log(isLedOn);
  };
};