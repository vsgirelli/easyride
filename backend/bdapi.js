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

exports.checkUser = function(cpf) {
  db.one({
    name: 'find-user',
    text: 'SELECT * FROM users WHERE id = $1', // can also be a QueryFile object
    values: [1]
})

}

//db.one('INSERT INTO carro(placa,modelo,ano,cor,lugares,crlv) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [placa,modelo,ano,cor,lugares,crlv])
exports.createMotorista = function(cpf, nome, nascimento, cnh, telefone, email, senha,
  confsenha, crlv, modelo, ano, cor, placa, banco, agencia, conta, lugares, tipoconta) {
console.log('insert carro');
db.none('INSERT INTO carro(placa,modelo,ano,cor,lugares,crlv) VALUES($1, $2, $3, $4, $5, $6)', [placa,modelo,ano,cor,lugares,crlv])
  .then( () => {
    console.log('insert usuario');
    db.none('INSERT INTO usuario(cpf, nome, data_nascimento) VALUES($1, $2, $3)', [cpf, nome,nascimento])
       .then(() => {
         console.log('insert motorista');
          db.none('INSERT INTO motorista(cnh,conta_banco,agencia_banco,banco,tipo_conta,carro_placa,cpf) VALUES($1, $2, $3, $4, $5, $6, $7)', [cnh,banco,agencia,banco,tipoconta,placa,cpf])
              .then(() => {
                 console.log('Motorista novo cadastrado com sucesso');
                   return 0;
              })
              .catch(error => {
                 console.log('ERROR creating motorista'); // print error;
                 db.none('delete from usuario where cpf = $1', cpf)
                 .then(() => {
                    console.log('usuario de motorista nao criado foi removido');
                    db.none('delete from carro where placa = $1', placa)
                      .then(() => {
                         console.log('carro de usuario nao criado foi removido');
                      })
                 })
                 return 3;
              });
            })
      .catch(error => {
          console.log('ERROR creating usuario'); // print error;
          db.none('delete from carro where placa = $1', placa)
          .then(() => {
             console.log('carro de usuario nao criado foi removido');
          })
          return 2;
      });

  })
  .catch(error => {
      console.log('ERROR creating carro'); // print error;
      return 1;
  });
}

exports.createCaroneiro = function(cpf, nome, nascimento, cnh, telefone, email, senha,
  confsenha, bandeira, cartao, nomecartao, validade, cvv) {

}

exports.createCarona = function(data, horaIni ) {
console.log("Criando carona");
}
