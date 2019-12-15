
// para el web server express 
var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);



// se sirve el index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// expone todo el contenido de la carpeta public
app.use(express.static('public'));


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected' + socket.handshake);

  socket.on('browserApagar', function(msg){
    io.sockets.emit('apagar', 'x');
    console.log('navegador envia apagar');
  });

  socket.on('browserPrender', function(msg){
    io.sockets.emit('prender', 'x');
    console.log('navegador evia prender');
  });

  socket.on('node', function(msg){
    console.log("evento node");
    console.log(msg);
  });

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

// porting de hobysta Arduino ESP8266 - socket.io client
// https://github.com/timum-viw/socket.io-client
// https://github.com/borbier/nodemcu-with-socket.io




// socket io repo   https://github.com/socketio/socket.io


/*
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
*/