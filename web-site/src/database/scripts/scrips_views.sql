use inkView;
-- CRIAÇÃO DA VIEW DOS REGISTROS EM TABELA
CREATE VIEW tabelaRegistros AS
    SELECT 
         registro . registro  AS  Registro ,
         registro . dtHora  AS  MomentoRegistro ,
         componente . tipo  AS  Componente ,
         unidademedida .tipoMedida AS Simbolo,
        hasComponente.idHasComponente AS idHasComponente,
        computador.idComputador AS idComputador
    FROM
        registro
            JOIN
        hasComponente ON fkHasComponente = idHasComponente
            JOIN
        computador ON fkComputador = idComputador
            JOIN
        componente ON fkComponente = idComponente
            JOIN
        unidadeMedida ON fkUnidadeMedida = idUnidadeMedida
    ORDER BY registro.dtHora
    LIMIT 1000;

-- VIEW DE INFORMAÇÕES DO COMPUTADOR
CREATE VIEW infoComputador AS
SELECT 
    f.nome AS `NomeFuncionario`,
    c.ipComputador AS `IpComputador`,
    c.ativo AS `Status`,
    c.marca AS `MarcaComputador`,
    c.sistemaOperacional AS `SistemaOperacional`,
    computador.idComputador AS `IdComputador`,
    (
        SELECT MAX(r.dtHora)
        FROM registro r
        WHERE r.fkHasComponente IN (
            SELECT hc.idHasComponente
            FROM hasComponente hc
            WHERE hc.fkComputador = c.idComputador
        )
    ) AS `UltimaSessao`,
    (
        SELECT r.registro
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente comp ON hc.fkComponente = comp.idComponente
        WHERE comp.tipo = 'CPU' AND r.dtHora = (
            SELECT MAX(r2.dtHora)
            FROM registro r2
            JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
            WHERE hc2.fkComputador = c.idComputador
            AND comp.tipo = 'CPU'
        )
        LIMIT 1
    ) AS `PorcentagemCPU`
FROM computador c
JOIN funcionario f ON c.fkFuncionario = f.idFuncionario;
        
-- CRIÇÃO DA TRIGGER DE HASCOMPONENTES DOS COMPUTADORES
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


CREATE VIEW vwIdComponenteComputador AS
select 
	ipComputador,
	cpu1.idHasComponente as 'cpu',
	ram1.idHasComponente as 'ram',
    disco1.idHasComponente as 'disco'
from computador pc
	join hasComponente cpu1 on cpu1.fkComputador = pc.idComputador
    join hasComponente ram1 on ram1.fkComputador = pc.idComputador
    join hasComponente disco1 on disco1.fkComputador = pc.idComputador
		 join componente c on c.idComponente = cpu1.fkComponente
         join componente c1 on c1.idComponente = ram1.fkComponente
         join componente c2 on c2.idComponente = disco1.fkComponente
			join unidadeMedida u on u.idUnidadeMedida = c1.fkUnidadeMedida
				where c.tipo = 'CPU' 
                and  c2.tipo = 'Disco' 
                and c1.tipo = 'Memoria' 
                and u.tipoMedida = '%';


/*
-- VISUALIZAÇÃO DOS REGISTROS DE FORMA DINÂMICA
SET @sql = NULL; -- Criando uma variável para armazenar o comando
SELECT 
    GROUP_CONCAT(DISTINCT CONCAT('max(case when Componente = \'',
                Componente,
                '\' then Registro end) ',
                Componente))
INTO @sql FROM
    tabelaRegistros; -- Aqui vem o nome da sua view!

select @sql;

SET @sql = CONCAT('SELECT idComputador, MomentoRegistro, ', @sql, '
                 
FROM tabelaRegistros
                   
GROUP BY idComputador, MomentoRegistro'); -- Lembra de trocar as informações (idServidor, MomentoRegistro, tabelaRegistros) pelos nomes que você usou na view

select @sql;

PREPARE stmt FROM @sql; -- Prepara um statement para executar o comando guardado na variável @sql

EXECUTE stmt; -- Executa o statement
*/

DELIMITER //
select * from funcionario;
CREATE PROCEDURE spInsertRegistroProcesso(vNomeProcesso varchar(255), vfkComputador int, dado float)
BEGIN
    -- Declare variáveis para armazenar os resultados do SELECT
    DECLARE id INT;

    -- Selecione os dados desejados
    SELECT idProcesso INTO id
    FROM processo
    WHERE nomeProcesso LIKE CONCAT('%', vNomeProcesso, '%') and fkComputador = vfkComputador;

    -- Faça a inserção com base nos resultados do SELECT
    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (dado, id, 1, now());

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



CREATE INDEX idx_idComputador ON computador (idComputador);
CREATE INDEX idx_fkComputador ON processo (fkComputador);
CREATE INDEX idx_fkFuncionario ON computador (fkFuncionario);
CREATE INDEX idx_fkProcesso ON registroProcesso (fkProcesso);     
CREATE INDEX idx_fkHasComponente ON registroProcesso (fkHasCompoennte);
CREATE INDEX idx_fkComponente ON hasComponente (fkComponente);         
CREATE INDEX idx_fkUnidadeMedida ON componente (fkUnidadeMedida);  


-- View que lista tudo
create view listProcessData as
SELECT
    f.fkEmpresa,
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END) AS 'cpu',
    AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END) AS 'ram',
    TIMEDIFF(MAX(r.dataHora), MIN(r.dataHora)) AS 'horas_uso'
FROM processo p
	JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
	JOIN hasComponente hc on hc.idHasComponente = r.fkHasComponente
	JOIN componente c on c.idComponente = hc.fkComponente
	JOIN computador pc ON pc.idComputador = p.fkComputador
	JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
		GROUP BY f.fkEmpresa, r.fkProcesso, p.nomeProcesso;


  
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