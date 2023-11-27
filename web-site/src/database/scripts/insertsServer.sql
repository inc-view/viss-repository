INSERT INTO  endereco  ( complemento ,  cep ,  descricao ) VALUES
('Setor de Atendimento ao Cliente', '54321987', 'Localizada em um bairro comercial movimentado, próxima a restaurantes e lojas locais.'),
('Setor de Suporte Técnico', '12345678', 'Situada em uma área empresarial, com fácil acesso a serviços de transporte público e proximidade a um parque.'),
('Central de Atendimento 24 Horas', '87654321', 'Estrategicamente localizada no centro da cidade, com diversos hotéis e opções de alimentação nas proximidades.'),
('Área de Treinamento', '23456789', 'Próxima a uma universidade, com acesso a livrarias e cafeterias que oferecem um ambiente acadêmico inspirador.'),
('Sala de Supervisão', '34567890', ' Localizada em um edifício corporativo moderno no coração do distrito financeiro, com vista para arranha-céus e avenidas movimentadas.');

-- Inserir registros na tabela empresa
INSERT INTO  empresa  ( razaoSocial ,  cnpj ,  email ,  fkEndereco ,  fkSede ) VALUES
('Call Center ABC', '12345678901234', 'contato@callcenterabc.com', 1, NULL),
('Call Center XYZ', '98765432109876', 'info@callcenterxyz.com', 2, NULL),
('Call Center 123', '56789012345678', 'support@callcenter123.com', 3, NULL);

-- Inserir registros na tabela funcionario
INSERT INTO  funcionario  ( fkGestor ,  fkEmpresa ,  nome ,  email ,  cpf ,  telefone ,  senha ) VALUES
(NULL, 1, 'Fernando Brandão', 'fernando@callcenterabc.com', '12345678901', '(11) 1234-5678', 'senha123'),
(1, 1, 'Maria Santos', 'Maria@callcenterabc.com', '98765432109', '(11) 5678-1234', 'senha456'),
(1, 1, 'Pedro Almeida', 'Pedro@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha789'),
(1, 1, 'Lucas Carlos', 'Lucas@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senh2345'),
(1, 1, 'Patricia De Santos', 'Patricia@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha12349'),
(1, 1, 'Ingrid Bartolon', 'Ingrid@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha72356');

-- Inserir registros na tabela unidadeMedida
INSERT INTO  unidadeMedida  ( tipoMedida ) VALUES 
('%'),
('GHz'),
('GB'),
('MB'),
('KB/s'),
('Inteiro');

-- Inserir registros na tabela componentes
INSERT INTO  componente  ( tipo ,  fkUnidadeMedida ) VALUES 
('CPU', 1),
('Memoria', 1), 
('Memoria', 3), 
('Disco', 1),
('PPM', 6);

-- Inserir registros na tabela computadores
INSERT INTO computador (ipComputador, nomePatrimonio, marca, fkFuncionario, sistemaOperacional, ativo) VALUES
('034985', 'CPO01', 'Dell', 2, 'Windows 10', 1),
('094385', 'CPO02', 'HP', 3, 'Ubuntu 20.04 LTS', 1),
('123450', 'CPO03', 'Lenovo', 4, 'Windows 11', 1),
('123450', 'CPO03', 'Lenovo', 5, 'Windows 11', 1),
('123450', 'CPO03', 'Lenovo', 6, 'Windows 11', 1);

-- Inserir componentes dos computadores na tabela hasComponente
-- INSERT INTO hasComponente values
-- (null, 1, 1),
-- (null, 2, 1),
-- (null, 3, 1),
-- (null, 4, 1);

-- Inserir processos na tabela processo
INSERT INTO processo ( nomeProcesso, fkComputador) VALUES
('excel.exe', 3),
('intellij.exe', 3),
('vscode.exe', 3),
('google.exe', 3);


-- Inserindo dados no ligacoesFuncionario
INSERT INTO ligacoesFuncionario ( recebidas, atendidas, porcAtendidas, abandonadas, duracao, fkFuncionario) VALUES 
(30, 28, 93, 3, '00:3:21', 2),
(20, 12, 60, 2, '00:05:20', 3),
(40, 20, 50, 10, '00:02:32', 4),
(50, 42, 84, 8, '00:02:02', 5),
(12, 12, 100, 0, '00:03:30', 6);