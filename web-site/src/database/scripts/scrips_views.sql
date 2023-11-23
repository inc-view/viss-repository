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
    
DELIMITER //

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