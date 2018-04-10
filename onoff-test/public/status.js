'use strict';

//Make connection
const socket = io.connect(window.location.href);
// const socket = io.connect('http://192.168.10.13:3000');
// const socket = io.connect('http://172.16.17.48:3000/');
// const socket = io.connect('http://192.168.2.61:3000');
// const socket = io.connect('https://shiot-remote-server.herokuapp.com/');

// Query DOM
let form = document.getElementById('controls');
let ledStatus = document.getElementById('ledStatus');

// prevents page from refreshing and getting new socket id
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: 'POST'
  });
});

// Listen for events
socket.on('ledStatus', (data) => {
  let led = '';
  if (data) {
    led = 'on';
  } else {
    led = 'off';
  }
  
  ledStatus.innerHTML = '<p><strong>LED is currently ' + led + '</strong></p>';
});