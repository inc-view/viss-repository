var database = require("../database/config");

function kpisProdutividade(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'CPU' 
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 5 MINUTE) and time(current_timestamp());`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'CPU' 
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 5 MINUTE) and time(current_timestamp()) order by dtHora desc limit 50;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpisProdutividade
}