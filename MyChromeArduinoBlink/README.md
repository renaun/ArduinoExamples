# Arduino Blink Chrome App

This app displays a slider that, when dragged, causes the length of the light to be on (pin 13 on Arduino board). The Arduino sketch is included and should be uploaded to the Arduino.

The Arduino sketch also sends back the blink count. This way you can figure out how to send commands and receive data from a Chrome App to the Arduino using the serial ports.

To mimic what the Arduino is doing on pin 13 the chrome log turns on and off just like it would on the Arduino pin 13.

The port filters out Bluetooth and only looks for /dev/tty strings, this worked on Mac OS X and Chrome 27 but not sure if its the same on Windows.

## Install Chrome App

Go to Chrome's Tools -> Extensions then click "Load unpacked extension...". Then click on Launch to get it working.

## APIs

* [Serial API](http://developer.chrome.com/trunk/apps/app.hardware.html#serial)
