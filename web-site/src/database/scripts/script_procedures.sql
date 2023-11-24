-- Indices para deixar mais leve os Selects
CREATE INDEX idx_idComputador ON computador (idComputador);
CREATE INDEX idx_fkComputador ON processo (fkComputador);
CREATE INDEX idx_fkFuncionario ON computador (fkFuncionario);
CREATE INDEX idx_fkProcesso ON registroProcesso (fkProcesso);     
CREATE INDEX idx_fkHasComponente ON registroProcesso (fkHasComponente);
CREATE INDEX idx_fkComponente ON hasComponente (fkComponente);         
CREATE INDEX idx_fkUnidadeMedida ON componente (fkUnidadeMedida);  


-- Cadastro dos processos
DELIMITER $$
	CREATE PROCEDURE spInsertProcesso(vNomeProcesso varchar(350), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = vNomeProcesso AND fkComputador=vfkComputador) THEN
		INSERT INTO processo (nomeProcesso, fkComputador) VALUES (vNomeProcesso, vfkComputador);
    END IF;
    END;
$$


-- Cadastro dos processos ilícitos encontrados através do Java >>> NOVO!!!
DELIMITER $$
	CREATE PROCEDURE spInsertRegistroIlicito(vNomeProcesso varchar(150), vfkPc int)
    BEGIN
    INSERT INTO processoIlicito (fkSoftware, dataHora) VALUES ((SELECT idSoftwarePermitido FROM 
		softwarePermitido AS sp JOIN software AS s 
        ON sp.fkSoftware = s.idSoftware WHERE s.nomeSoftware = vNomeProcesso AND sp.fkComputador = vfkPc),now());
	END;
$$


-- Cadastro dos registros (CPU e RAM) dos processos
DELIMITER //
CREATE PROCEDURE spInsertRegistroProcesso(vNomeProcesso varchar(255), vfkComputador int, dadoCPU float, dadoRAM float)
BEGIN
    DECLARE id INT;
    DECLARE idCpu INT;
    DECLARE idRam INT;

    SELECT idProcesso INTO id
    FROM processo
    WHERE nomeProcesso LIKE CONCAT('%', vNomeProcesso, '%') and fkComputador = vfkComputador;
    
    SELECT cpu, ram INTO idCpu, idRam
    FROM vwIdComponenteComputador
    WHERE idComputador = vfkComputador;


    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (round(dadoCPU, 2), id, idCpu, now());
    
    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (round(dadoRAM, 2), id, idRam, now());
END //
DELIMITER ;


-- TRIGGER: Relacionando os softwares bloqueados com os funcionários.
DELIMITER //
CREATE TRIGGER insere_softwarePermitidos
AFTER INSERT ON software
FOR EACH ROW
BEGIN
    INSERT INTO softwarePermitido (bloquado, fkSoftware, fkComputador) VALUES 
     (false, NEW.idSoftware, 1),
     (false, NEW.idSoftware, 2),
     (false, NEW.idSoftware, 3),
     (false, NEW.idSoftware, 4);
END;
//
DELIMITER ;


-- TRIGGER: Registras os componentes para um novo computador identificado
DELIMITER //
CREATE TRIGGER insere_hasComputadores
AFTER INSERT ON computador
FOR EACH ROW
BEGIN
    INSERT INTO hasComponente (fkComponente, fkComputador) VALUES 
     (1, NEW.idComputador),
     (2, NEW.idComputador),
     (3, NEW.idComputador),
     (4, NEW.idComputador),
     (5, NEW.idComputador);
END;
//
DELIMITER ;


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
