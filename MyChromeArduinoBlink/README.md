# Arduino Blink Chrome App

This app displays a slider that, when dragged, causes the length of the light to be on (pin 13 on Arduino board). The Arduino sketch is included and should be uploaded to the Arduino.

The Arduino sketch also sends back the blink count. This way you can figure out how to send commands and receive data from a Chrome App to the Arduino using the serial ports.

To mimic what the Arduino is doing on pin 13 the chrome log turns on and off just like it would on the Arduino pin 13.

## APIs

* [Serial API](http://developer.chrome.com/trunk/apps/app.hardware.html#serial)
