function cadastrar(empresa){
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var cpfVar = ipt_cpf.value;
    var empresaVar = empresa;
    var telefoneVar = ipt_tel.value;
    var senhaVar = ipt_senha.value;
    var confSenha = ipt_confSenha.value;

    //VERIFICAÇÕES
    var verifica_vazio = nomeVar == '' || emailVar == '' || cpfVar == '' || empresaVar == '' || telefoneVar == '' || senhaVar == '' || confSenha == '';
    var verifica_senha = senhaVar != confSenha;


    if(verifica_vazio){
        alert("Os campos devem ser todos preenchidos");
    }
    if(verifica_senha){
        alert("Os campos não correspondem")
    }
    if(!verifica_senha && !verifica_vazio){
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                senhaServer: senhaVar,
                emailServer: emailVar,
                telefoneServer:telefoneVar,
                empresaServer : empresaVar,
                cpfServer: cpfVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para o login");
                window.location = "login.html";
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //finalizarAguardar();
        });

        return false;

    }else{
        alert("campos preenchidos de maneira incorreta")
    }
}

function verificaEmpresaExiste(){
    var empresaVar = ipt_codEmpresa.value;


    fetch(`/usuarios/verificarCodEmpresa/${empresaVar}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                cadastrar(empresaVar);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            var aviso = document.getElementById("aviso_codEmpresa");
                    aviso.innerHTML = "Empresa não existe!"
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}