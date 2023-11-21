DELIMITER $$
	CREATE PROCEDURE spInsertProcesso(vNomeProcesso varchar(350), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = vNomeProcesso AND fkComputador=vfkComputador) THEN
		INSERT INTO processo (nomeProcesso, fkComputador) VALUES (vNomeProcesso, vfkComputador);
    END IF;
    END;
$$

SELECT * FROM processo WHERE nomeProcesso LIKE 'S%';

DELIMITER $$
	CREATE PROCEDURE spInsertRegistroIlicito(vNomeProcesso varchar(150), vfkPc int)
    BEGIN
    INSERT INTO processoIlicito (fkSoftware, dataHora) VALUES ((SELECT idSoftwarePermitido FROM 
		softwarePermitido AS sp JOIN software AS s 
        ON sp.fkSoftware = s.idSoftware WHERE s.nomeSoftware = vNomeProcesso AND sp.fkComputador = vfkPc),now());
	END;
$$

DROP PROCEDURE spInsertRegistroIlicito('Whatsapp', 4);

DELIMITER $$
	CREATE PROCEDURE spInsertProcessoIlicito(vNomeProcesso varchar(50), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT procI.fkProcesso FROM processoIlicito AS procI 
    JOIN processo AS p ON procI.fkProcesso = p.idProcesso WHERE p.nomeProcesso = vNomeProcesso AND p.fkComputador=vfkComputador) THEN
		INSERT INTO processoIlicito (fkProcesso) VALUES ((SELECT idProcesso FROM Processo WHERE nomeProcesso = vNomeProcesso));
    END IF;
    END;
$$

DELIMITER //
CREATE PROCEDURE spInsertRegistroProcesso(vNomeProcesso varchar(255), vfkComputador int, dadoCPU float, dadoRAM float)
BEGIN
    -- Declare variáveis para armazenar os resultados do SELECT
    DECLARE id INT;
    DECLARE idCpu INT;
    DECLARE idRam INT;

    -- Selecione os dados desejados
    SELECT idProcesso INTO id
    FROM processo
    WHERE nomeProcesso LIKE CONCAT('%', vNomeProcesso, '%') and fkComputador = vfkComputador;
    
    SELECT cpu, ram INTO idCpu, idRam
    FROM vwIdComponenteComputador
    WHERE idComputador = vfkComputador;


    -- Faça a inserção com base nos resultados do SELECT
    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (round(dadoCPU, 2), id, idCpu, now());
    
    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (round(dadoRAM, 2), id, idRam, now());

END //

DELIMITER ;

-- Apos inserir em softawre
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


