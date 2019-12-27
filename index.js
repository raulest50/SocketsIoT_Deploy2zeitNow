
// para el web server express 
var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

// para guardar los id que asigna socket.io a cada nodo lolin
var usuarios_lolin = {"nodo1":"", "nodo2":"", "nodo3":""};

// para guardar el estado de las salidas logicas de cada nodo
var estados_lolin = {nodo1:{name:"nodo1",out:3},nodo2:{name:"nodo2",out:3},nodo3:{name:"nodo3",out:3}} //{"nodo1":NaN, "nodo2":NaN, "nodo3":NaN};




// se sirve el index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// expone todo el contenido de la carpeta public
app.use(express.static('public'));


//Whenever someone connects this gets executed
io.on('connection', function(socket) {

  socket.emit('identificarse', "x");
  console.log('A user connected ' + socket.id);

  // enviar evento a un lolin para que se identifique
  socket.on('identificacion', function(msg){
    console.log(msg);
    identificar(socket.id, msg);
  });

  // verificar cual es la salida logica actual de cada nodo
  socket.on('browser_estados_nodos_pedir', function(msg){
    io.sockets.emit('pedir_estado_broadcast', 'x');
  });

  socket.on('notificar_estado_lolin', function(msg){
    let info = msg.split(":"); // esplit para separar el nombre del nodo y su estado logico
    estados_lolin[info[0]].out = Number(info[1]); // se actualiza el repectivo nodo en estados_lolin
    let str_json_estados = JSON.stringify(estados_lolin); // convierte la informacion de los estados a string
    io.sockets.emit('estados_nodos_recibir', str_json_estados);//emision broadcast de los estados actualizados
  });

  // enviar el evento a un lolin para apagar pin
  socket.on('browserApagar', function(nombre){
    socket.broadcast.to(usuarios_lolin[nombre]).emit('apagar', 'x');
  });

  // enviar el evento a un lolin para prender pin
  socket.on('browserPrender', function(nombre){    
    socket.broadcast.to(usuarios_lolin[nombre]).emit('prender', 'x');
  });

  // notificar que un lolin se desconecto
  socket.on('disconnect', function () {
    //remover(socket.id);
    //console.log('El id :' + id + "se desconecto");
  });
});


// se activa express server
http.listen(port, function(){
  console.log('listening at port' + port + ' :)');
});

// se asocia el nombre recibido con el id asignado por socket.io
function identificar(id, nombre){
  usuarios_lolin[nombre] = id;
}

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