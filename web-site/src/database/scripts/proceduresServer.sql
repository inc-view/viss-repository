-- Índices para otimizar as consultas
CREATE INDEX idx_idComputador ON computador (idComputador);
CREATE INDEX idx_fkComputador ON processo (fkComputador);
CREATE INDEX idx_fkFuncionario ON computador (fkFuncionario);
CREATE INDEX idx_fkProcesso ON registroProcesso (fkProcesso);
CREATE INDEX idx_fkHasComponente ON registroProcesso (fkHasComponente);
CREATE INDEX idx_fkComponente ON hasComponente (fkComponente);
CREATE INDEX idx_fkUnidadeMedida ON componente (fkUnidadeMedida);

-- Cadastro dos processos (Stored Procedure)
CREATE PROCEDURE spInsertProcesso
    @vNomeProcesso varchar(350),
    @vfkComputador int
AS
BEGIN
    IF NOT EXISTS (SELECT nomeProcesso, fkComputador FROM processo WHERE nomeProcesso = @vNomeProcesso AND fkComputador = @vfkComputador)
    BEGIN
        INSERT INTO processo (nomeProcesso, fkComputador) VALUES (@vNomeProcesso, @vfkComputador);
    END
END;

-- Cadastro dos processos ilícitos encontrados através do Java >>> NOVO!!!
CREATE PROCEDURE spInsertRegistroIlicito
    @vNomeProcesso varchar(150),
    @vfkPc int
AS
BEGIN
    INSERT INTO processoIlicito (fkSoftware, dataHora)
    SELECT sp.idSoftwarePermitido, GETDATE()
    FROM softwarePermitido AS sp
    JOIN software AS s ON sp.fkSoftware = s.idSoftware
    WHERE s.nomeSoftware = @vNomeProcesso AND sp.fkComputador = @vfkPc;
END;

-- Cadastro dos registros (CPU e RAM) dos processos
CREATE PROCEDURE spInsertRegistroProcesso
    @vNomeProcesso varchar(255),
    @vfkComputador int,
    @dadoCPU float,
    @dadoRAM float
AS
BEGIN
    DECLARE @id INT;
    DECLARE @idCpu INT;
    DECLARE @idRam INT;

    SELECT @id = idProcesso
    FROM processo
    WHERE nomeProcesso LIKE '%' + @vNomeProcesso + '%' AND fkComputador = @vfkComputador;

    SELECT @idCpu = idCpu, @idRam = idRam
    FROM vwIdComponenteComputador
    WHERE idComputador = @vfkComputador;

    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (ROUND(@dadoCPU, 2), @id, @idCpu, GETDATE());

    INSERT INTO registroProcesso (registro, fkProcesso, fkHasComponente, dataHora)
    VALUES (ROUND(@dadoRAM, 2), @id, @idRam, GETDATE());
END;
CREATE PROCEDURE spInsertComputador
    @nomePatrimonio varchar(255),
    @marca varchar(255),
    @fkFuncionario int,
    @sistemaOperacional varchar(255),
    @ipComputador varchar(15)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM computador WHERE nomePatrimonio = @nomePatrimonio)
    BEGIN
        INSERT INTO computador (nomePatrimonio, marca, fkFuncionario, sistemaOperacional, ipComputador)
        VALUES (@nomePatrimonio, @marca, @fkFuncionario, @sistemaOperacional, @ipComputador);
    END
END;
