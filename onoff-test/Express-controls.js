'use strict';

const express = require('express');
const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/led',(req, res) => {
  turnOnLed();
  res.sendFile(__dirname + '/index.html');
});

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    turnOnLed();
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
let isLedOn = false;
function turnOnLed() {
  isLedOn = !isLedOn;
  if (isLedOn === true) {
    led.writeSync(1);
    console.log('Led turned on');
  };
  if (isLedOn === false) {
    led.writeSync(0);
    console.log('Led turned off');
  };
};

app.listen(PORT, () => {
  console.log('Listening on port:', PORT, 'use CTRL+C to close.');
});