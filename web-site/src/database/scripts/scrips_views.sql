CREATE VIEW tabelaRegistros AS
    SELECT 
         registro . registro  AS  Registro ,
         registro . dtHora  AS  MomentoRegistro ,
         componente . tipo  AS  Componente ,
         unidademedida .tipoMedida AS Simbolo,
        componenteComputador.idComponenteComputador AS idComponenteComputador,
        computador.idComputador AS idComputador
    FROM
        registro
            JOIN
        componenteComputador ON fkComponenteComputador = idComponenteComputador
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
