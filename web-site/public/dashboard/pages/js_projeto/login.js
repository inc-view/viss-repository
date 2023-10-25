function login(){
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    var verif_vazioLog = email == '' || senha == '';
    if(verif_vazioLog){
        alert("Campos não podem estar vazios");
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer : email,
            senhaServer : senha
        })
    }).then(function (resposta){
        if(resposta.ok){
            console.log(resposta)


            alert("Login realizado com sucesso! Redirecionando para a dashboard geral!")

            resposta.json().then(json => {
                console.log(json)
                console.log(JSON.stringify(json));
                console.log(json[0].nome)
                localStorage.ID_USER = json[0].idFuncionario;
                localStorage.NOME_USER = json[0].nome;
                localStorage.FK_GESTOR = json[0].fkGestor;
                localStorage.EMAIL_USER = json[0].email;
                localStorage.SENHA_USER = json[0].senha;
                localStorage.FK_EMPRESA = json[0].fkEmpresa;


                setTimeout(function (){
                    window.location = "../../../dashboard/index.html"
                }, 1000);
            })
        }else{
            console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
        }
    }).catch(function (erro){
        console.log(erro);
    })
    return false;
}