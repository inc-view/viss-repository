use inkView;
-- Inserir registros na tabela endereco
INSERT INTO  endereco  ( idEndereco ,  complemento ,  cep ,  descricao ) VALUES
(null, 'Setor de Atendimento ao Cliente', '54321987', 'Localizada em um bairro comercial movimentado, próxima a restaurantes e lojas locais.'),
(null, 'Setor de Suporte Técnico', '12345678', 'Situada em uma área empresarial, com fácil acesso a serviços de transporte público e proximidade a um parque.'),
(null, 'Central de Atendimento 24 Horas', '87654321', 'Estrategicamente localizada no centro da cidade, com diversos hotéis e opções de alimentação nas proximidades.'),
(null, 'Área de Treinamento', '23456789', 'Próxima a uma universidade, com acesso a livrarias e cafeterias que oferecem um ambiente acadêmico inspirador.'),
(null, 'Sala de Supervisão', '34567890', ' Localizada em um edifício corporativo moderno no coração do distrito financeiro, com vista para arranha-céus e avenidas movimentadas.');

-- Inserir registros na tabela empresa
INSERT INTO  empresa  ( idEmpresa ,  razaoSocial ,  cnpj ,  email ,  fkEndereco ,  fkSede ) VALUES
(null, 'Call Center ABC', '12345678901234', 'contato@callcenterabc.com', 1, NULL),
(null, 'Call Center XYZ', '98765432109876', 'info@callcenterxyz.com', 2, NULL),
(null, 'Call Center 123', '56789012345678', 'support@callcenter123.com', 3, NULL);

-- Inserir registros na tabela funcionario
INSERT INTO  funcionario  ( idFuncionario ,  fkGestor ,  fkEmpresa ,  nome ,  email ,  cpf ,  telefone ,  senha ) VALUES
(null, NULL, 1, 'João Silva', 'joao@callcenterabc.com', '12345678901', '(11) 1234-5678', 'senha123'),
(null, NULL, 1, 'Maria Santos', 'maria@callcenterabc.com', '98765432109', '(11) 5678-1234', 'senha456'),
(null, NULL, 2, 'Pedro Almeida', 'pedro@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha789');

-- Inserir registros na tabela unidadeMedida
INSERT INTO  unidadeMedida  ( idUnidadeMedida ,  tipoMedida ) VALUES 
(null, '%'),
(null, 'GHz'),
(null, 'GB'),
(null, 'MB'),
(null, 'KB/s');

-- Inserir registros na tabela componentes
INSERT INTO  componente  ( idComponente ,  tipo ,  fkUnidadeMedida ) VALUES 
(null, 'CPU', 1),
(null, 'Memoria', 1), 
(null, 'Memoria', 3), 
(null, 'Disco', 1);

-- Inserir registros na tabela computadores
INSERT INTO computador (ipComputador, nomePatrimonio, marca, fkFuncionario, sistemaOperacional, ativo) VALUES
('034985', 'CPO01', 'Dell', 1, 'Windows 10', true),
('094385', 'CPO02', 'HP', 2, 'Ubuntu 20.04 LTS', true),
('123450', 'CPO03', 'Lenovo', 3, 'Windows 11', true);

-- Inserir componentes dos computadores na tabela hasComponente
-- INSERT INTO hasComponente values
-- (null, 1, 1),
-- (null, 2, 1),
-- (null, 3, 1),
-- (null, 4, 1);

-- Inserir processos na tabela processo
INSERT INTO  processo  VALUES
(NULL, 'excel.exe', 1),
(NULL, 'intellij.exe', 1),
(NULL, 'vscode.exe', 1),
(NULL, 'google.exe', 1);

-- Inserir registros na tabela registro
insert into registro values
(null, 12, current_timestamp(), 1);
