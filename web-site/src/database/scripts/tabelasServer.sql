USE master;
GO

CREATE DATABASE inkView;
GO

USE inkView;
GO

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY IDENTITY(1,1),
    complemento NVARCHAR(45) NULL,
    cep CHAR(8) NULL,
    descricao NVARCHAR(200) NULL
);

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    razaoSocial NVARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    fkEndereco INT NOT NULL,
    fkSede INT,
    CONSTRAINT fk_empresa_endereco1 FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_empresa_empresa1 FOREIGN KEY (fkSede) REFERENCES empresa (idEmpresa)
);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY IDENTITY(1,1),
    fkGestor INT NULL,
    fkEmpresa INT NOT NULL,
    nome NVARCHAR(45) NULL,
    email NVARCHAR(45) NULL,
    cpf CHAR(14) NULL,
    telefone NVARCHAR(45) NULL,
    senha NVARCHAR(45) NULL,
    CONSTRAINT fk_funcionario_funcionario1 FOREIGN KEY (fkGestor) REFERENCES funcionario (idFuncionario),
    CONSTRAINT fk_funcionario_empresa1 FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE ligacoesFuncionario (
    idligacoesFuncionario INT PRIMARY KEY IDENTITY(1,1),
    recebidas INT,
    atendidas INT,
    porcAtendidas FLOAT,
    abandonadas INT,
    duracao TIME,
    fkFuncionario INT NOT NULL,
    CONSTRAINT fk_chamada_funcionario1 FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idFuncionario)
);

CREATE TABLE computador (
    idComputador INT PRIMARY KEY IDENTITY(1,1),
    ipComputador NVARCHAR(45),
    nomePatrimonio NVARCHAR(45) NULL,
    marca NVARCHAR(45) NULL,
    fkFuncionario INT NOT NULL,
    sistemaOperacional NVARCHAR(100) NULL,
    ativo BIT,
    CONSTRAINT fk_computador_funcionario1 FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idFuncionario)
);

CREATE TABLE unidadeMedida (
    idUnidadeMedida INT PRIMARY KEY IDENTITY(1,1),
    tipoMedida NVARCHAR(100) NULL
);

CREATE TABLE componente (
    idComponente INT PRIMARY KEY IDENTITY(1,1),
    tipo NVARCHAR(45) NOT NULL,
    fkUnidadeMedida INT NOT NULL,
    CONSTRAINT fk_componente_unidadeMedida1 FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida (idUnidadeMedida)
);

CREATE TABLE software (
    idSoftware INT PRIMARY KEY IDENTITY(1,1),
    nomeSoftware NVARCHAR(150) NOT NULL,
    categoriaSoftware NVARCHAR(45) NULL
);

CREATE TABLE softwarePermitido (
    idSoftwarePermitido INT PRIMARY KEY IDENTITY(1,1),
    bloqueado BIT NULL,
    fkSoftware INT NOT NULL,
    fkComputador INT NOT NULL,
    CONSTRAINT fk_computador_has_Software_Software1 FOREIGN KEY (fkSoftware) REFERENCES software (idSoftware),
    CONSTRAINT fk_ComputadorSoftware_computador1 FOREIGN KEY (fkComputador) REFERENCES computador (idComputador)
);

CREATE TABLE hasComponente (
    idHasComponente INT PRIMARY KEY IDENTITY(1,1),
    fkComponente INT NOT NULL,
    fkComputador INT NOT NULL,
    CONSTRAINT fk_componente_has_computador_componente1 FOREIGN KEY (fkComponente) REFERENCES componente (idComponente),
    CONSTRAINT fk_componentes_has_computador_computador1 FOREIGN KEY (fkComputador) REFERENCES computador (idComputador)
);

CREATE TABLE registro (
    idRegistro INT PRIMARY KEY IDENTITY(1,1),
    registro INT NULL,
    dtHora DATETIME NULL,
    fkHasComponente INT NOT NULL,
    CONSTRAINT fk_registro_componenteComputador1 FOREIGN KEY (fkHasComponente) REFERENCES hasComponente (idHasComponente)
);

CREATE TABLE processo (
    idProcesso INT PRIMARY KEY IDENTITY(1,1),
    nomeProcesso NVARCHAR(150),
    fkComputador INT NOT NULL,
    CONSTRAINT fk_registros_computador1 FOREIGN KEY (fkComputador) REFERENCES computador (idComputador)
);

CREATE TABLE registroProcesso (
    idRegistroProcesso INT PRIMARY KEY IDENTITY(1,1),
    registro NVARCHAR(150),
    fkProcesso INT,
    fkHasComponente INT,
    dataHora DATETIME,
    CONSTRAINT fk_Processo FOREIGN KEY (fkProcesso) REFERENCES processo (idProcesso),
    CONSTRAINT fk_HasComponente FOREIGN KEY (fkHasComponente) REFERENCES hasComponente (idHasComponente)
);

CREATE TABLE processoIlicito (
    idProcessoIlicito INT PRIMARY KEY IDENTITY(1,1),
    fkSoftware INT NOT NULL,
    dataHora DATE NOT NULL,
    CONSTRAINT fk_SoftwarePermitido FOREIGN KEY (fkSoftware) REFERENCES softwarePermitido (idSoftwarePermitido)
);

CREATE TABLE ilicitoRegistro (
    idRegistroIlicito INT PRIMARY KEY IDENTITY(1,1),
    fkProcessoIlicito INT NOT NULL,
    dtHora DATETIME NOT NULL,
    CONSTRAINT fk_ProcessoIlicito FOREIGN KEY (fkProcessoIlicito) REFERENCES processoIlicito (idProcessoIlicito)
);

