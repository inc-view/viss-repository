function mask(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmask()",1)
    }
    
    function execmask(){
    v_obj.value=v_fun(v_obj.value)
    }
    
    function masktel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
    }
    
    function maskcpf(v){ 
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return v;
    }
     
    function idcss( el ){
        return document.getElementById( el );
    }
    
    window.onload = function(){
        
        
        
        //CELULAR -------
        idcss('ipt_tel').setAttribute('maxlength', 15);
        idcss('ipt_tel').onkeypress = function(){
            mask( this, masktel );
        }
        //-------------
        
        
        //CPF ---------
        idcss('ipt_cpf').setAttribute('maxlength', 14);
        idcss('ipt_cpf').onkeypress = function(){
            mask( this, maskcpf );
        }
        //-------------
        
    }

//ATUALIZA A FKGESTOR PARA O PRÓPRIO ID DO FUNCIONÁRIO CADASTRADO E JOGA PARA A TELA DE LOGIN
function atualizarCadFunc(nome, email, cpf){
    fetch(`/usuarios/atualizarCadFunc`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer : nome,
            emailServer : email,
            cpfServer : cpf
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a atualização da fkGestor! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

//CADASTRA O FUNCIONÁRIO
function cadastrar(empresa){
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var cpfVar = ipt_cpf.value;
    var empresaVar = empresa;
    var telefoneVar = ipt_tel.value;
    var senhaVar = ipt_senha.value;
    var confSenha = ipt_confSenha.value;

    var cpfBanco = cpfVar.replace('.', '');
    cpfBanco = cpfBanco.replace('.', '');
    cpfBanco = cpfBanco.replace('-', '');

    var telBanco = telefoneVar.replace('(', '');
    telBanco = telBanco.replace(')', '');
    telBanco = telBanco.replace(' ', '');
    telBanco = telBanco.replace('-', '');

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
                telefoneServer:telBanco,
                empresaServer : empresaVar,
                cpfServer: cpfBanco
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                atualizarCadFunc(nomeVar, emailVar, cpfBanco);
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

//PRIMEIRO VERIFICA SE A EMPRESA EXISTE NO BANCO
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