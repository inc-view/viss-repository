-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj VARCHAR(14)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE phAgua(
	idRegistro INT primary KEY AUTO_INCREMENT,
    registro DECIMAL(4,2),
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id),
    fk_ph INT,
    FOREIGN KEY (fk_ph) REFERENCES phAgua(idRegistro)
);

INSERT INTO empresa (razao_social, cnpj) VALUES
    ('Empresa XYZ', '98765432109876'),
    ('Empresa 123', '55555555555555'),
    ('Empresa ABC', '11111111111111');

-- Inserir um único registro de aquário
INSERT INTO aquario (descricao, fk_empresa) VALUES ('Aquário de Peixes Tropicais', 1);

-- Inserir vários registros de aquário
INSERT INTO aquario (descricao, fk_empresa)
VALUES
    ('Aquário de Água Doce', 1),
    ('Aquário de Água Salgada', 1),
    ('Aquário de Recifes de Corais', 3);

-- Inserir um único registro de pH para um aquário específico
INSERT INTO phAgua (registro, fk_aquario) VALUES (7.2, 1);

-- Inserir vários registros de pH para diferentes aquários
INSERT INTO phAgua (registro, fk_aquario)
VALUES
    (7, 5);
select * from aquario where fk_empresa=1;
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES
    (58.7, 25.5, 480, 26.5, 1, NOW(), 5, 18);
    -- Inserir uma única medida com base em um registro de pH específico
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES (60.5, 25.0, 500, 27.5, 1, '2023-09-19 10:00:00', 1, 1);

-- Inserir várias medidas com base em diferentes registros de pH e aquários
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES
    (55.2, 24.5, 450, 26.8, 0, '2023-09-19 10:15:00', 2, 2),
    (70.0, 26.0, 550, 28.0, 1, '2023-09-19 10:30:00', 1, 5),
    (65.7, 25.7, 480, 27.2, 0, '2023-09-19 10:45:00', 3, 4);
    
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES (60.5, 25.0, 500, 27.5, 1, '2023-09-19 10:00:00', 1, 1);

select * from aquario where fk_empresa=1;
-- Inserir uma única medida com base em um registro de pH específico
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES (65.3, 24.8, 520, 27.3, 0, NOW(), 2, 5);

-- Inserir várias medidas com base em diferentes registros de pH e aquários
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES
    (58.7, 25.5, 480, 26.5, 1, NOW(), 3, 6),
    (72.1, 26.3, 550, 28.2, 0, NOW(), 1, 7),
    (67.5, 25.9, 510, 27.0, 1, NOW(), 2, 8);

INSERT INTO phAgua (registro, fk_aquario)
VALUES
    (4, 2),
    (7.5, 4),
    (8.0, 5),
    (5.1, 6);
select * FROM phAgua where fk_aquario in (2,4,5,6);
select * from aquario where fk_empresa=1;
-- Inserir várias medidas com base em diferentes registros de pH e aquários
INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario, fk_ph)
VALUES
    (58.7, 25.5, 480, 26.5, 1, NOW(), 2, 2),
    (72.1, 26.3, 550, 28.2, 0, NOW(), 4, 5),
    (67.5, 25.9, 510, 27.0, 1, NOW(), 5, 8),
    (67.5, 25.9, 510, 27.0, 1, NOW(), 6, 6); 
    
select registro as ph from phAgua join 
                        medida ON medida.fk_ph=phAgua.idRegistro AND medida.fk_aquario=2
                        ORDER BY id desc limit 7;
select registro as ph, DATE_FORMAT(medida.momento,'%H:%i:%s') as momento_grafico 
                    from phAgua join 
                    medida ON medida.fk_ph=phAgua.idRegistro AND medida.fk_aquario=2
                        ORDER BY id desc limit 7;
                        
                        select registro as ph, DATE_FORMAT(medida.momento,'%H:%i:%s') as momento_grafico 
                    from phAgua join 
                    medida ON medida.fk_ph=phAgua.idRegistro AND medida.fk_aquario=2
                        ORDER BY id desc limit 7;
                        
                        select registro as ph, DATE_FORMAT(medida.momento,'%H:%i:%s') as momento_grafico 
                    from phAgua join 
                    medida ON medida.fk_ph=phAgua.idRegistro AND medida.fk_aquario=2;