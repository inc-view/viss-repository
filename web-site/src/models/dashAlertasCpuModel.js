var database = require("../database/config");

function dashboardAlertasCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        MONTH(dtHora) AS 'mes',
        COUNT(registro) AS 'ocorrencia' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = idComputador
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023
    GROUP BY 
        MONTH(dtHora)
    ORDER BY
        MONTH(dtHORA);`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        MONTH(dtHora) AS 'mes',
        COUNT(registro) AS 'ocorrencia' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = idComputador 
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023
    GROUP BY 
        MONTH(dtHora)
    ORDER BY
        MONTH(dtHora);`;


        /* SELECT 
        MONTH(dtHora) AS 'mes',
        COUNT(registro) AS 'ocorrencia' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = idComputador 
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023 -- Substitua 2023 pelo ano desejado
        and idComputador = ${IdMaquina}
    GROUP BY 
        MONTH(dtHora)
    ORDER BY
        MONTH(dtHora); */
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarOcorrenciaMes(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        DATE_FORMAT(dtHora, '%d-%m-%Y') AS 'data',
        COUNT(registro) AS 'ocorrencia' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = idComputador 
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023
        AND MONTH(dtHora) = 1
    GROUP BY 
        DATE_FORMAT(dtHora, '%d-%m-%Y')
    ORDER BY
        DATE_FORMAT(dtHora, '%d-%m-%Y');`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        DATE_FORMAT(dtHora, '%d-%m-%Y') AS 'data',
        COUNT(registro) AS 'ocorrencia' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = idComputador 
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023
        AND MONTH(dtHora) = ${value}
    GROUP BY 
        DATE_FORMAT(dtHora, '%d-%m-%Y')
    ORDER BY
        DATE_FORMAT(dtHora, '%d-%m-%Y');`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    dashboardAlertasCpu,
    listarOcorrenciaMes
};
