# RPi-Node-GPIO-Test
RPi-Node-GPIO-Test

#Raspian download and install
Website:
https://www.raspberrypi.org/downloads/raspbian/
I reccomend using the torrent, it is much faster by a few HOURS!

Use Etcher to format and write image to the SD card.
Availabe for Windows, Mac, And Linux.
Website:
https://etcher.io/

# Install mongodb
note: Since raspian is still only a 32bit operating system mongodb is limited to version 2.4
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install mongodb-server
```

# NPM Packages used
Website:
https://www.npmjs.com/package/rpio
rpio

# RPi GPIO pinout
![alt text](./rp2_pinout.png)

# Blinking LED test
```javascript
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
```