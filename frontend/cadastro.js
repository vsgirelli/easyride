  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  // if browser doesn't support WebSocket, just show some notification and exit
  if (!window.WebSocket) {
      content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                  + 'support WebSockets.'} ));
      input.hide();
      $('span').hide();
  }

  // open connection
  var connection = new WebSocket('ws://127.0.0.1:1337');

  function enviar(message) {
    connection.send(message)
  }

  connection.onerror = function (error) {
      // just in there were some problems with conenction...
      content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                  + 'connection or the server is down.' } ));
  };

// Trata a resposta do backend a um checkUser
function checkedUser(body) {
  // se for undefined, não tem user no BD
  // então pode cadastrar o user como o tipo (caroneiro ou motorista)
  if (body.role == "undefined") {
    cadastrar(body.tipo);
  }
  // se ele já está cadastrado como motorista
  else if (body.role == "motorista") {
    // e a requisição quiser cadastrar como motorista
    if (body.tipo == "motorista") {
      window.alert("Esse motorista já está cadastrado em outra conta com a CNH informada");
    }
    // e ele já está cadastrado como caroneiro
    else if (body.tipo == "caroneiro") {
      cadastrar(body.tipo);
    }
  }
  // se ele já está cadastrado como caroneiro
  else if (body.role == "caroneiro") {
    // e a requisição quiser cadastrar como caroneiro
    if (body.tipo == "caroneiro") {
      window.alert("Esse caroneiro já está cadastrado em outra conta com o CPF informado");
    }
    // e ele já está cadastrado como motorista
    else if (body.tipo == "motorista") {
      cadastrar(body.tipo);
    }
  }
  else if (body.role == "ambos") {
    window.alert("Usuário já existe!");
  }
}

  //incoming messages do back
  connection.onmessage = function (message) {
    if (message.type === 'utf8') {
        message = (message.utf8Data)
        let msg = JSON.parse(message);
        let header = msg.header;
        let body = msg.body;
        let  = {};
        ans["header"] = {};
        ans["body"] = {};

        // Se a answer for um checkedUser, tem o resultado do que o user é no BD
        if (header.operation == "checkedUser") {
          checkedUser(body);
        }
        if (header.operation == "createdUser") {
          if (body.status == "successful") {
            window.alert("Usuário cadastrado com sucesso!");
          }
          else if (body.status == "error") {
            window.alert("Erro: " + body.error);
          }
          else {
            window.alert("Fatal error: chame o admin!");
          }
        }
    }
  };

function show_cdstm(){
    document.getElementById("acc-motorista").style.display="block";
    document.getElementById("acc-type-choice-div").style.display="none";
}

function show_cdstc(){
    document.getElementById("acc-caroneiro").style.display="block";
    document.getElementById("acc-type-choice-div").style.display="none";
}

function back_to_type (){
    document.getElementById("acc-motorista").style.display="none";
    document.getElementById("acc-caroneiro").style.display="none";
    document.getElementById("acc-type-choice-div").style.display="block";
}

function getPassageiroSubmit() {
  //Verificar data de nascimento
  var today = new Date();
  today.setFullYear(today.getFullYear()-18);
  var born = new Date(nascimento)

  if (born > today){
      window.alert("É preciso ser maior de idade para criar uma conta no EasyRide.");
      return false;
  }
  if (senha != confsenha){
        window.alert("A senha e a confirmação de senha devem ser iguais.")
        return false;
  }
  var nome;
  var cpf;
  var nascimento;
  var telefone;
  var email;
  var senha;
  var confsenha;
  nome = document.getElementById("cnome").value;
  cpf = document.getElementById("ccpf").value;
  nascimento = document.getElementById("cnascimento").value;
  telefone = document.getElementById("ctel").value;
  email = document.getElementById("cemail").value;
  senha = document.getElementById("csenha").value;
  confsenha = document.getElementById("csenhaconf").value;
  var bandeira = document.getElementById("cbandeira").value;
  var cartao = document.getElementById("ccartao").value;
  var nomecartao = document.getElementById("cnomecartao").value;
  var validade = document.getElementById("cvalidade").value;
  var cvv = document.getElementById("ccvv").value;
  var message= {}
  message.header = {
    "operation":"ccaroneiro"
  }
  message.body = {
    "nome":nome,
    "cpf":cpf,
    "nascimento":nascimento,
    "telefone":telefone,
    "email":email,
    "senha":senha,
    "confsenha":confsenha,
    "bandeira":bandeira,
    "carta":cartao,
    "nomecartao":nomecartao,
    "validade":validade,
    "cvv":cvv
  }
  return message;
}

