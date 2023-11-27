var database = require("../database/config");

function ListagemTotalChamadas(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        sum(lf.abandonadas) as chamadasAbandonadas
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    JOIN empresa e ON f.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = ${fkEmpresa};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function ListagemTMA(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        avg((atendidas) / TIME_TO_SEC(duracao)) AS TMA
    FROM 
        ligacoesFuncionario lf
    JOIN 
        funcionario f ON lf.fkFuncionario = f.idFuncionario
    JOIN 
        empresa e ON f.fkEmpresa = e.idEmpresa
    WHERE 
        e.idEmpresa = ${fkEmpresa};
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function ListagemDuracao(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT TIME_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(lf.duracao))), '%H:%i:%s') AS tempoMedioDuracao
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        JOIN empresa e ON f.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${fkEmpresa};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function fazerLista(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
        f.nome AS nome_funcionario,
        lf.recebidas AS chamadas_recebidas,
        lf.atendidas AS chamadas_atendidas,
        lf.porcAtendidas AS porcentagem_atendidas,
        lf.abandonadas AS chamadas_abandonadas,
        lf.duracao AS duracao_total,
        IFNULL(lf.atendidas / NULLIF(TIME_TO_SEC(lf.duracao), 0), 0) AS TMA
    FROM 
        funcionario f
    JOIN 
        ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
    WHERE 
        f.fkEmpresa = ${fkEmpresa}
    ORDER BY 
        lf.atendidas DESC;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function fazerListaPorNome(fkEmpresa,nome){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total,
    IFNULL(lf.atendidas / NULLIF(TIME_TO_SEC(lf.duracao), 0), 0) AS TMA
FROM 
    funcionario f
JOIN 
    ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE 
    f.fkEmpresa = ${fkEmpresa} and f.nome like '%${nome}%'
ORDER BY 
    lf.atendidas DESC;
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    fazerLista,
    fazerListaPorNome,
    ListagemDuracao,
    ListagemTotalChamadas,
    ListagemTMA,
    
}