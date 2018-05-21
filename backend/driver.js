var User = require('./user.js');

module.exports = class Driver extends User{

	constructor(nome,
		cpf,
		nascimento,
		telefone,
		email,
		senha,
		confsenha,
		cnh,
		crlv,
		modelo,
		ano,
		cor,
		placa,
		banco,
		agencia,
		conta) {
			super(nome,cpf,nascimento,telefone,email,senha,confsenha);
      this.crlv = crlv;
      this.modelo = modelo;
      this.ano = ano;
      this.cor = cor;
      this.placa = placa;
      this.banco = banco;
      this.agencia = agencia;
      this.conta = conta;
	}

	criarCarona(){

	}
}
