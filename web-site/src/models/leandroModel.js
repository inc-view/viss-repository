var database = require("../database/config");

function dadosCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'CPU' 
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp());`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'CPU' 
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp()) order by dtHora desc;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadosMEM(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join unidadeMedida u on u.idUnidadeMedida = c.fkUnidadeMedida
        join computador pc on pc.idComputador = hc.fkComputador
        where c.tipo = 'Memoria' and u.tipoMedida = '%' 
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp());`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join unidadeMedida u on u.idUnidadeMedida = c.fkUnidadeMedida
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'Memoria' and u.tipoMedida = '%'
            and pc.idComputador = ${idMaquina}
            and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp()) order by dtHora desc;`;
            
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadosDisco(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select registro, dtHora from registro r
        join hasComponente hc on hc.idHasComponente = r.fkHasComponente
        join componente c on c.idComponente = hc.fkComponente
        join unidadeMedida u on u.idUnidadeMedida = c.fkUnidadeMedida
        join computador pc on pc.idComputador = hc.fkComputador
            where c.tipo = 'Disco' and u.tipoMedida = '%'
                and pc.idComputador = ${idMaquina}
                and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp());`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select registro, dtHora from registro r
            join hasComponente hc on hc.idHasComponente = r.fkHasComponente
            join componente c on c.idComponente = hc.fkComponente
            join unidadeMedida u on u.idUnidadeMedida = c.fkUnidadeMedida
            join computador pc on pc.idComputador = hc.fkComputador
                where c.tipo = 'Disco' and u.tipoMedida = '%'
                    and pc.idComputador = ${idMaquina}
                    and r.dtHora between time(current_timestamp() - INTERVAL 60 MINUTE) and time(current_timestamp()) order by dtHora desc;`;
            
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function dashboardCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT registro AS 'cpu', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'CPU' AND computador.idComputador = ${idMaquina} ORDER BY dtHora DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardMemory(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT registro AS 'memory', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'Memoria' AND computador.idComputador = ${idMaquina} ORDER BY dtHora DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardDisk(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT registro AS 'disk', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'Disco' AND computador.idComputador = ${idMaquina} ORDER BY dtHora DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function infoMaquina(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT i.* FROM infoComputador AS i JOIN Computador AS c ON i.IpComputador = c.ipComputador AND c.idComputador=${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Individual Leandro

function dashboardMediaCpuDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%d-%m-%Y') AS 'data',
        AVG(registro) AS 'cpu'
    FROM
        registro
        JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 1
            AND idComputador = 1
            AND dtHora >= CURDATE() - INTERVAL 14 DAY
    GROUP BY
        data
    ORDER BY
        data;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardMediaCpuMonth(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `    SELECT
        DATE_FORMAT(dtHora, '%m-%Y') AS 'mes',
        AVG(registro) AS 'cpu'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 1
            AND idComputador = 1
            AND dtHora >= CURDATE() - INTERVAL 12 MONTH
    GROUP BY
        mes
    ORDER BY
        mes;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardMediaMemoryDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%d-%m-%Y') AS 'data',
        AVG(registro) AS 'memory'
    FROM
        registro
        JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 2
            AND idComputador = 1
            AND dtHora >= CURDATE() - INTERVAL 14 DAY
    GROUP BY
        data
    ORDER BY
        data;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardMediaMemoryMonth(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `    SELECT
        DATE_FORMAT(dtHora, '%m-%Y') AS 'mes',
        AVG(registro) AS 'memory'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 2
            AND idComputador = 1
            AND dtHora >= CURDATE() - INTERVAL 12 MONTH
    GROUP BY
        mes
    ORDER BY
        mes;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaCpuAllDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE(dtHora) AS 'data',
        AVG(registro) AS 'cpu'
    FROM
        registro
    JOIN
        hasComponente ON fkHasComponente = idHasComponente
        WHERE fkComponente = 1
        AND dtHora >= CURDATE() - INTERVAL 14 DAY
    GROUP BY
        DATE(dtHora)
    ORDER BY
        DATE(dtHora);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaCpuAllMonth(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `    SELECT
        DATE_FORMAT(dtHora, '%mx-%Y') AS 'mes',
        AVG(registro) AS 'memory'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
            WHERE fkComponente = 1
            AND dtHora >= CURDATE() - INTERVAL 12 MONTH
    GROUP BY
        mes
    ORDER BY
        mes;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaMemoryAllDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE(dtHora) AS 'data',
        AVG(registro) AS 'cpu'
    FROM
        registro
    JOIN
        hasComponente ON fkHasComponente = idHasComponente
        WHERE fkComponente = 2
        AND dtHora >= CURDATE() - INTERVAL 14 DAY
    GROUP BY
        DATE(dtHora)
    ORDER BY
        DATE(dtHora);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaMemoryAllMonth(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `    SELECT
        DATE_FORMAT(dtHora, '%Y-%m') AS 'mes',
        AVG(registro) AS 'memory'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
            WHERE fkComponente = 2
            AND dtHora >= CURDATE() - INTERVAL 12 MONTH
    GROUP BY
        mes
    ORDER BY
        mes;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaCpuDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'cpu'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 1
        AND DATE(dtHora) = CURDATE()
        AND idComputador = 1
	GROUP BY
		DAY(dtHora);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaCpuAllTime(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'cpu'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 1
        AND idComputador = 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaMemoryDay(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'memory'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 2
        AND DATE(dtHora) = CURDATE()
        AND idComputador = 1
	GROUP BY
		DAY(dtHora);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaMemoryAllTime(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'memory'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 2
        AND idComputador = 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    dadosCPU,
    dadosDisco,
    dadosMEM,
    dashboardCpu,
    dashboardMemory,
    dashboardDisk,
    infoMaquina,
    dashboardMediaCpuDay,
    dashboardMediaCpuMonth,
    dashboardMediaMemoryDay,
    dashboardMediaMemoryMonth,
    getMediaCpuAllDay,
    getMediaCpuAllMonth,
    getMediaMemoryAllDay,
    getMediaMemoryAllMonth,
    kpiMediaCpuDay,
    kpiMediaCpuAllTime,
    kpiMediaMemoryDay,
    kpiMediaMemoryAllTime
}