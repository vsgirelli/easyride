var http = require('http');
var bdapi = require('./bdapi.js');
// exemplo de como chamar as coisas da api do bd
bdapi.createCarona();
var Driver = require('./driver.js');
var Passenger = require('./passenger.js');

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
            let msg = JSON.parse(mensagem)
            let operation = msg.header.operation

            if(operation === "cmotorista"){
                if(bdapi.checkUser(msg.body.cpf)!){
                //precisa desse objeto?
                var umMotorista = new Driver(msg.body.nome, msg.body.cpf, msg.body.nascimento, msg.body.telefone, msg.body.email, msg.body.senha, msg.body.confsenha, msg.body.cnh, msg.body.crlv, msg.body.modelo,
                                             msg.body.ano, msg.body.cor, msg.body.placa, msg.body.banco, msg.body.agencia, msg.body.conta);

                bdapi.createMotorista(msg.body.cpf, msg.body.nome, msg.body.nascimento, msg.body.cnh, msg.body.telefone, msg.body.email, msg.body.senha,
                                      msg.body.confsenha, msg.body.crlv, msg.body.modelo, msg.body.ano, msg.body.cor, msg.body.placa, msg.body.banco, msg.body.agencia, msg.body.conta);
                }
            }
            else if (operation === "ccaroneiro"){
                if(bdapi.checkUser(msg.body.cpf)!){
                    var umPassageiro = new Passenger(msg.body.nome, msg.body.cpf, msg.body.nascimento, msg.body.telefone, msg.body.email, msg.body.senha, msg.body.confsenha, msg.body.bandeira, msg.body.cartao,
                                                     msg.body.nomecartao, msg.body.validade, msg.body.cvv);

                    bdapi.createCaroneiro(msg.body.cpf, msg.body.nome, msg.body.nascimento, msg.body.cnh, msg.body.telefone, msg.body.email, msg.body.senha,
                                          msg.body.confsenha, msg.body.bandeira, msg.body.cartao, msg.body.nomecartao, msg.body.validade, msg.body.cvv);
                }
            }
             else if (operation === "criarcarona") {
                     //Driver.criarcarona();
                }
            }
            console.log(mensagem);


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
