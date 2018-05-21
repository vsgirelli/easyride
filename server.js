var http = require('http');
var bdapi = require('./bdapi.js');
// exemplo de como chamar as coisas da api do bd
bdapi.createCarona();
var Driver = require('./driver.js')

//websocket and http servers
var webSocketServer = require('websocket').server;
var webSocketsServerPort = 1337;

//Server websocket setup
var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

var wsServer = new webSocketServer({
    httpServer: server
});

//console.log(ws.oi);
//var ws = new websocket();

//Starts here
//Espera por um request do front
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            mensagem = (message.utf8Data)
            //Aqui tem que implementar nossa lógica
            //Quando chegar uma message, tem que tratar ela e ver o que fazer
            //Por ex, pode ser um login, daí tem que chamar as coisas de autenticar login
            //Que seria algo tipo consulta no BD e tal
            // if(mensagem.header === logindriver){
            //     var oneDriver = new Driver();

            // }else if (message.header === loginpass) {
            //     var pass = new passageiro(campos da mensagem pra instanciar obj de passageiro)
            // }
            // else if (message.header === criarcarona) {
            //     Driver.criarcarona(campos que importam);
            // }
//            let msg = JSON.parse(mensagem);
//            let operation = msg.header.operation;
//            console.log(operation);



            //Como resonder de volta pro cliente HTML via websocket
            //depois que tiver uma resposta
            //Por ex, num login, consulta o BD e se for um usuário válido
            //responde um true ou algo assim pro front
            var json = JSON.stringify({ type:'message', data: "Val" });
            connection.sendUTF(json);
        }
    });

    // user disconnected
    //Melequinha de quando um cliente fecha a janela no navegador
    connection.on('close', function(connection) {
            console.log((new Date()) + " Peer "
                + connection + " disconnected.");
    });
});
