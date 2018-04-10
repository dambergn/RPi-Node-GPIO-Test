'use strict';

const express = require('express');
const requestIp = require('request-ip');
const cors = require('cors');
const socket = require('socket.io');
const request = require('request');
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

let usedBy = '';

// Post request to run function and return page.
app.post('/led',(req, res) => {
  usedBy = requestIp.getClientIp(req);
  switchLed(); // exicutes the function to toggle LED state.
  // console.log(request.connection.remoteAddress);
  
  // console.log(requestIp.getClientIp(req));
  res.sendFile(__dirname + '/public/index.html'); // returns the previous page.
});
// using httpie  http POST 192.168.10.13:3000/led

// Heartbeat
// let hbServer = 'http://192.168.10.10:3002/heartbeat';
let hbServer = 'https://shiot-remote-server.herokuapp.com/heartbeat';
setInterval(function(){
  // console.log('heartbeat');
  // this will eventually be a configuration setting in the .env file.
  request.post(hbServer, () => {
  });
}, 1000 * 3);

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    usedBy = 'button';
    switchLed();
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
let isLedOn = false;
function switchLed() {
  isLedOn = !isLedOn;
  let state = 0;
  let message = 'off';

  if (isLedOn) {
    state = 1;
    message = 'on';
  };
  led.writeSync(state);
  console.log('Led turned ', message, '@', new Date(), 'by:', usedBy);

  io.emit('ledStatus', isLedOn);
};

const server = app.listen(PORT, () => {
  console.log('Listening on port:', PORT, 'use CTRL+C to close.');
});

const io = socket(server);

io.on('connection', function(socket){
  let clientIp = [];
  io.emit('ledStatus', isLedOn);
  clientIp.push(socket.request.connection.remoteAddress);
  console.log('made socket connection', socket.id, clientIp);

  socket.on('ledStatus', (isLedOn) => {
    io.sockets.emit('ledStatus', isLedOn);
  });
});
