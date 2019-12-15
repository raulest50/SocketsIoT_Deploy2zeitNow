

var B_on = document.querySelector('#B_on');

var B_off = document.querySelector('#B_off');

var socket = io();

B_on.onclick = function(){
    console.log('On');
    socket.emit('prender', "x");
}

B_off.onclick = function(){
    console.log('Off');
    socket.emit('apagar', "x");
}