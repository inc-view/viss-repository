var database = require("../database/config");

function ListagemCpuON(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(Ativo) AS TotalDeComputadoresOnline
        FROM computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        WHERE ativo = 1 and funcionario.fkEmpresa = ${fkEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function ListagemCpuOff(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(Ativo) AS TotalDeComputadoresOfline
        FROM computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        WHERE ativo = 0 and funcionario.fkEmpresa = ${fkEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function ListagemCpuProblema(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idComputador) as totalCpuProblema from registro
        join hasComponente on fkHasComponente = idHasComponente
        join computador on fkComputador = idComputador 
        join componente ON fkComponente = idComponente
		join funcionario on fkFuncionario = idFuncionario
        where componente.tipo = 'cpu' and registro.registro > 85 and funcionario.fkEmpresa = ${fkEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ListagemTotalComputadores(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` select count(idComputador) as totalComputadores from computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        where funcionario.fkEmpresa = ${fkEmpresa};`;
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
        f.nome AS 'NomeFuncionario',
        c.idComputador as "idComputador",
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT MAX(r.dtHora)
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            LIMIT 1
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa};  
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
    ListagemCpuProblema,
    ListagemCpuON,
    ListagemCpuOff,
    ListagemTotalComputadores,
}