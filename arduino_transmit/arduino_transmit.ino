
/*-----( Import needed libraries )-----*/
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

/*-----( Declare Constants and Pin Numbers for radio module )-----*/
#define CE_PIN   9
#define CSN_PIN 10
const uint64_t pipe = 0xE8E8F0F0E1LL; // Define the transmit pipe


/*------( Deckare pins for ultrasonic sensor ) -----*/
#define echoPin 4 // Echo Pin
#define trigPin 5 // Trigger Pin
int maximumRange = 200; // Maximum range needed
int minimumRange = 0; // Minimum range needed
long duration, distance, percentage; // Duration used to calculate distance



RF24 radio(CE_PIN, CSN_PIN); // Create a instance fo a radio object

void setup()  
{
  pinMode(echoPin, INPUT); 
  pinMode(trigPin, OUTPUT);
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(pipe);

 
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  //Calculate the distance (in cm) based on the speed of sound.
  distance = duration/58.2;
  Serial.println(distance);
  if (distance < 33) { 
    char data[] = "";
    char sentinel[] = "/"; 
    sprintf(data, "%02d", distance); 
    radio.write(&sentinel, sizeof(sentinel)); 
    radio.write(&data[0], sizeof(data[0])); 
    radio.write(&data[1], sizeof(data[1])); 
     
  }   
  else {
    Serial.println("There is no water detected");
  }
  
  delay(500);
}


 
