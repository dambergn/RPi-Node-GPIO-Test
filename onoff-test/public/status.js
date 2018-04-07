'use strict';

//Make connection
const socket = io.connect('http://192.168.10.13:3000');

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
  if (data === true) {
    led = 'on';
  }
  if (data === false) {
    led = 'off';
  }
  ledStatus.innerHTML = '<p><strong>LED is currently ' + led + '</strong></p>';
});