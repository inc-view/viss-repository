function cadastrar(){
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var cpfVar = ipt_cpf.value;
    var empresaVar = ipt_codEmpresa.value;
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
                cpfServer: cpfVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para o login");
                window.location = "login.html";
                

                // limparFormulario();
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

function verificaEmpresaExiste(codigoEmpresa){
    var empresaVar = ipt_codEmpresa.value;


    fetch(`/usuarios/verificarCodEmpresa/${codigoEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            empresaServer: empresaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            if(empresaServer == null){
                aviso_codEmpresa.inner_HTML = "Empresa não encontrada"
            }else{
                cadastrar();
            }
            

            // limparFormulario();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        //finalizarAguardar();
    });
}