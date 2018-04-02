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