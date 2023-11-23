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
(null, NULL, 1, 'Fernando Brandão', 'fernando@callcenterabc.com', '12345678901', '(11) 1234-5678', 'senha123'),
(null, 1, 1, 'Maria Santos', 'Maria@callcenterabc.com', '98765432109', '(11) 5678-1234', 'senha456'),
(null, 1, 1, 'Pedro Almeida', 'Pedro@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha789'),
(null, 1, 1, 'Lucas Carlos', 'Lucas@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senh2345'),
(null, 1, 1, 'Patricia De Santos', 'Patricia@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha12349'),
(null, 1, 1, 'Ingrid Bartolon', 'Ingrid@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha72356');

-- Inserir registros na tabela unidadeMedida
INSERT INTO  unidadeMedida  ( idUnidadeMedida ,  tipoMedida ) VALUES 
(null, '%'),
(null, 'GHz'),
(null, 'GB'),
(null, 'MB'),
(null, 'KB/s'),
(null, 'Inteiro');

-- Inserir registros na tabela componentes
INSERT INTO  componente  ( idComponente ,  tipo ,  fkUnidadeMedida ) VALUES 
(null, 'CPU', 1),
(null, 'Memoria', 1), 
(null, 'Memoria', 3), 
(null, 'Disco', 1),
(null, 'PPM', 6);

-- Inserir registros na tabela computadores
INSERT INTO computador (ipComputador, nomePatrimonio, marca, fkFuncionario, sistemaOperacional, ativo) VALUES
('034985', 'CPO01', 'Dell', 2, 'Windows 10', true),
('094385', 'CPO02', 'HP', 3, 'Ubuntu 20.04 LTS', true),
('123450', 'CPO03', 'Lenovo', 4, 'Windows 11', true),
('123450', 'CPO03', 'Lenovo', 5, 'Windows 11', true),
('123450', 'CPO03', 'Lenovo', 6, 'Windows 11', true);

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

-- Inserindo dados no ligacoesFuncionario
INSERT INTO ligacoesFuncionario VALUES
(null, 30, 28, 93, 3, '00:3:21', 2),
(null, 20, 12, 60, 2, '00:05:20', 3),
(null, 40, 20, 50, 10, '00:02:32', 4),
(null, 50, 42, 84, 8, '00:02:02', 5),
(null, 12, 12, 100, 0, '00:03:30', 6);

-- Inserir registros na tabela registro
insert into registro values
(null, 120, current_timestamp(), 5),
(null, 100, current_timestamp(), 10);

-- Simulando registros de PPM para um funcionário da empresa 1 para cada hora do dia
INSERT INTO registro (registro, dtHora, fkHasComponente)
SELECT 
    ROUND(RAND() * 100), -- Valor aleatório de PPM (de 0 a 100)
    DATE_FORMAT(NOW() - INTERVAL HOUR(NOW()) HOUR + INTERVAL seq.seq HOUR, '%Y-%m-%d %H:00:00'), -- Horário específico para cada hora
    5 -- ID de um componente PPM específico
FROM (
    SELECT 0 AS seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION 
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION 
    SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION 
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
) seq;

INSERT INTO registro (registro, dtHora, fkHasComponente)
SELECT 
    CASE 
        WHEN seq.seq = 0 THEN 2 -- Valor para a primeira hora (0 horas)
        WHEN seq.seq = 1 THEN 2 -- Valor para a segunda hora (1 hora)
        WHEN seq.seq = 3 THEN 2 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 4 THEN 2 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 5 THEN 10 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 6 THEN 20 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 7 THEN 40 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 8 THEN 40 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 9 THEN 50 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 10 THEN 80 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 11 THEN 90 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 12 THEN 80 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 13 THEN 30 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 14 THEN 28 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 15 THEN 32 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 16 THEN 50 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 17 THEN 60 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 18 THEN 65 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 19 THEN 6 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 20 THEN 60 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 21 THEN 50 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 22 THEN 20 -- Valor para a terceira hora (2 horas)
        WHEN seq.seq = 23 THEN 20 -- Valor para a terceira hora (2 horas)
        -- ... adicione para as outras horas até 23
        ELSE 40 -- Valor padrão para as horas restantes
    END,
    DATE_FORMAT(DATE(NOW()) + INTERVAL seq.seq HOUR, '%Y-%m-%d %H:00:00'), -- Horário específico para cada hora
    5 -- ID de um componente PPM específico
FROM (
    SELECT 0 AS seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION 
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION 
    SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION 
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
) seq;
