

Vue.component('nodo-lolin', {
    props: ['estado', 'lugar'],
    template: `
    <div class="container shadow bg-white rounded mb-4">
        <div class="row">
            <div class="alert alert-primary col-12 text-center" role="alert">
                {{estado.name}} - {{lugar}}
            </div>    
        </div>
        <div class="row">
            <i class="fas fa-lightbulb fa-7x col-12 text-center p-3"
             :class="{'text-danger':estado.out==3,'text-warning':estado.out==1,'text-muted':estado.out==0}"></i>
        </div>
        <div class="row">
            <button v-on:click="Emit_Apagar()" type="button" class="btn btn-outline-primary btn-lg col-6">Apagar</button>
            <button v-on:click="Emit_Prender()" type="button" class="btn btn-outline-warning btn-lg col-6">Prender</button>
        </div>
    </div>
    `,
    methods: {
        Emit_Apagar(){
            console.log("apagar  " + this.estado.name);
            socket.emit('browserApagar', this.estado.name);
        },
        Emit_Prender(){
            console.log("prender  " + this.estado.name);
            socket.emit('browserPrender', this.estado.name);
        }
    },
})

var socket=null;

var MiApp = new Vue({
    el: '#app',
    data:{
        infonodos:{nodo1:{name:"nodo1",out:3},nodo2:{name:"nodo2",out:3},nodo3:{name:"nodo3",out:3}}
    },
    created(){
        socket = io();
    },
    mounted(){
        socket.emit('browser_estados_nodos_pedir', 'x');
        socket.on('estados_nodos_recibir', function(msg){
            console.log(msg);
            MiApp.infonodos = JSON.parse(msg);
        });   
    }
});
