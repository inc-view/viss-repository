create database inkView;
use inkView;
-- drop database inkView;
CREATE TABLE IF NOT EXISTS `endereco` (
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `complemento` VARCHAR(45) NULL,
  `cep` CHAR(8) NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`idEndereco`));

CREATE TABLE IF NOT EXISTS `empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `razaoSocial` VARCHAR(100) NOT NULL,
  `cnpj` CHAR(14) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fkEndereco` INT NOT NULL,
  `fkSede` INT NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  CONSTRAINT `fk_empresa_endereco1`
    FOREIGN KEY (`fkEndereco`)
    REFERENCES `endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_empresa_empresa1`
    FOREIGN KEY (`fkSede`)
    REFERENCES `empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `funcionario` (
  `idFuncionario` INT NOT NULL AUTO_INCREMENT,
  `fkGestor` INT NOT NULL,
  `fkEmpresa` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `cpf` CHAR(11) NULL,
  `telefone` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`idFuncionario`, `fkEmpresa`),
  CONSTRAINT `fk_funcionario_funcionario1`
    FOREIGN KEY (`fkGestor`)
    REFERENCES `funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funcionario_empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `computadores` (
  `idComputadores` INT NOT NULL AUTO_INCREMENT,
  `nomePatrimonio` VARCHAR(45) NULL,
  `marca` VARCHAR(45) NULL,
  `fkFuncionario` INT NOT NULL,
  `sistemaOperacional` VARCHAR(100) NULL,
  PRIMARY KEY (`idComputadores`, `fkFuncionario`),
  CONSTRAINT `fk_computadores_funcionario1`
    FOREIGN KEY (`fkFuncionario`)
    REFERENCES `funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `unidadeMedida` (
  `idUnidadeMedida` INT NOT NULL,
  `tipoMedida` VARCHAR(100) NULL,
  PRIMARY KEY (`idUnidadeMedida`));

CREATE TABLE IF NOT EXISTS `componentes` (
  `idComponentes` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `fkUnidadeMedida` INT NOT NULL,
  PRIMARY KEY (`idComponentes`),
  CONSTRAINT `fk_componentes_unidadeMedida1`
    FOREIGN KEY (`fkUnidadeMedida`)
    REFERENCES `unidadeMedida` (`idUnidadeMedida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `Softwares` (
  `idSoftwares` INT NOT NULL,
  `nomeSoftware` VARCHAR(45) NOT NULL,
  `cartegoriaSoftware` VARCHAR(45) NULL,
  PRIMARY KEY (`idSoftwares`));

CREATE TABLE IF NOT EXISTS `SoftwareComputador` (
  `fkSoftwares` INT NOT NULL,
  `bloquado` VARCHAR(2) NULL,
  `idSoftwareComputador` INT NOT NULL,
  `fkComputador` INT NOT NULL,
  PRIMARY KEY (`fkSoftwares`, `idSoftwareComputador`, `fkComputador`),
  CONSTRAINT `fk_computadores_has_Softwares_Softwares1`
    FOREIGN KEY (`fkSoftwares`)
    REFERENCES `Softwares` (`idSoftwares`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ComputadoresSoftwares_computadores1`
    FOREIGN KEY (`fkComputador`)
    REFERENCES `computadores` (`idComputadores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `componenteComputador` (
  `fkComponente` INT NOT NULL,
  `fkComputador` INT NOT NULL,
  `idComponenteComputador` INT NOT NULL,
  PRIMARY KEY (`fkComponente`, `fkComputador`, `idComponenteComputador`),
  CONSTRAINT `fk_componentes_has_computadores_componentes1`
    FOREIGN KEY (`fkComponente`)
    REFERENCES `componentes` (`idComponentes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_componentes_has_computadores_computadores1`
    FOREIGN KEY (`fkComputador`)
    REFERENCES `computadores` (`idComputadores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `registros` (
  `idRegistros` INT NOT NULL,
  `registro` INT NULL,
  `dtHora` DATETIME NULL,
  `fkComponenteComputador` INT NOT NULL,
  PRIMARY KEY (`idRegistros`),
  CONSTRAINT `fk_registros_componenteComputador1`
    FOREIGN KEY (`fkComponenteComputador`)
    REFERENCES `componenteComputador` (`fkComponente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
