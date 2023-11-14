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

DELIMITER $$
	CREATE PROCEDURE spInsertRegistroIlicito(vNomeProcesso varchar(50), vfkPc int)
    BEGIN
    INSERT INTO ilicitoRegistro (fkProcessoIlicito, dtHora) VALUES ((SELECT idProcessoIlicito FROM 
		processoIlicito AS ilic JOIN processo AS p 
        ON p.idProcesso = ilic.fkProcesso WHERE p.nomeProcesso = vNomeProcesso AND p.fkComputador = vfkPc),now());
	END;
$$
CALL spInsertRegistroIlicito('Whatsapp', 4);
