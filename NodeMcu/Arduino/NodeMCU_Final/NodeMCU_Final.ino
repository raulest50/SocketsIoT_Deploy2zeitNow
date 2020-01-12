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

//******************************
//
// poner "\" al comienzo del string y \"" al final es super importantisimo para los emit, sino se ponen el mensaje no llega al servidor de socket.io
//
//******************************

void Identificarse(const char *payload, size_t length){
  webSocket.emit("identificacion", "\"nodo1\"");
}


void Apagar(const char *payload, size_t length)
{
  digitalWrite(2, HIGH);
  digitalWrite(16, LOW);
  webSocket.emit("notificar_estado_lolin", "\"nodo1:0\"");
}

void Prender(const char *payload, size_t length)
{
  digitalWrite(2, LOW);
  digitalWrite(16, HIGH);
  webSocket.emit("notificar_estado_lolin", "\"nodo1:1\"");
}

void Informar_Estado(const char *payload, size_t length)
{
  if(digitalRead(2)==1){
    webSocket.emit("notificar_estado_lolin", "\"nodo1:0\""); 
  } else{
    webSocket.emit("notificar_estado_lolin", "\"nodo1:1\"");
  }
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
  webSocket.on("identificarse", Identificarse);
  webSocket.on("pedir_estado_broadcast", Informar_Estado);
  webSocket.begin("192.168.1.56", 3000);
  

  //El led de la board lolin se maneja con logica complementaria
  pinMode(2, OUTPUT);
  // se inicia con el led apagado
  digitalWrite(2, HIGH);

  pinMode(16, OUTPUT);
  digitalWrite(16, LOW);
}
void loop() {
  webSocket.loop();
}
