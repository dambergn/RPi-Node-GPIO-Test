'use strict';

const rpio = require('rpio');

rpio.open(13, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin) {
  /*
   * Interrupts aren't supported by the underlying hardware, so events
   * may be missed during the 1ms poll window.  The best we can do is to
   * print the current state after a event is detected.
   */
  let state = rpio.read(pin) ? 'pressed' : 'released';
  console.log('Button event on P%d (button currently %s)', pin, state);
}

rpio.poll(13, pollcb);