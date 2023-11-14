DELIMITER $$
	CREATE PROCEDURE spInsertProcesso(vNomeProcesso varchar(50), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = vNomeProcesso AND fkComputador=vfkComputador) THEN
		INSERT INTO processo (nomeProcesso, fkComputador) VALUES (vNomeProcesso, vfkComputador);
    END IF;
    END;
$$

CALL spInsertProcesso('chrome',2);

SELECT * FROM processo WHERE nomeProcesso LIKE 'S%';
