var http = require('http');
var bdapi = require('./backend/bdapi.js');
var Driver = require('./backend/driver.js')

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

    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            mensagem = (message.utf8Data)
            let msg = JSON.parse(mensagem);
            let header = msg.header;
            let body = msg.body;
            let ans;
            console.log(msg);

            if (header.operation == "checkMotorista") {
              //bdapi.checkUser()
            }
            else if (header.operation == "checkCaroneiro") {
              //bdapi.checkUser()
            }
            else if (header.operation == "cmotorista") {
              let result = await bdapi.createMotorista(body.cpf, body.nome, body.nascimento, body.cnh, body.telefone, body.email,
                body.senha, body.confsenha, body.crlv, body.modelo, body.ano, body.cor, body.placa, body.banco,
                body.agencia, body.conta, body.lugares, body.tipoconta);
                if (result == 0) {
                  ans = true;
                }
            }
            else if (header.operation == "ccaroneiro") {
              bdapi.createCaroneiro(body.cpf, body.nome, body.nascimento, body.cnh, body.telefone, body.email,
                body.senha, body.confsenha, body.crlv, body.modelo, body.ano, body.cor, body.placa, body.banco,
                body.agencia, body.conta, body.lugares, body.tipoconta);
            }
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