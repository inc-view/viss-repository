-- view para o primeiro gráfico
DELIMITER $$
CREATE PROCEDURE spSelectGraf1(vFkEmpresa int)
BEGIN
	SELECT count(dataHora) as contagem, DATE_FORMAT(dataHora, '%d/%m/%Y') AS 'data_hora' FROM processoIlicito AS p
    JOIN softwarePermitido AS sp ON sp.idSoftwarePermitido = p.fkSoftware 
    JOIN software AS s ON s.idSoftware = sp.fkSoftware 
    JOIN computador AS c ON sp.fkComputador = c.idComputador 
    JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario
    JOIN empresa AS e ON f.fkEmpresa = e.idEmpresa
    WHERE f.fkEmpresa = vFkEmpresa
    GROUP BY p.dataHora
    ORDER BY p.dataHora;
END;
$$    
    
-- KPI dos processos que mais tentaram acessar (de todo o tempo)
DELIMITER $$
CREATE PROCEDURE spSelectGraf1(vFkEmpresa int)
BEGIN
	SELECT count(p.dataHora) AS contagem, s.nomeSoftware FROM processoIlicito AS p 
	JOIN softwarePermitido AS sp ON sp.idSoftwarePermitido = p.fkSoftware 
    JOIN software AS s ON s.idSoftware = sp.fkSoftware 
    JOIN computador AS c ON sp.fkComputador = c.idComputador 
    JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario
    JOIN empresa AS e ON f.fkEmpresa = e.idEmpresa
    WHERE f.fkEmpresa = vFkEmpresa
    GROUP BY s.nomeSoftware ORDER BY contagem DESC LIMIT 3;
END;
DELIMITER $$
