var database = require("../database/config");

function ListagemCpuON(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(*) AS TotalDeComputadoresAtivos
        FROM computador
        WHERE ativo = 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function ListagemCpuOff(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(*) AS TotalDeComputadoresAtivos
        FROM computador
        WHERE ativo = 0;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function fazerLista(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `CREATE VIEW infoComputador AS
        SELECT 
            f.nome AS 'NomeFuncionario',
            c.ipComputador AS 'IpComputado',
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
        JOIN funcionario f ON c.fkFuncionario = f.idFuncionario;
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
    ListagemCpuON,
    ListagemCpuOff
}