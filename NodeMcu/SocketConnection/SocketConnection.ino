#include <Arduino.h>
#include "ESP8266WiFi.h"
#include <SocketIoClient.h>

/**
 * oficina:
 * TP-LINK_2CBAFE
 * 61017214
 */

// WiFi parameters to be configured
const char* ssid = "TP-LINK_2CBAFE";
const char* password = "61017214";
SocketIoClient webSocket;


void Apagar(const char *payload, size_t length)
{
  digitalWrite(2, HIGH);
  webSocket.emit("node", "\"node MCU ejecuta apagar\"");
  //Serial.printf("got message: %s\n", payload);
}

void Prender(const char *payload, size_t length)
{
  digitalWrite(2, LOW);
  webSocket.emit("node", "\"node MCU ejecuta prender\"");
}

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

  webSocket.on("prender", Prender);
  webSocket.on("apagar", Apagar);
  webSocket.begin("192.168.1.56", 3000);
  webSocket.setAuthorization("", "");
  // poner "\" al comienzo del string y \"" al final es super importantisimo para los emit, sino se ponen el mensaje no llega al servidor de socket.io
  webSocket.emit("node", "\"NodeMCU #1 se ha conectado\"");

  //El led de la board lolin se maneja con logica complementaria
  pinMode(2, OUTPUT);
  // se inicia con el led apagado
  digitalWrite(2, HIGH);
}
void loop() {
  webSocket.loop();
}
