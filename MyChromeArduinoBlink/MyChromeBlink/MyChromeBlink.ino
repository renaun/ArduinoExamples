/*
  MyChromeBlink
  Turns on an LED on for length you pass in seconds, 
  then off for one second, repeatedly.
 
  Copyright 2013 Renaun Erickson @renaun http://renaun.com
  Use under a MIT license
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
int led = 13;
int lightOnLength = 1;
int blinkCount = 0;

// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);  
  // initialize the digital pin as an output.
  pinMode(led, OUTPUT);     
}

// the loop routine runs over and over again forever:
void loop() {
  Serial.print(1);
  Serial.print("a"); // My Command Values
  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(lightOnLength * 1000);               // wait for a second
  Serial.print(0);
  Serial.print("a"); // My Command Values
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);               // wait for a second
  
  while (Serial.available() > 0) {
    lightOnLength = Serial.read();
      Serial.print(lightOnLength);
      Serial.print("b"); // My Command Values
    if (lightOnLength <= 0)
      lightOnLength = 1;
  }
  
  Serial.print(blinkCount++);
  Serial.print("c"); // My Command Values
}
