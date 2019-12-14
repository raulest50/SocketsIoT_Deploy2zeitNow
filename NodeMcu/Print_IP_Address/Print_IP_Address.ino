#include "ESP8266WiFi.h"

/**
 * oficina:
 * TP-LINK_2CBAFE
 * 61017214
 */

// WiFi parameters to be configured
const char* ssid = "TP-LINK_2CBAFE";
const char* password = "61017214";

void setup(void)
{ 
  Serial.begin(9600);
  // Connect to WiFi
  WiFi.begin(ssid, password);

  // while wifi not connected yet, print '.'
  // then after it connected, get out of the loop
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  //print a new line, then print WiFi connected and the IP address
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());

}
void loop() {
  // Nothing
}
