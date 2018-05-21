
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

    //incoming messages do back
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
            console.log('recebi resposta');
            console.log(json.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
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

function cadastrar(acc_type){
    var nome;
    var cpf;
    var nascimento;
    var telefone;
    var email;
    var senha;
    var confsenha;

    if(acc_type == 'm'){

        nome = document.getElementById("mnome").value;
        cpf = document.getElementById("mnome").value;
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
        var placa = document.getElementById("mlugares").value;
        var banco = document.getElementById("mbanco").value;
        var agencia = document.getElementById("magencia").value;
        var conta = document.getElementById("mtipoconta").value;
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
          "placa":placa,
          "banco":banco,
          "angencia":agencia,
          "conta":conta
        }
        enviar(JSON.stringify(message));
    }
    else if(acc_type == 'c'){
        nome = document.getElementById("cnome").value;
        cpf = document.getElementById("cnome").value;
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
        enviar(JSON.stringify(message));

    }
    else window.alert("Erro no cadastro, por favor tente novamente mais tarde.");

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


    window.alert("Usuário cadastrado com sucesso.");
    return true;
}
