'use strict';

const express = require('express');
const requestIp = require('request-ip');
const cors = require('cors');
const socket = require('socket.io');
const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(requestIp.mw());

// static files
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Post request to run function and return page.
app.post('/led',(req, res) => {
  switchLed(); // exicutes the function to toggle LED state.
  res.sendFile(__dirname + '/public/index.html'); // returns the previous page.
});
// using httpie  http POST 192.168.10.13:3000/led

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    switchLed();
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
let isLedOn = false;
function switchLed() {
  isLedOn = !isLedOn;
  if (isLedOn === true) {
    led.writeSync(1);
    console.log('Led turned on', new Date());
  };
  if (isLedOn === false) {
    led.writeSync(0);
    console.log('Led turned off', new Date());
  };
};

// document.getElementById("ledStatus");
// if (isLedOn === true) {
//   document.write('LED is currently On');
// };
// if (isLedOn === false) {
//   document.write('LED is currently Off');
// };

const server = app.listen(PORT, () => {
  console.log('Listening on port:', PORT, 'use CTRL+C to close.');
});

const io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  socket.on('ledStatus', (isLedOn) => {
    io.sockets.emit('ledStatus', isLedOn);
  });
});
