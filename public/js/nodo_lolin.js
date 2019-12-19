

Vue.component('nodo-lolin', {
    props: ['nodo', 'lugar'],
    template: `
    <div class="container shadow bg-white rounded mb-4">
        <div class="row">
            <div class="alert alert-primary col-12 text-center" role="alert">
                {{nodo}} - {{lugar}}
            </div>    
        </div>
        <div class="row">
            <i class="fas fa-lightbulb fa-7x col-12 text-center p-3 text-muted"></i>
        </div>
        <div class="row">
            <button v-on:click="Emit_Apagar(nodo)" type="button" class="btn btn-outline-primary btn-lg col-6">Apagar</button>
            <button v-on:click="Emit_Prender(nodo)" type="button" class="btn btn-outline-warning btn-lg col-6">Prender</button>
        </div>
    </div>
    `,
    methods: {
        Emit_Apagar(nodo){
            console.log("apagar  " + nodo);
            socket.emit('browserApagar', nodo);
        },
        Emit_Prender(nodo){
            console.log("prender  " + nodo);
            socket.emit('browserPrender', nodo);
        }
    }
})


var MiApp = new Vue({
    el: '#app'
});

// var socket = io();
// socket.emit('browser_estados_nodos_pedir', 'x');
// socket.on('estados_nodos_recibir', function(msg){
//     console.log('se reciben estados  --->' + msg);
// });
