var database = require("../database/config");

function dashboardGeral() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardCpu() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT registro AS 'cpu', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'CPU' AND computador.idComputador = 1 ORDER BY dtHora DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardMemory() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
<<<<<<< HEAD
        instrucaoSql = `SELECT registro AS 'cpu', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'CPU' AND computador.idComputador = 1 ORDER BY dtHora DESC LIMIT 1;`;
=======
        instrucaoSql = `SELECT registro AS 'memory', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'Memoria' AND computador.idComputador = 1 ORDER BY dtHora DESC LIMIT 1;`;
>>>>>>> 894dc7ea7b2949604119f66b818cac36987c4120
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardDisk() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
<<<<<<< HEAD
        instrucaoSql = `SELECT registro AS 'cpu', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'CPU' AND computador.idComputador = 1 ORDER BY dtHora DESC LIMIT 1;`;
=======
        instrucaoSql = `SELECT registro AS 'disk', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'Disco' AND computador.idComputador = 1 ORDER BY dtHora DESC LIMIT 1;`;
>>>>>>> 894dc7ea7b2949604119f66b818cac36987c4120
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function infoMaquina() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECR * FROM infoComputador WHERE ipComputador = 'PC001'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    dashboardGeral,
    dashboardCpu,
    dashboardMemory,
    dashboardDisk,
    infoMaquina
}
