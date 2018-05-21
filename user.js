//CLASSE PAI USUÁRIO
module.exports = class User {

	constructor(nome,cpf,nascimento,telefone,email,senha,confsenha){
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.confsenha = confsenha;
	}
}