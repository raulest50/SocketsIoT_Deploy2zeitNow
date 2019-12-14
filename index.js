
// para el web server express 
//var express = require('express');
//var app = express();

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



// se sirve el index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});


// se activa express server
http.listen(3000, function(){
  console.log('listening at port 3000 :)');
});

// link para instalar board support para nodeMCU v3
//http://arduino.esp8266.com/stable/package_esp8266com_index.json
