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
            ans["header"] = {};
            ans["body"] = {};
            console.log(msg);

            if (header.operation == "checkUser") {
              ans.header = {"operation":"checkedUser"};
              let result = bdapi.checkUser(body.cpf, body.tipo);
              if (result == 0) {
                ans.body = {"role":"undefined"};
              }
              else if (result == 1) {
                ans.body = {"role":"motorista"};
              }
              else if (result == 2) {
                ans.body = {"role":"caroneiro"};
              }
              else if (result == 3) {
                ans.body = {"role":"ambos"};
              }
              ans.body["tipo"] = body.tipo;
            }
            if (header.operation == "cmotorista") {
              ans.header = {"operation":"createdUser"};
              let result = await bdapi.createMotorista(body.cpf, body.nome, body.nascimento, body.cnh, body.telefone, body.email,
                body.senha, body.confsenha, body.crlv, body.modelo, body.ano, body.cor, body.placa, body.banco,
                body.agencia, body.conta, body.lugares, body.tipoconta);
              if (result == 0) { // motorista cadastrado com sucesso
                ans.body["status"] = "successful";
              }
              else if (result == 1){  // carro já cadastrado
                ans.body["status"] = "error";
                ans.body["error"] = "carro já cadastrado para outro motorista";
              }
              else if (result == 2){ // usuário já cadastrado
                ans.body["status"] = "error";
                ans.body["error"] = "já existe um usuário cadastrado";
              }
              else if (result == 3){
                ans.body["status"] = "error";
                ans.body["error"] = "esse motorista já está cadastrado em outra conta com a CNH informada";
              }
            }
            if (header.operation == "ccaroneiro") {
              bdapi.createCaroneiro(body.cpf, body.nome, body.nascimento, body.cnh, body.telefone, body.email,
                body.senha, body.confsenha, body.crlv, body.modelo, body.ano, body.cor, body.placa, body.banco,
                body.agencia, body.conta, body.lugares, body.tipoconta);
            }
            if (header.operation == "appendmotorista") {
              ans.header = {"operation":"appendedmotorista"};
              let result = await bdapi.appendMotorista(body.cnh,body.crlv, body.modelo, body.ano, body.cor, body.placa, body.banco,
                body.agencia, body.conta, body.lugares, body.tipoconta);

            }
            if (header.operation == "appendcaroneiro") {
              ans.header = {"operation":"appendedcaroneiro"};
              let result = await bdapi.appendCaroneiro(body.cpf,body.cvv,body.validade,body.nomecartao,body.cartao);

            }

            connection.sendUTF(JSON.stringify(ans));
        }
    });

    // user disconnected
    //Melequinha de quando um cliente fecha a janela no navegador
    connection.on('close', function(connection) {
            console.log((new Date()) + " Peer "
                + connection + " disconnected.");
    });
});
