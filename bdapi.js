var pgp = require('pg-promise')(/*options*/);
var exports = module.exports = {};

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

exports.checkUser = function(cpf) {

}

exports.createMotorista = function(cpf, nome, nascimento, cnh, telefone, email, senha,
  confsenha, crlv, modelo, ano, cor, placa, banco, agencia, conta) {

}

exports.createCaroneiro = function(cpf, nome, nascimento, cnh, telefone, email, senha,
  confsenha, bandeira, cartao, nomecartao, validade, cvv) {

}

exports.createCarona = function(data, horaIni, ) {
console.log("Criando carona");
}
