var User = require('./user.js');

module.exports = class Passenger extends User{

	constructor(nome,
		cpf,
		nascimento,
		telefone,
		email,
		senha,
		confsenha,
		bandeira,
		cartao,
		nomecartao,
		validade,
		cvv) {
			super(nome,cpf,nascimento,telefone,email,senha,confsenha);
			this.bandeira = bandeira;
			this.cartao = cartao;
			this.nomecartao = nomecartao;
			this.validade = validade;
			this.cvv = cvv;
	}
}
