
CREATE INDEX idx_idComputador ON computador (idComputador);
CREATE INDEX idx_fkComputador ON processo (fkComputador);
CREATE INDEX idx_fkFuncionario ON computador (fkFuncionario);
CREATE INDEX idx_fkProcesso ON registroProcesso (fkProcesso);     
CREATE INDEX idx_fkHasComponente ON registroProcesso (fkHasCompoennte);
CREATE INDEX idx_fkComponente ON hasComponente (fkComponente);         
CREATE INDEX idx_fkUnidadeMedida ON componente (fkUnidadeMedida);  



-- View que lista tudo
create view listDataOneProcess as
SELECT
	f.fkEmpresa,
	day(r.dataHora) as 'dia',
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    round(AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END), 2) AS 'cpu',
    round(AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END),2) AS 'ram',
    TIMEDIFF(MAX(time(r.dataHora)), MIN(time(r.dataHora))) AS 'horas_uso'
FROM processo p
	JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
	JOIN hasComponente hc on hc.idHasComponente = r.fkHasComponente
	JOIN componente c on c.idComponente = hc.fkComponente
	JOIN computador pc ON pc.idComputador = p.fkComputador
	JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
		where day(r.dataHora) between day(r.dataHora) - 7 and day(now())
			and month(now())
			GROUP BY r.fkProcesso, day(r.dataHora), f.fkEmpresa;
  
  
  
  
-- View que lista por dia
drop view listDataOneProcess;
create view listDataOneProcess as
SELECT
	day(r.dataHora) as 'dia',
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    round(AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END), 2) AS 'cpu',
    round(AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END),2) AS 'ram',
    TIMEDIFF(MAX(r.dataHora), MIN(r.dataHora)) AS 'horas_uso'
FROM processo p
	JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
	JOIN hasComponente hc on hc.idHasComponente = r.fkHasComponente
	JOIN componente c on c.idComponente = hc.fkComponente
	JOIN computador pc ON pc.idComputador = p.fkComputador
	JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
		where day(r.dataHora) between day(r.dataHora) - 7 and day(now())
			and month(now())
			GROUP BY r.fkProcesso, day(r.dataHora);




DELIMITER $$
	CREATE PROCEDURE spInsertProcesso(vNomeProcesso varchar(255), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = vNomeProcesso AND fkComputador=vfkComputador) THEN
		INSERT INTO processo (nomeProcesso, fkComputador) VALUES (vNomeProcesso, vfkComputador);
    END IF;
    END;
$$




DELIMITER $$
	CREATE PROCEDURE spInsertProcesso(vNomeProcesso varchar(255), vfkComputador int)
    BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = vNomeProcesso AND fkComputador=vfkComputador) THEN
		INSERT INTO processo (nomeProcesso, fkComputador) VALUES (vNomeProcesso, vfkComputador);
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




DELIMITER $$
	CREATE PROCEDURE spInsertRegistroIlicito(vNomeProcesso varchar(150), vfkPc int)
    BEGIN
    INSERT INTO processoIlicito (fkSoftware, dtHora) VALUES ((select idProcesso from processo
		WHERE nomeProcesso like CONCAT('%', vNomeProcesso, '%') AND fkComputador = vfkPc), now());
	END;	
$$
DELIMITER ;