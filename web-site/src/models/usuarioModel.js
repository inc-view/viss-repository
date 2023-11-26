var database = require("../database/config")

function autenticar(email, senha) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
            SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarCodEmpresa(codigoEmpresa){

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT idEmpresa FROM empresa WHERE idEmpresa=${codigoEmpresa}`;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        var instrucao = `SELECT idEmpresa FROM empresa WHERE idEmpresa=${codigoEmpresa}`;
    }

    console.log("executando a instrução SQL: " + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, cpf , telefone, codigoEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        INSERT INTO funcionario (nome, email, senha, cpf , telefone, fkEmpresa, fkGestor) VALUES 
        ('${nome}', '${email}', '${senha}', '${cpf}' , '${telefone}', '${codigoEmpresa}', null);`;  
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        var instrucao = `
        INSERT INTO funcionario (nome, email, senha, cpf , telefone, fkEmpresa, fkGestor) VALUES 
        ('${nome}', '${email}', '${senha}', '${cpf}' , '${telefone}', '${codigoEmpresa}', null);`;  
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listar(idUsuario){

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT nomeFuncionario, telefoneFuncionario, cpfGestor, emailFuncionario WHERE idFuncionario = '${idUsuario}';`;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        var instrucao = `SELECT nomeFuncionario, telefoneFuncionario, cpfGestor, emailFuncionario WHERE idFuncionario = '${idUsuario}';`;
    }

    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    verificarCodEmpresa,
    cadastrar,
    listar
};