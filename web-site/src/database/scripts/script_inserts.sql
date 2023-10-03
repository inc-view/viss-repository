use inkView;
-- Inserir registros na tabela endereco
INSERT INTO `endereco` (`idEndereco`, `complemento`, `cep`, `descricao`) VALUES
(null, 'Setor de Atendimento ao Cliente', '54321987', 'Localizada em um bairro comercial movimentado, próxima a restaurantes e lojas locais.'),
(null, 'Setor de Suporte Técnico', '12345678', 'Situada em uma área empresarial, com fácil acesso a serviços de transporte público e proximidade a um parque.'),
(null, 'Central de Atendimento 24 Horas', '87654321', 'Estrategicamente localizada no centro da cidade, com diversos hotéis e opções de alimentação nas proximidades.'),
(null, 'Área de Treinamento', '23456789', 'Próxima a uma universidade, com acesso a livrarias e cafeterias que oferecem um ambiente acadêmico inspirador.'),
(null, 'Sala de Supervisão', '34567890', ' Localizada em um edifício corporativo moderno no coração do distrito financeiro, com vista para arranha-céus e avenidas movimentadas.');

-- Inserir registros na tabela empresa
INSERT INTO `empresa` (`idEmpresa`, `razaoSocial`, `cnpj`, `email`, `fkEndereco`, `fkSede`) VALUES
(null, 'Call Center ABC', '12345678901234', 'contato@callcenterabc.com', 1, NULL),
(null, 'Call Center XYZ', '98765432109876', 'info@callcenterxyz.com', 2, NULL),
(null, 'Call Center 123', '56789012345678', 'support@callcenter123.com', 3, NULL);

-- Inserir registros na tabela funcionario
INSERT INTO `funcionario` (`idFuncionario`, `fkGestor`, `fkEmpresa`, `nome`, `email`, `cpf`, `telefone`, `senha`) VALUES
(null, NULL, 1, 'João Silva', 'joao@callcenterabc.com', '12345678901', '(11) 1234-5678', 'senha123'),
(null, NULL, 1, 'Maria Santos', 'maria@callcenterabc.com', '98765432109', '(11) 5678-1234', 'senha456'),
(null, NULL, 2, 'Pedro Almeida', 'pedro@callcenterxyz.com', '56789012345', '(22) 3456-7890', 'senha789');

-- Inserir registros na tabela computadores
INSERT INTO `computador` (`idComputador`, `nomePatrimonio`, `marca`, `fkFuncionario`, `sistemaOperacional`) VALUES 
(null, 'PC001', 'Dell', 1, 'Windows 10'),
(null, 'PC002', 'HP', 2, 'Ubuntu 20.04 LTS'),
(null, 'PC003', 'Lenovo', 3, 'Windows 11');

-- Inserir registros na tabela unidadeMedida
INSERT INTO `unidadeMedida` (`idUnidadeMedida`, `tipoMedida`) VALUES 
(null, '%'),
(null, 'GHz'),
(null, 'GB'),
(null, 'MB'),
(null, 'KB/s');

-- Inserir registros na tabela componentes
INSERT INTO `componente` (`idComponente`, `tipo`, `fkUnidadeMedida`) VALUES 
(null, 'CPU', 1),
(null, 'Memoria', 2), 
(null, 'Disco', 3), 
(null, 'Upload', 5);