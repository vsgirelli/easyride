var pgp = require('pg-promise')(/*options*/);
//var websocket = require('./ws.js');
//Isso aqui é caso a gente consiga fazer modular, daí separo em classe e pa
var http = require('http');

//websocket and http servers
var webSocketServer = require('websocket').server;
var webSocketsServerPort = 1337;

//BD Configs
var cn = {
    host: 'ec2-54-204-46-236.compute-1.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'd72of1j8f0qmbr',
    user: 'mulmzkcecpgxdp',
    password: '4861cff57b960ca9aba71017fa25203c8cbd09208d3e2788260023564154733a',
    ssl: true
};
var db = pgp(cn); // database instance;

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

// isso aqui é um ex de como acessar o BD
/*db.any('SELECT * FROM carro')
    .then(data => {
      data.forEach((row, index, data) => {
        console.log('oi'); // print user name;
        console.log(row.modelo);
      })
    })
    .catch(error => {
        console.log(error); // print the error;
    });
*/
