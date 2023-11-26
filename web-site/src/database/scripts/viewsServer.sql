CREATE TRIGGER insere_hasComputadores
ON computador
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idComputador INT;

    SELECT @idComputador = idComputador FROM inserted;

    INSERT INTO hasComponente (fkComponente, fkComputador)
    VALUES 
        (1, @idComputador),
        (2, @idComputador),
        (3, @idComputador),
        (4, @idComputador),
        (5, @idComputador);
END;


-- CRIAÇÃO DA VIEW DOS REGISTROS EM TABELA
CREATE VIEW tabelaRegistros AS
    SELECT TOP 1000
         r.registro AS Registro,
         r.dtHora AS MomentoRegistro,
         comp.tipo AS Componente,
         um.tipoMedida AS Simbolo,
         hc.idHasComponente AS idHasComponente,
         c.idComputador AS idComputador
    FROM
        registro r
    INNER JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
    INNER JOIN computador c ON hc.fkComputador = c.idComputador
    INNER JOIN componente comp ON hc.fkComponente = comp.idComponente
    INNER JOIN unidadeMedida um ON comp.fkUnidadeMedida = um.idUnidadeMedida
    ORDER BY r.dtHora;

-- VIEW DE INFORMAÇÕES DO COMPUTADOR
CREATE VIEW infoComputador AS
SELECT 
    f.nome AS NomeFuncionario,
    c.ipComputador AS IpComputador,
    c.ativo AS Status,
    c.marca AS MarcaComputador,
    c.sistemaOperacional AS SistemaOperacional,
    c.idComputador AS IdComputador,
    (
        SELECT MAX(r.dtHora)
        FROM registro r
        WHERE r.fkHasComponente IN (
            SELECT hc.idHasComponente
            FROM hasComponente hc
            WHERE hc.fkComputador = c.idComputador
        )
    ) AS UltimaSessao,
    (
        SELECT TOP 1 r.registro
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente comp ON hc.fkComponente = comp.idComponente
        WHERE comp.tipo = 'CPU' AND r.dtHora = (
            SELECT MAX(r2.dtHora)
            FROM registro r2
            JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
            JOIN componente comp2 ON hc2.fkComponente = comp2.idComponente
            WHERE hc2.fkComputador = c.idComputador
            AND comp2.tipo = 'CPU'
        )
    ) AS PorcentagemCPU
FROM computador c
JOIN funcionario f ON c.fkFuncionario = f.idFuncionario;

-- VIEW DE COMPONENTES ESPECÍFICOS DO COMPUTADOR
CREATE VIEW vwIdComponenteComputador AS
SELECT
    pc.idComputador,
    pc.ipComputador,
    cpu1.idHasComponente AS 'cpu',
    ram1.idHasComponente AS 'ram',
    disco1.idHasComponente AS 'disco'
FROM 
    computador pc
INNER JOIN hasComponente cpu1 ON cpu1.fkComputador = pc.idComputador
INNER JOIN hasComponente ram1 ON ram1.fkComputador = pc.idComputador
INNER JOIN hasComponente disco1 ON disco1.fkComputador = pc.idComputador
INNER JOIN componente c ON c.idComponente = cpu1.fkComponente
INNER JOIN componente c1 ON c1.idComponente = ram1.fkComponente
INNER JOIN componente c2 ON c2.idComponente = disco1.fkComponente
INNER JOIN unidadeMedida u ON u.idUnidadeMedida = c1.fkUnidadeMedida
WHERE 
    c.tipo = 'CPU' 
    AND c2.tipo = 'Disco' 
    AND c1.tipo = 'Memoria' 
    AND u.tipoMedida = '%';


CREATE PROCEDURE spInsertRegistroProcesso 
    @vNomeProcesso VARCHAR(255),
    @vfkComputador INT,
    @dado FLOAT
AS
BEGIN
    DECLARE @id INT;

    -- Selecione os dados desejados
    SELECT @id = idProcesso
    FROM processo
    WHERE nomeProcesso LIKE '%' + @vNomeProcesso + '%' AND fkComputador = @vfkComputador;

    -- Faça a inserção com base nos resultados do SELECT
    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (@dado, @id, 1, GETDATE());
END;


-- Apos inserir em softawre
CREATE TRIGGER insere_softwarePermitidos
ON software
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO softwarePermitido (bloqueado, fkSoftware, fkComputador)
    VALUES 
        (0, (SELECT idSoftware FROM inserted), 1),
        (0, (SELECT idSoftware FROM inserted), 2),
        (0, (SELECT idSoftware FROM inserted), 3),
        (0, (SELECT idSoftware FROM inserted), 4);
END;


CREATE INDEX idx_idComputador ON computador (idComputador);
CREATE INDEX idx_fkComputador ON processo (fkComputador);
CREATE INDEX idx_fkFuncionario ON computador (fkFuncionario);
CREATE INDEX idx_fkProcesso ON registroProcesso (fkProcesso);
CREATE INDEX idx_fkHasComponente ON registroProcesso (fkHasComponente);
CREATE INDEX idx_fkComponente ON hasComponente (fkComponente);
CREATE INDEX idx_fkUnidadeMedida ON componente (fkUnidadeMedida);


-- View que lista tudo
CREATE VIEW listProcessData AS
SELECT
    f.fkEmpresa,
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END) AS 'cpu',
    AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END) AS 'ram',
    DATEDIFF(HOUR, MIN(r.dataHora), MAX(r.dataHora)) AS 'horas_uso'
FROM processo p
    JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
    JOIN hasComponente hc ON hc.idHasComponente = r.fkHasComponente
    JOIN componente c ON c.idComponente = hc.fkComponente
    JOIN computador pc ON pc.idComputador = p.fkComputador
    JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
GROUP BY f.fkEmpresa, r.fkProcesso, p.nomeProcesso;


-- View que lista por dia
CREATE VIEW listDataOneProcess AS
SELECT
    DAY(r.dataHora) AS 'dia',
    r.fkProcesso,
    p.nomeProcesso AS 'processo',
    ROUND(AVG(CASE WHEN c.tipo = 'CPU' THEN r.registro END), 2) AS 'cpu',
    ROUND(AVG(CASE WHEN c.tipo = 'Memoria' AND c.fkUnidadeMedida = 1 THEN r.registro END), 2) AS 'ram',
    DATEDIFF(HOUR, MIN(r.dataHora), MAX(r.dataHora)) AS 'horas_uso'
FROM processo p
    JOIN registroProcesso r ON r.fkProcesso = p.idProcesso
    JOIN hasComponente hc ON hc.idHasComponente = r.fkHasComponente
    JOIN componente c ON c.idComponente = hc.fkComponente
    JOIN computador pc ON pc.idComputador = p.fkComputador
    JOIN funcionario f ON f.idFuncionario = pc.fkFuncionario
WHERE 
    DAY(r.dataHora) BETWEEN DAY(GETDATE()) - 7 AND DAY(GETDATE()) -- Filtro para os últimos 7 dias
    AND MONTH(r.dataHora) = MONTH(GETDATE()) -- Filtrando pelo mês atual
GROUP BY r.fkProcesso, DAY(r.dataHora), p.nomeProcesso;

