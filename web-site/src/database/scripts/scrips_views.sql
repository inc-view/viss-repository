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
    c.idComputador AS `IdComputador`,
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

CREATE VIEW vwIdComponenteComputador AS
select 
    idComputador,
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


-- View que lista tudo dos processos
create view listProcessData as
SELECT
    f.fkEmpresa,
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    round(AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END), 2) AS 'cpu',
    round(AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END), 2) AS 'ram',
    TIMEDIFF(MAX(r.dataHora), MIN(r.dataHora)) AS 'horas_uso'
FROM processo p
	JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
	JOIN hasComponente hc on hc.idHasComponente = r.fkHasComponente
	JOIN componente c on c.idComponente = hc.fkComponente
	JOIN computador pc ON pc.idComputador = p.fkComputador
	JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
		GROUP BY f.fkEmpresa, r.fkProcesso, p.nomeProcesso;


-- View que lista  os processos por dia
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

