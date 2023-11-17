var database = require("../database/config");

function ppmAtual(valor) {
    var fkEmpresa = valor;

    instrucaoSql = `SELECT round(AVG(registro), 0) from
    (SELECT 
        t1.fkHasComponente,
        t1.registro,
        t1.dtHora
    FROM registro t1
    JOIN (
        SELECT 
            fkHasComponente,
            MAX(dtHora) AS maior_data
        FROM registro
        JOIN hasComponente ON fkHasComponente = idHasComponente
        JOIN componente ON fkComponente = idComponente
        JOIN computador ON fkComputador = idComputador
        JOIN funcionario ON fkFuncionario = idFuncionario
        join empresa on fkEmpresa = idEmpresa
        WHERE componente.tipo = 'PPM' AND idEmpresa = ${fkEmpresa} AND dtHora >= NOW() - INTERVAL 5 MINUTE
        GROUP BY fkHasComponente
    ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;`

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT round(AVG(registro), 0) from
        (SELECT 
            t1.fkHasComponente,
            t1.registro,
            t1.dtHora
        FROM registro t1
        JOIN (
            SELECT 
                fkHasComponente,
                MAX(dtHora) AS maior_data
            FROM registro
            JOIN hasComponente ON fkHasComponente = idHasComponente
            JOIN componente ON fkComponente = idComponente
            JOIN computador ON fkComputador = idComputador
            JOIN funcionario ON fkFuncionario = idFuncionario
            join empresa on fkEmpresa = idEmpresa
            WHERE componente.tipo = 'PPM' AND idEmpresa = ${valor} AND dtHora >= NOW() - INTERVAL 5 MINUTE
            GROUP BY fkHasComponente
        ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT round(AVG(registro), 0) from
        (SELECT 
            t1.fkHasComponente,
            t1.registro,
            t1.dtHora
        FROM registro t1
        JOIN (
            SELECT 
                fkHasComponente,
                MAX(dtHora) AS maior_data
            FROM registro
            JOIN hasComponente ON fkHasComponente = idHasComponente
            JOIN componente ON fkComponente = idComponente
            JOIN computador ON fkComputador = idComputador
            JOIN funcionario ON fkFuncionario = idFuncionario
            join empresa on fkEmpresa = idEmpresa
            WHERE componente.tipo = 'PPM' AND idEmpresa = ${valor} AND dtHora >= NOW() - INTERVAL 5 MINUTE
            GROUP BY fkHasComponente
        ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ppmIdeal(valor) {
    var fkEmpresa = valor;

    instrucaoSql = `SELECT round(AVG(r.registro), 0) AS media_ppm
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador on fkComputador = idComputador
    JOIN funcionario on fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM' AND idEmpresa = 1 AND lf.atendidas = (
        SELECT MAX(atendidas)
        FROM ligacoesFuncionario
      );`

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT round(AVG(r.registro), 0) AS media_ppm
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente c ON hc.fkComponente = c.idComponente
        JOIN computador on fkComputador = idComputador
        JOIN funcionario on fkFuncionario = idFuncionario
        JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
        JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
        WHERE c.tipo = 'PPM' AND idEmpresa = 1 AND lf.atendidas = (
            SELECT MAX(atendidas)
            FROM ligacoesFuncionario
          );`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT round(AVG(r.registro), 0) AS media_ppm
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente c ON hc.fkComponente = c.idComponente
        JOIN computador on fkComputador = idComputador
        JOIN funcionario on fkFuncionario = idFuncionario
        JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
        JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
        WHERE c.tipo = 'PPM' AND idEmpresa = 1 AND lf.atendidas = (
            SELECT MAX(atendidas)
            FROM ligacoesFuncionario
          );`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atendimentoAtual(valor) {
    var fkEmpresa = valor;

    instrucaoSql = ` SELECT SUM(lf.atendidas) AS total_ligacoes_dia
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    JOIN empresa e ON f.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = 1;`

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT SUM(lf.atendidas) AS total_ligacoes_dia
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        JOIN empresa e ON f.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 1;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT SUM(lf.atendidas) AS total_ligacoes_dia
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        JOIN empresa e ON f.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 1;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atendimentoIdeal(valor) {
    var fkEmpresa = valor;

    instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = 1;`

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        WHERE f.fkEmpresa = 1;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        WHERE f.fkEmpresa = 1;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoProdutividade(valor) {
    var fkEmpresa = valor;

    instrucaoSql = `SELECT 
    DATE_FORMAT(r.dtHora, '%H') AS hora_do_dia,
    AVG(r.registro) AS media_registro_PPM
FROM registro r
JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
JOIN componente c ON hc.fkComponente = c.idComponente
JOIN computador on fkComputador = idComputador
JOIN funcionario on fkFuncionario = idFuncionario
JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
WHERE c.tipo = 'PPM'
  AND funcionario.fkEmpresa = 1
  AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
GROUP BY hora_do_dia
ORDER BY hora_do_dia;`

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        DATE_FORMAT(r.dtHora, '%H') AS hora_do_dia,
        AVG(r.registro) AS media_registro_PPM
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador on fkComputador = idComputador
    JOIN funcionario on fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM'
      AND funcionario.fkEmpresa = 1
      AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
    GROUP BY hora_do_dia
    ORDER BY hora_do_dia;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        DATE_FORMAT(r.dtHora, '%H') AS hora_do_dia,
        AVG(r.registro) AS media_registro_PPM
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador on fkComputador = idComputador
    JOIN funcionario on fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM'
      AND funcionario.fkEmpresa = 1
      AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
    GROUP BY hora_do_dia
    ORDER BY hora_do_dia;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    ppmAtual,
    ppmIdeal,
    atendimentoAtual,
    atendimentoIdeal,
    graficoProdutividade
}