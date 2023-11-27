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
    ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;`;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT ROUND(AVG(registro), 0)
    FROM (
        SELECT 
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
            JOIN empresa ON fkEmpresa = idEmpresa
            WHERE componente.tipo = 'PPM' AND idEmpresa = ${fkEmpresa} AND dtHora >= DATEADD(MINUTE, -5, GETDATE())
            GROUP BY fkHasComponente
        ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data
    ) AS maxdatacomp;`;
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
            WHERE componente.tipo = 'PPM' AND idEmpresa = ${fkEmpresa} AND dtHora >= NOW() - INTERVAL 5 MINUTE
            GROUP BY fkHasComponente
        ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
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
    WHERE c.tipo = 'PPM' AND idEmpresa = ${fkEmpresa} AND lf.atendidas = (
        SELECT MAX(atendidas)
        FROM ligacoesFuncionario
      );`;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT ROUND(AVG(r.registro), 0) AS media_ppm
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador ON fkComputador = idComputador
    JOIN funcionario ON fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM' 
        AND idEmpresa = ${fkEmpresa}
        AND lf.atendidas = (
            SELECT MAX(atendidas)
            FROM ligacoesFuncionario
            WHERE fkFuncionario = funcionario.idFuncionario
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
        WHERE c.tipo = 'PPM' AND idEmpresa = ${fkEmpresa} AND lf.atendidas = (
            SELECT MAX(atendidas)
            FROM ligacoesFuncionario
          );`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
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
    WHERE e.idEmpresa = ${fkEmpresa};`;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT SUM(lf.atendidas) AS total_ligacoes_dia
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    JOIN empresa e ON f.fkEmpresa = e.idEmpresa
    WHERE e.idEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = ` SELECT SUM(lf.atendidas) AS total_ligacoes_dia
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        JOIN empresa e ON f.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${fkEmpresa};`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atendimentoIdeal(valor) {
  var fkEmpresa = valor;

  instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa};`;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
    FROM ligacoesFuncionario lf
    JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
        FROM ligacoesFuncionario lf
        JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
        WHERE f.fkEmpresa = ${fkEmpresa};`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoProdutividade(valor) {
  var fkEmpresa = valor;

  instrucaoSql = `SELECT 
    horas.hora_do_dia,
    COALESCE(round(AVG(r.registro), 0), 0) AS media_registro_PPM
FROM (
    SELECT 0 AS hora_do_dia
    UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION 
    SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION 
    SELECT 21 UNION SELECT 22 UNION SELECT 23
) horas
LEFT JOIN (
    SELECT 
        DATE_FORMAT(r.dtHora, '%H') AS hora_do_dia,
        r.registro
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador ON fkComputador = idComputador
    JOIN funcionario ON fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM'
      AND funcionario.fkEmpresa = ${fkEmpresa}
      AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
) r ON horas.hora_do_dia = r.hora_do_dia
GROUP BY horas.hora_do_dia
ORDER BY horas.hora_do_dia;`;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
    horas.hora_do_dia,
    COALESCE(ROUND(AVG(r.registro), 0), 0) AS media_registro_PPM
FROM (
    VALUES (0), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13), (14), (15), (16), (17), (18), (19), (20), (21), (22), (23)
) AS horas(hora_do_dia)
LEFT JOIN (
    SELECT 
        DATEPART(HOUR, r.dtHora) AS hora_do_dia,
        r.registro
    FROM registro r
    JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    JOIN componente c ON hc.fkComponente = c.idComponente
    JOIN computador ON fkComputador = idComputador
    JOIN funcionario ON fkFuncionario = idFuncionario
    JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
    JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM'
      AND funcionario.fkEmpresa = ${fkEmpresa}
      AND CONVERT(DATE, r.dtHora) = CONVERT(DATE, GETDATE()) -- Filtra os registros para o dia de hoje
) r ON horas.hora_do_dia = r.hora_do_dia
GROUP BY horas.hora_do_dia
ORDER BY horas.hora_do_dia;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT 
        horas.hora_do_dia,
        COALESCE(round(AVG(r.registro), 0), 0) AS media_registro_PPM
    FROM (
        SELECT 0 AS hora_do_dia
        UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
        SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
        SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION 
        SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION 
        SELECT 21 UNION SELECT 22 UNION SELECT 23
    ) horas
    LEFT JOIN (
        SELECT 
            DATE_FORMAT(r.dtHora, '%H') AS hora_do_dia,
            r.registro
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente c ON hc.fkComponente = c.idComponente
        JOIN computador ON fkComputador = idComputador
        JOIN funcionario ON fkFuncionario = idFuncionario
        JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
        JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
        WHERE c.tipo = 'PPM'
          AND funcionario.fkEmpresa = ${fkEmpresa}
          AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
    ) r ON horas.hora_do_dia = r.hora_do_dia
    GROUP BY horas.hora_do_dia
    ORDER BY horas.hora_do_dia;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fazerListaInfoFuncionario(valor) {
  var fkEmpresa = valor;
  instrucaoSql = `SELECT 
  f.nome AS nome_funcionario,
  lf.recebidas AS chamadas_recebidas,
  lf.atendidas AS chamadas_atendidas,
  lf.porcAtendidas AS porcentagem_atendidas,
  lf.abandonadas AS chamadas_abandonadas,
  lf.duracao AS duracao_total
FROM funcionario f
JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE f.fkEmpresa = ${fkEmpresa}
ORDER BY lf.atendidas DESC LIMIT 5;`;


  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT TOP 5
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total
FROM funcionario f
JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE f.fkEmpresa = 1
ORDER BY lf.atendidas DESC;`;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT 
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total
FROM funcionario f
JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE f.fkEmpresa = ${fkEmpresa}
ORDER BY lf.atendidas DESC LIMIT 5;`;

  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  ppmAtual,
  ppmIdeal,
  atendimentoAtual,
  atendimentoIdeal,
  graficoProdutividade,
  fazerListaInfoFuncionario
};
