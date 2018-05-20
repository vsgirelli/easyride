function show_loginm(){
    
    document.getElementById("login-div").style.display="block";
    document.getElementById("login-acc-type-div").style.display="none";
    document.getElementById("entrar-c").style.display="none";
    document.getElementById("entrar-m").style.display="block";

}

function show_loginc(){
    
    document.getElementById("login-div").style.display="block";
    document.getElementById("login-acc-type-div").style.display="none";
    document.getElementById("entrar-c").style.display="block";
    document.getElementById("entrar-m").style.display="none";

}

function show_acc_choice (){
    document.getElementById("login-div").style.display="none";
    document.getElementById("login-acc-type-div").style.display="block";

}

function login(acc_type){
    
    var username = document.getElementById("email-field").value;
    var userpwd = document.getElementById("pwd-field").value;
    
    if (username) {
        if (userpwd){
            window.alert("email : " +  username + "  password : " + userpwd + "  user type : " + acc_type);
            if (true){ //verificacao do login no banco de dados
                
            }
            else window.alert("Usuário invalido ou senha incorreta, certifique-se que o tipo de usuário correto foi escolhidop na tela anterior.");
                
            
        }
        else window.alert("preencha o campo de senha");
    }
    else window.alert("preencha o campo de e-mail");
    
}