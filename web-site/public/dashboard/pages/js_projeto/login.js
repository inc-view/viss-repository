const successToast = Toastify({
    text: "Cadastro realizado com sucesso",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#008000",
    },
  });

  const errorToast = Toastify({
    text: "Não foi possível realizar o cadastro",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#FF2F2F",
    },
  });

  const infoToast = Toastify({
    text: "",
    className: "info",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#eead2d",
    },
  });



function login(){
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    var verif_vazioLog = email == '' || senha == '';
    if(verif_vazioLog){
        infoToast.options.text = "Campos não podem estar vazios"
        infoToast.showToast()
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


            successToast.options.text = "Login realizado com sucesso! Redirecionando para a dashboard geral!"
            successToast.showToast()

            resposta.json().then(json => {
                console.log(json)
                console.log(JSON.stringify(json));
                console.log(json[0].nome)
                sessionStorage.ID_USER = json[0].idFuncionario;
                sessionStorage.NOME_USER = json[0].nome;
                sessionStorage.FK_GESTOR = json[0].fkGestor;
                sessionStorage.EMAIL_USER = json[0].email;
                sessionStorage.SENHA_USER = json[0].senha;
                sessionStorage.FK_EMPRESA = json[0].fkEmpresa;


                setTimeout(function (){
                    window.location = "../../../dashboard/index.html"
                }, 2000);
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