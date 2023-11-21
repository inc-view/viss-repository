var database = require("../database/config");

function dashboardCpuAlertasCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        MONTH(dtHora) AS 'Mes',
        COUNT(registro) AS 'Ocorrencias' 
    FROM 
        registro 
    JOIN 
        hasComponente ON fkHasComponente = idHasComponente 
    JOIN 
        componente ON fkComponente = idComponente 
    JOIN 
        computador ON fkComputador = ${idMaquina} 
    WHERE 
        componente.tipo = 'CPU' 
        AND registro > 90 
        AND YEAR(dtHora) = 2023
    GROUP BY 
        MONTH(dtHora)
    ORDER BY
        MONTH(dtHORA);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = { 
  dashboardCpuAlertasCpu
};
