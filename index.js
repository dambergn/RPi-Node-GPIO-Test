'use strict';

const rpio = require('rpio');

// Test to check status of pin11 || GPIO17
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));

//Blinking LED 5x test, set to pin12 || GPIO18
rpio.open(12, rpio.OUTPUT, rpio.LOW);

for (let i = 0; i < 5; i++) {
    console.log('LED on pin 12');
    // on for 1 second
    rpio.write(12, rpio.HIGH);
    rpio.sleep(1);

    // Off for half a second (500ms)
    rpio.write(12, rpio.LOW);
    rpio.msleep(500);
};

// If button pressed on pin 11 then light LED on pin 40
rpio.open(40, rpio.OUTPUT, rpio.LOW);
rpio.open(11, rpio.INPUT);

if (rpio(11) == 'high') {
    console.log('button presed');
    rpio.write(40, rpio.HIGH);
} else {
    rpio.write(40, rpio.LOW);
};