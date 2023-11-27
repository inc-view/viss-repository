
-- Pegando dados para as KPIS
SELECT 
    lf.idligacoesFuncionario,
    lf.recebidas,
    lf.atendidas,
    lf.porcAtendidas,
    lf.abandonadas,
    lf.duracao,
    f.idFuncionario,
    f.nome,
    e.idEmpresa,
    e.razaoSocial
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = ${fkEmpresa};

-- KPI TODAS AS CHAMADAS/AWS
SELECT 
    sum(lf.abandonadas) as chamadasAbandonadas
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = ${fkEmpresa};


-- KPI TEMPO MEDIO DURACAO CHAMADA
SELECT TIME_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(lf.duracao))), '%H:%i:%s') AS tempoMedioDuracao
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = ${fkEmpresa};

-- KPI TEMPO MEDIO DURACAO CHAMADA AWS

SELECT 
    CONVERT(varchar, DATEADD(SECOND, AVG(DATEDIFF(SECOND, '00:00:00', lf.duracao)), '00:00:00'), 108) AS tempoMedioDuracao
FROM ligacoesFuncionario lf
JOIN funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN empresa e ON f.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = 1;

-- TMA DA EMPRESA
SELECT 
    avg((atendidas) / TIME_TO_SEC(duracao)) AS TMA
FROM 
    ligacoesFuncionario lf
JOIN 
    funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN 
    empresa e ON f.fkEmpresa = e.idEmpresa
WHERE 
    e.idEmpresa = ${fkEmpresa};
-- TMA da EMPRESA AWS
SELECT
    AVG(lf.atendidas / 
        (DATEPART(HOUR, lf.duracao)*3600.0 + 
         DATEPART(MINUTE, lf.duracao)*60.0 + 
         DATEPART(SECOND, lf.duracao))) AS TMA
FROM 
    ligacoesFuncionario lf
JOIN 
    funcionario f ON lf.fkFuncionario = f.idFuncionario
JOIN 
    empresa e ON f.fkEmpresa = e.idEmpresa
WHERE 
    e.idEmpresa = ${fkEmpresa};



    -- lista com TMA


    SELECT
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total,
    IFNULL(lf.atendidas / NULLIF(TIME_TO_SEC(lf.duracao), 0), 0) AS TMA
FROM 
    funcionario f
JOIN 
    ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE 
    f.fkEmpresa = $(fkEmpresa)
ORDER BY 
    lf.atendidas DESC;

-- LISTA COM TMA AWS

SELECT
    f.nome AS nome_funcionario,
    lf.recebidas AS chamadas_recebidas,
    lf.atendidas AS chamadas_atendidas,
    lf.porcAtendidas AS porcentagem_atendidas,
    lf.abandonadas AS chamadas_abandonadas,
    lf.duracao AS duracao_total,
    AVG(lf.atendidas / 
        (DATEPART(HOUR, CAST(lf.duracao AS DATETIME))*3600.0 + 
         DATEPART(MINUTE, CAST(lf.duracao AS DATETIME))*60.0 + 
         DATEPART(SECOND, CAST(lf.duracao AS DATETIME)))) AS TMA
FROM 
    funcionario f
JOIN 
    ligacoesFuncionario lf ON f.idFuncionario = lf.fkFuncionario
WHERE 
    f.fkEmpresa = ${fkEmpresa}
GROUP BY
    f.nome,
    lf.recebidas,
    lf.atendidas,
    lf.porcAtendidas,
    lf.abandonadas,
    lf.duracao
ORDER BY 
    lf.atendidas DESC;


