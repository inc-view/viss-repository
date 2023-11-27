
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

-- KPI TODAS AS CHAMADAS 
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




