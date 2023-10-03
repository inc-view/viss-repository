create database inkView;
use inkView;

CREATE TABLE IF NOT EXISTS `endereco` (
    `idEndereco` INT NOT NULL AUTO_INCREMENT,
    `complemento` VARCHAR(45) NULL,
    `cep` CHAR(8) NULL,
    `descricao` VARCHAR(200) NULL,
    PRIMARY KEY (`idEndereco`)
);
  
CREATE TABLE IF NOT EXISTS `empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `razaoSocial` VARCHAR(100) NOT NULL,
  `cnpj` CHAR(14) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fkEndereco` INT NOT NULL,
  `fkSede` INT,
  PRIMARY KEY (`idEmpresa`),
  CONSTRAINT `fk_empresa_endereco1`
    FOREIGN KEY (`fkEndereco`)
    REFERENCES `endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_empresa_empresa1`
    FOREIGN KEY (`fkSede`)
    REFERENCES `empresa` (`idEmpresa`)
    );

CREATE TABLE IF NOT EXISTS `funcionario` (
  `idFuncionario` INT NOT NULL AUTO_INCREMENT,
  `fkGestor` INT,
  `fkEmpresa` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `cpf` CHAR(11) NULL,
  `telefone` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`idFuncionario`, `fkEmpresa`),
  CONSTRAINT `fk_funcionario_funcionario1`
    FOREIGN KEY (`fkGestor`)
    REFERENCES `funcionario` (`idFuncionario`),
  CONSTRAINT `fk_funcionario_empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `empresa` (`idEmpresa`)
);

CREATE TABLE IF NOT EXISTS `computador` (
  `idComputador` INT NOT NULL AUTO_INCREMENT,
  `nomePatrimonio` VARCHAR(45) NULL,
  `marca` VARCHAR(45) NULL,
  `fkFuncionario` INT NOT NULL,
  `sistemaOperacional` VARCHAR(100) NULL,
  PRIMARY KEY (`idComputador`, `fkFuncionario`),
  CONSTRAINT `fk_computador_funcionario1`
    FOREIGN KEY (`fkFuncionario`)
    REFERENCES `funcionario` (`idFuncionario`)
    );
    
CREATE TABLE IF NOT EXISTS `unidadeMedida` (
  `idUnidadeMedida` INT NOT NULL AUTO_INCREMENT,
  `tipoMedida` VARCHAR(100) NULL,
  PRIMARY KEY (`idUnidadeMedida`));

CREATE TABLE IF NOT EXISTS `componente` (
  `idComponente` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NOT NULL,
  `fkUnidadeMedida` INT NOT NULL,
  PRIMARY KEY (`idComponente`),
  CONSTRAINT `fk_componente_unidadeMedida1`
    FOREIGN KEY (`fkUnidadeMedida`)
    REFERENCES `unidadeMedida` (`idUnidadeMedida`)
);

CREATE TABLE IF NOT EXISTS `Software` (
  `idSoftware` INT NOT NULL AUTO_INCREMENT,
  `nomeSoftware` VARCHAR(45) NOT NULL,
  `cartegoriaSoftware` VARCHAR(45) NULL,
  PRIMARY KEY (`idSoftware`));

CREATE TABLE IF NOT EXISTS `SoftwareComputador` (
  `fkSoftware` INT NOT NULL AUTO_INCREMENT,
  `bloquado` VARCHAR(2) NULL,
  `idSoftwareComputador` INT NOT NULL,
  `fkComputador` INT NOT NULL,
  PRIMARY KEY (`fkSoftware`, `idSoftwareComputador`, `fkComputador`),
  CONSTRAINT `fk_computador_has_Software_Software1`
    FOREIGN KEY (`fkSoftware`)
    REFERENCES `Software` (`idSoftware`),
  CONSTRAINT `fk_ComputadorSoftware_computador1`
    FOREIGN KEY (`fkComputador`)
    REFERENCES `computador` (`idComputador`)
);

CREATE TABLE IF NOT EXISTS `componenteComputador` (
  `fkComponente` INT NOT NULL AUTO_INCREMENT,
  `fkComputador` INT NOT NULL,
  `idComponenteComputador` INT NOT NULL,
  PRIMARY KEY (`fkComponente`, `fkComputador`, `idComponenteComputador`),
  CONSTRAINT `fk_componente_has_computador_componente1`
    FOREIGN KEY (`fkComponente`)
    REFERENCES `componente` (`idComponente`),
  CONSTRAINT `fk_componentes_has_computador_computador1`
    FOREIGN KEY (`fkComputador`)
    REFERENCES `computador` (`idComputador`)
);

CREATE TABLE IF NOT EXISTS `registro` (
  `idRegistro` INT NOT NULL AUTO_INCREMENT,
  `registro` INT NULL,
  `dtHora` DATETIME NULL,
  `fkComponenteComputador` INT NOT NULL,
  PRIMARY KEY (`idRegistro`),
  CONSTRAINT `fk_registros_componenteComputador1`
    FOREIGN KEY (`fkComponenteComputador`)
    REFERENCES `componenteComputador` (`fkComponente`)
);