function getMotoristaSubmit() {
  //Verificar data de nascimento
  var today = new Date();
  today.setFullYear(today.getFullYear()-18);
  var born = new Date(nascimento)

  if (born > today){
      window.alert("É preciso ser maior de idade para criar uma conta no EasyRide.");
      return false;
  }
  if (senha != confsenha){
        window.alert("A senha e a confirmação de senha devem ser iguais.")
        return false;
  }

  var nome;
  var cpf;
  var nascimento;
  var telefone;
  var email;
  var senha;
  var confsenha;
  nome = document.getElementById("mnome").value;
  cpf = document.getElementById("mcpf").value;
  nascimento = document.getElementById("mnascimento").value;
  var cnh = document.getElementById("mcnh").value;
  telefone = document.getElementById("mtel").value;
  email = document.getElementById("memail").value;
  senha = document.getElementById("msenha").value;
  confsenha = document.getElementById("msenhaconf").value;
  var crlv = document.getElementById("mcrlv").value;
  var modelo = document.getElementById("mmodelo").value;
  var ano = document.getElementById("mano").value;
  var cor = document.getElementById("mcor").value;
  var placa = document.getElementById("mplaca").value;
  var lugares = document.getElementById("mlugares").value;
  var banco = document.getElementById("mbanco").value;
  var agencia = document.getElementById("magencia").value;
  var conta = document.getElementById("mconta").value;
  var tipoconta = document.getElementById("mtipoconta").value;
  var message= {}
  message.header = {
    "operation":"cmotorista"
  }
  message.body = {
    "nome":nome,
    "cpf":cpf,
    "nascimento":nascimento,
    "cnh":cnh,
    "telefone":telefone,
    "email":email,
    "senha":senha,
    "confsenha":confsenha,
    "crlv":crlv,
    "modelo":modelo,
    "ano":ano,
    "cor":cor,
    "lugares":lugares,
    "placa":placa,
    "banco":banco,
    "agencia":agencia,
    "conta":conta,
    "tipoconta":tipoconta
  }
  return message;
}

function valMeAma() {
  document.getElementById("mnome").value = "Val va";
  document.getElementById("mcpf").value = "12345678901";
  document.getElementById("mcnh").value = "12345678901";
  document.getElementById("mtel").value = "123456789011";
  document.getElementById("memail").value = "asuidhau@aom.com";
  document.getElementById("msenha").value = "ahuah";
  document.getElementById("msenhaconf").value = "ahuah";
  document.getElementById("mcrlv").value = "123456789011";
  document.getElementById("mmodelo").value = "2017/2";
  document.getElementById("mano").value = "2018";
  document.getElementById("mcor").value = "cinza";
  document.getElementById("mplaca").value = "IXT7200";
  document.getElementById("mlugares").value = "2";
  document.getElementById("mbanco").value = "dd";
  document.getElementById("magencia").value = "1234567890";
  document.getElementById("mconta").value = "1234567890";
  document.getElementById("mtipoconta").value = "corrente";
}

// Verificar se o user existe no BD e como existe
// (se existe como motorista, caroneiro ou como ambos)
function check(tipo) {
  enviar(JSON.stringify({
    "header":{"operation":"checkUser"},
    "body":{
      "cpf":document.getElementById("mcpf").value,
      "tipo":tipo
    }
  }));
}

function cadastrar(acc_type){
    if(acc_type == 'm'){
      var message = getMotoristaSubmit();
      let ans = {};
      ans.header = {"operation":"cmotorista"};
      ans.body = {message};
      enviar(JSON.stringify(ans));
    }
    else if(acc_type == 'c'){
        var message = getPassageiroSubmit();
        let ans = {};
        ans.header = {"operation":"ccaroneiro"};
        ans.body = {message};
        enviar(JSON.stringify(ans));
    }
    else {
     window.alert("Erro no cadastro, por favor tente novamente mais tarde.");
    }
}
