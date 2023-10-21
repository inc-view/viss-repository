use inkView;
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

-- VIEW DE INFORMAÇÕES DO COMPUTADOR
CREATE VIEW infoComputador AS
    SELECT 
        computador.ativo AS `Status`,
        funcionario.nome AS `NomeFuncionario`,
        computador.marca AS `MarcaComputador`,
        computador.sistemaOperacional AS `SistemaOperacional`,
        computador.ipComputador AS `IpComputador`
    FROM
        computador
            JOIN
        funcionario ON fkFuncionario = idFuncionario;
        
	
DELIMITER //

CREATE TRIGGER insere_hasComputadores
AFTER INSERT ON computador
FOR EACH ROW
BEGIN
    INSERT INTO hasComponente (fkComponente, fkComputador) VALUES 
     (1, NEW.idComputador),
     (2, NEW.idComputador),
     (3, NEW.idComputador),
     (4, NEW.idComputador);
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
