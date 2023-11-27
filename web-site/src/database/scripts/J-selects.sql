-- SELECTS MYSQL WORKBENCH
-- Select para PPM IDEAL E PPM ATUAL
-- PPM ATUAL
SELECT round(AVG(registro), 0) from
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
    WHERE componente.tipo = 'PPM' AND idEmpresa = 1 AND dtHora >= NOW() - INTERVAL 5 MINUTE
    GROUP BY fkHasComponente
) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data) AS maxdatacomp;

-- PPM Ideal
SELECT round(AVG(r.registro), 0) AS media_ppm
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
  );

 -- qtd atendimentos no dia
 SELECT SUM(lf.atendidas) AS total_ligacoes_dia
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = 1;

 -- meta atendimentos no dia
SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
WHERE f.fkEmpresa = 1;

-- INFORMAÇÕES LISTA DE FUNCIONARIOS
SELECT 
    ID,
    NOME,
    COALESCE(SUM(CASE WHEN ABANDONADAS IS NOT NULL THEN ABANDONADAS ELSE 0 END), 0) AS 'ABANDONADAS',
    COALESCE(SUM(CASE WHEN ATENDIDAS IS NOT NULL THEN ATENDIDAS ELSE 0 END), 0) AS 'ATENDIDAS',
    SEC_TO_TIME(COALESCE(SUM(TIME_TO_SEC(DURACAO)), 0)) AS 'DURACAO'
FROM (
    SELECT 
        f.idFuncionario AS ID,
        f.nome AS NOME,
        lf.abandonadas AS ABANDONADAS,
        lf.atendidas AS ATENDIDAS,
        lf.duracao AS DURACAO,
        ROW_NUMBER() OVER (ORDER BY lf.atendidas DESC) AS rn
    FROM funcionario f
    LEFT JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
    WHERE f.fkEmpresa = 1
) AS FuncionariosNumerados
WHERE rn <= 5
GROUP BY ID, NOME;

-- INFORMAÇÕES FUNCIONARIO PARA MATRIZ
SELECT 
    lf.idligacoesFuncionario,
    lf.recebidas,
    lf.atendidas,
    lf.porcAtendidas,
    lf.abandonadas,
    TIME_TO_SEC(lf.duracao) AS duracao_em_segundos
FROM ligacoesFuncionario lf
WHERE lf.fkFuncionario = 1;

-- QUERY PARA O GRÁFICO DE PRODUTIVIDADE
SELECT 
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
      AND funcionario.fkEmpresa = 1
      AND DATE(r.dtHora) = CURDATE() -- Filtra os registros para o dia de hoje
) r ON horas.hora_do_dia = r.hora_do_dia
GROUP BY horas.hora_do_dia
ORDER BY horas.hora_do_dia;

-- QUERY PARA PRODUTIVIDADE EM TEMPO REAL
SELECT 
    AVG(r.registro) AS media_registro_PPM
FROM (
    SELECT MAX(reg.registro) / COUNT(funcionario.idFuncionario) AS registro
    FROM registro reg
JOIN hasComponente hc ON reg.fkHasComponente = hc.idHasComponente
JOIN componente c ON hc.fkComponente = c.idComponente
JOIN computador on fkComputador = idComputador
JOIN funcionario on fkFuncionario = idFuncionario
JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
    WHERE c.tipo = 'PPM'
      AND funcionario.fkEmpresa = 1
      AND reg.dtHora >= NOW() - INTERVAL 5 MINUTE
    ORDER BY reg.dtHora DESC
    LIMIT 500 -- Limita para os últimos 500 registros dos últimos 5 minutos
) r;

-- QUERY PARA LISTA DE INFORMACOES DO FUNCIONARIO
SELECT 
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total
FROM funcionario f
JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE f.fkEmpresa = 1
ORDER BY lf.atendidas DESC LIMIT 5; -- Substitua 1 pelo ID da empresa desejada


-- SELECTS MYSQL SERVER
-- Select para PPM IDEAL E PPM ATUAL
-- PPM ATUAL
SELECT ROUND(AVG(registro), 0)
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
        WHERE componente.tipo = 'PPM' AND idEmpresa = 1 AND dtHora >= DATEADD(MINUTE, -5, GETDATE())
        GROUP BY fkHasComponente
    ) t2 ON t1.fkHasComponente = t2.fkHasComponente AND t1.dtHora = t2.maior_data
) AS maxdatacomp;


-- PPM IDEAL
SELECT ROUND(AVG(r.registro), 0) AS media_ppm
FROM registro r
JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
JOIN componente c ON hc.fkComponente = c.idComponente
JOIN computador ON fkComputador = idComputador
JOIN funcionario ON fkFuncionario = idFuncionario
JOIN ligacoesFuncionario lf ON lf.fkFuncionario = funcionario.idFuncionario
JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa
WHERE c.tipo = 'PPM' 
    AND idEmpresa = 1 
    AND lf.atendidas = (
        SELECT MAX(atendidas)
        FROM ligacoesFuncionario
        WHERE fkFuncionario = funcionario.idFuncionario
    );


-- ATENDIMENTO ATUAL
SELECT SUM(lf.atendidas) AS total_ligacoes_dia
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = 1;

-- ATENDIMENTO IDEAL
SELECT (SELECT COUNT(*) FROM funcionario WHERE fkEmpresa = 1) * MAX(lf.atendidas) AS total_ligacoes_atendidas
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
WHERE f.fkEmpresa = 1;

-- INFORMAÇÕES LISTA DE FUNCIONARIOS
SELECT 
    ID,
    NOME,
    COALESCE(SUM(CASE WHEN ABANDONADAS IS NOT NULL THEN ABANDONADAS ELSE 0 END), 0) AS 'ABANDONADAS',
    COALESCE(SUM(CASE WHEN ATENDIDAS IS NOT NULL THEN ATENDIDAS ELSE 0 END), 0) AS 'ATENDIDAS',
    CONVERT(VARCHAR(8), DATEADD(SECOND, COALESCE(SUM(DATEDIFF(SECOND, '00:00:00', DURACAO)), 0), '1900-01-01'), 108) AS 'DURACAO'
FROM (
    SELECT 
        f.idFuncionario AS ID,
        f.nome AS NOME,
        lf.abandonadas AS ABANDONADAS,
        lf.atendidas AS ATENDIDAS,
        lf.duracao AS DURACAO,
        ROW_NUMBER() OVER (ORDER BY lf.atendidas DESC) AS rn
    FROM funcionario f
    LEFT JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
    WHERE f.fkEmpresa = 1
) AS FuncionariosNumerados
WHERE rn <= 5
GROUP BY ID, NOME;

-- LISTA FUNCIONÁRIOS
SELECT TOP 5
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total
FROM funcionario f
JOIN ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE f.fkEmpresa = 1
ORDER BY lf.atendidas DESC;

-- GRÁFICO DE PRODUTIVIDADE
SELECT 
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
      AND funcionario.fkEmpresa = 1
      AND CONVERT(DATE, r.dtHora) = CONVERT(DATE, GETDATE()) -- Filtra os registros para o dia de hoje
) r ON horas.hora_do_dia = r.hora_do_dia
GROUP BY horas.hora_do_dia
ORDER BY horas.hora_do_dia;
