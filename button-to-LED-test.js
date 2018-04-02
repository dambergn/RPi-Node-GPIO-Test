'use strict';

const rpio = require('rpio');

rpio.open(11, rpio.INPUT, rpio.PULL_DOWN);
rpio.open(12, rpio.OUTPUT, rpio.LOW);

function pollcb(pin) {
  /*
   * Interrupts aren't supported by the underlying hardware, so events
   * may be missed during the 1ms poll window.  The best we can do is to
   * print the current state after a event is detected.
   */
  let state = rpio.read(pin) ? 'pressed' : 'released';
  console.log('Button event on P%d (button currently %s)', pin, state);
  console.log('state test:' + state);

  // if (state == 'pressed') {
  //   for (let i = 0; i < 5; i++) {
  //     console.log('LED on pin 12');
  //     // on for 1 second
  //     rpio.write(12, rpio.HIGH);
  //     rpio.sleep(1);

  //     // Off for half a second (500ms)
  //     rpio.write(12, rpio.LOW);
  //     rpio.msleep(500);
  //   };
  // };
};

rpio.poll(11, pollcb);