var database = require("../database/config");

function dadosCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 5 registro, dtHora
        FROM registro r
        JOIN hasComponente hc ON hc.idHasComponente = r.fkHasComponente
        JOIN componente c ON c.idComponente = hc.fkComponente
        JOIN computador pc ON pc.idComputador = hc.fkComputador
        WHERE c.tipo = 'CPU' 
            AND pc.idComputador = ${idMaquina}
            AND r.dtHora BETWEEN DATEADD(MINUTE, -60, GETDATE()) AND GETDATE()
        ORDER BY dtHora DESC;
        `;

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
        instrucaoSql = `SELECT TOP 5 registro, dtHora
        FROM registro r
        JOIN hasComponente hc ON hc.idHasComponente = r.fkHasComponente
        JOIN componente c ON c.idComponente = hc.fkComponente
        JOIN unidadeMedida u ON u.idUnidadeMedida = c.fkUnidadeMedida
        JOIN computador pc ON pc.idComputador = hc.fkComputador
        WHERE c.tipo = 'Memoria' AND u.tipoMedida = '%'
            AND pc.idComputador = ${idMaquina}
            AND r.dtHora BETWEEN DATEADD(MINUTE, -60, GETDATE()) AND GETDATE()
        ORDER BY dtHora DESC;`;

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
        instrucaoSql = `SELECT TOP 5 registro, dtHora
        FROM registro r
        JOIN hasComponente hc ON hc.idHasComponente = r.fkHasComponente
        JOIN componente c ON c.idComponente = hc.fkComponente
        JOIN unidadeMedida u ON u.idUnidadeMedida = c.fkUnidadeMedida
        JOIN computador pc ON pc.idComputador = hc.fkComputador
        WHERE c.tipo = 'Disco' AND u.tipoMedida = '%'
            AND pc.idComputador = ${idMaquina}
            AND r.dtHora BETWEEN DATEADD(MINUTE, -60, GETDATE()) AND GETDATE()
        ORDER BY dtHora DESC;
        `;

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
        instrucaoSql = `
        SELECT TOP 1 
            registro AS 'cpu', 
            FORMAT(dtHora, 'HH:mm:ss') AS 'hora_min_segundo'
        FROM 
            registro r
        JOIN 
            hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN 
            componente c ON hc.fkComponente = c.idComponente
        JOIN 
            computador pc ON hc.fkComputador = pc.idComputador
        WHERE 
            c.tipo = 'CPU' AND pc.idComputador = ${idMaquina}
        ORDER BY 
            dtHora DESC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT registro AS 'cpu', dthora FROM registro JOIN hasComponente on fkHasComponente = idHasComponente JOIN componente ON fkComponente = idComponente JOIN computador ON fkComputador = idComputador WHERE componente.tipo = 'CPU' AND computador.idComputador = ${idMaquina} ORDER BY dtHora DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardCpuAlertasCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT TOP 1 
        registro AS 'memory', 
        FORMAT(dtHora, 'HH:mm:ss') AS 'hora_min_segundo'
    FROM 
        registro r
    JOIN 
        hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN 
        componente c ON hc.fkComponente = c.idComponente
    JOIN 
        computador pc ON hc.fkComputador = pc.idComputador
    WHERE 
        c.tipo = 'Memoria' AND pc.idComputador = ${idMaquina}
    ORDER BY 
        dtHora DESC;`;
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
        instrucaoSql = `SELECT TOP 1 
        registro AS 'memory', 
        FORMAT(dtHora, 'HH:mm:ss') AS 'hora_min_segundo'
    FROM 
        registro r
    JOIN 
        hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN 
        componente c ON hc.fkComponente = c.idComponente
    JOIN 
        computador pc ON hc.fkComputador = pc.idComputador
    WHERE 
        c.tipo = 'Memoria' AND pc.idComputador = ${idMaquina}
    ORDER BY 
        dtHora DESC;
        `;
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
        instrucaoSql = `SELECT TOP 1 
        registro AS 'disk', 
        FORMAT(dtHora, 'HH:mm:ss') AS 'hora_min_segundo'
    FROM 
        registro r
    JOIN 
        hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN 
        componente c ON hc.fkComponente = c.idComponente
    JOIN 
        computador pc ON hc.fkComputador = pc.idComputador
    WHERE 
        c.tipo = 'Disco' AND pc.idComputador = ${idMaquina}
    ORDER BY 
        dtHora DESC;
        `;
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
        instrucaoSql = `SELECT i.*
        FROM infoComputador i
        JOIN computador c ON i.IpComputador = c.ipComputador
        WHERE c.idComputador = ${idMaquina};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT i.* FROM infoComputador AS i JOIN computador AS c ON i.IpComputador = c.ipComputador AND c.idComputador=${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Individual Leandro

function dashboardMediaCpuDay(idMaquina, days) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR, dtHora, 23) AS [data],
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 1
        AND idComputador = ${idMaquina}
        AND dtHora >= DATEADD(DAY, -${days}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR, dtHora, 23)
    ORDER BY
        [data];`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m-%d') AS 'data',
        AVG(registro) AS 'cpu'
    FROM
        registro
        JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 1
            AND idComputador = ${idMaquina}
            AND dtHora >= CURDATE() - INTERVAL ${days} DAY
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

function dashboardMediaCpuMonth(idMaquina, months) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR(7), dtHora, 120) AS [mes],
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 1
        AND idComputador = ${idMaquina}
        AND dtHora >= DATEADD(MONTH, -${months}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR(7), dtHora, 120)
    ORDER BY
        [mes];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m') AS 'mes',
        AVG(registro) AS 'cpu'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 1
            AND idComputador = ${idMaquina}
            AND dtHora >= CURDATE() - INTERVAL ${months} MONTH
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

function dashboardMediaMemoryDay(idMaquina, days) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR, dtHora, 23) AS [data],
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 2
        AND idComputador = ${idMaquina}
        AND dtHora >= DATEADD(DAY, -${days}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR, dtHora, 23)
    ORDER BY
        [data];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m-%d') AS 'data',
        AVG(registro) AS 'memory'
    FROM
        registro
        JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 2
            AND idComputador = ${idMaquina}
            AND dtHora >= CURDATE() - INTERVAL ${days} DAY
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

function dashboardMediaMemoryMonth(idMaquina, months) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR(7), dtHora, 120) AS [mes],
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 2
        AND idComputador = ${idMaquina}
        AND dtHora >= DATEADD(MONTH, -${months}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR(7), dtHora, 120)
    ORDER BY
        [mes];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m') AS 'mes',
        AVG(registro) AS 'memory'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
        JOIN
            computador ON fkComputador = idComputador
            WHERE fkComponente = 2
            AND idComputador = ${idMaquina}
            AND dtHora >= CURDATE() - INTERVAL ${months} MONTH
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

function getMediaCpuAllDay(idMaquina, days) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR, dtHora, 23) AS [data],
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
    WHERE
        fkComponente = 1
        AND dtHora >= DATEADD(DAY, -${days}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR, dtHora, 23)
    ORDER BY
        [data];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m-%d') AS 'data',
        AVG(registro) AS 'cpu'
    FROM
        registro
    JOIN
        hasComponente ON fkHasComponente = idHasComponente
        WHERE fkComponente = 1
        AND dtHora >= CURDATE() - INTERVAL ${days} DAY
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

function getMediaCpuAllMonth(idMaquina, months) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR(7), dtHora, 120) AS [mes],
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
    WHERE
        fkComponente = 1
        AND dtHora >= DATEADD(MONTH, -${months}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR(7), dtHora, 120)
    ORDER BY
        [mes];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m') AS 'mes',
        AVG(registro) AS 'cpu'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
            WHERE fkComponente = 1
            AND dtHora >= CURDATE() - INTERVAL ${months} MONTH
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

function getMediaMemoryAllDay(idMaquina, days) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR, dtHora, 23) AS [data],
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
    WHERE
        fkComponente = 2
        AND dtHora >= DATEADD(DAY, -${days}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR, dtHora, 23)
    ORDER BY
        [data];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m-%d') AS 'data',
        AVG(registro) AS 'memory'
    FROM
        registro
    JOIN
        hasComponente ON fkHasComponente = idHasComponente
        WHERE fkComponente = 2
        AND dtHora >= CURDATE() - INTERVAL ${days} DAY
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

function getMediaMemoryAllMonth(idMaquina, months) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        CONVERT(VARCHAR(7), dtHora, 120) AS [mes],
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
    WHERE
        fkComponente = 2
        AND dtHora >= DATEADD(MONTH, -${months}, GETDATE())
    GROUP BY
        CONVERT(VARCHAR(7), dtHora, 120)
    ORDER BY
        [mes];
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        DATE_FORMAT(dtHora, '%Y-%m') AS 'mes',
        AVG(registro) AS 'memory'
    FROM
        registro
            JOIN
            hasComponente ON fkHasComponente = idHasComponente
            WHERE fkComponente = 2
            AND dtHora >= CURDATE() - INTERVAL ${months} MONTH
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
        instrucaoSql = `SELECT
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 1
        AND CAST(dtHora AS DATE) = CAST(GETDATE() AS DATE)
        AND idComputador = ${idMaquina}
    GROUP BY
        DAY(dtHora);
    `;
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
        AND idComputador = ${idMaquina}
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
        instrucaoSql = `SELECT
        AVG(registro) AS cpu
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 1
        AND idComputador = ${idMaquina};
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'cpu'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 1
        AND idComputador = ${idMaquina};`;
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
        instrucaoSql = `SELECT
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 2
        AND CAST(dtHora AS DATE) = CAST(GETDATE() AS DATE)
        AND idComputador = ${idMaquina}
    GROUP BY
        DAY(dtHora);
    `;
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
        AND idComputador = ${idMaquina}
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
        instrucaoSql = `SELECT
        AVG(registro) AS memory
    FROM
        registro
        INNER JOIN hasComponente ON fkHasComponente = idHasComponente
        INNER JOIN computador ON fkComputador = idComputador
    WHERE
        fkComponente = 2
        AND idComputador = ${idMaquina};
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
		AVG(registro) AS 'memory'
    FROM registro
    JOIN
		hasComponente ON fkHasComponente = idHasComponente
    JOIN
        computador ON fkComputador = idComputador
		WHERE fkComponente = 2
        AND idComputador = ${idMaquina};`;
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