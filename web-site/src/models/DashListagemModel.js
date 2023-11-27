var database = require("../database/config");

function ListagemCpuON(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT COUNT(computador.Ativo) AS TotalDeComputadoresOnline
        FROM computador
        INNER JOIN funcionario ON computador.fkFuncionario = funcionario.idFuncionario
        WHERE computador.Ativo = 1 AND funcionario.fkEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT COUNT(Ativo) AS TotalDeComputadoresOnline
        FROM computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        WHERE ativo = 1 and funcionario.fkEmpresa = ${fkEmpresa}`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function ListagemCpuOff(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT COUNT(computador.Ativo) AS TotalDeComputadoresOnline
        FROM computador
        INNER JOIN funcionario ON computador.fkFuncionario = funcionario.idFuncionario
        WHERE computador.Ativo = 0 AND funcionario.fkEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT COUNT(Ativo) AS TotalDeComputadoresOfline
        FROM computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        WHERE ativo = 0 and funcionario.fkEmpresa = ${fkEmpresa}`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function ListagemCpuProblema(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT COUNT(DISTINCT computador.idComputador) as totalCpuProblema
        FROM registro
        JOIN hasComponente ON registro.fkHasComponente = hasComponente.idHasComponente
        JOIN computador ON hasComponente.fkComputador = computador.idComputador
        JOIN componente ON hasComponente.fkComponente = componente.idComponente
        JOIN funcionario ON registro.fkFuncionario = funcionario.idFuncionario
        WHERE 
            componente.tipo = 'cpu'
            AND registro.registro > 90
            AND registro.dtHora >= DATEADD(MINUTE, -10, GETDATE()) -- Substituído para SQL Server
            AND funcionario.fkEmpresa = ${fkEmpresa};
        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT  COUNT(distinct idComputador) as totalCpuProblema
        FROM registro
        JOIN hasComponente ON fkHasComponente = idHasComponente
        JOIN computador ON fkComputador = idComputador
        JOIN componente ON fkComponente = idComponente
        JOIN funcionario ON fkFuncionario = idFuncionario
        WHERE componente.tipo = 'cpu'
        AND registro.registro > 90
        AND registro.dtHora >= now() - interval 10 minute
        AND funcionario.fkEmpresa = ${fkEmpresa};`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ListagemTotalComputadores(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT COUNT(computador.idComputador) as totalComputadores
        FROM computador
        JOIN funcionario ON computador.fkFuncionario = funcionario.idFuncionario
        WHERE funcionario.fkEmpresa = ${fkEmpresa};
        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = ` select count(idComputador) as totalComputadores from computador
        join funcionario on computador.fkFuncionario = funcionario.idFuncionario
        where funcionario.fkEmpresa = ${fkEmpresa};`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function fazerLista(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador AS 'idComputador',
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT CONVERT(VARCHAR, MAX(r.dtHora), 108) + ' ' + CONVERT(VARCHAR, MAX(r.dtHora), 103)
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT TOP 1 r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            ORDER BY r.dtHora DESC
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa}
    ORDER BY PorcentagemCPU DESC;
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `
        SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador as "idComputador",
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT date_format(MAX(r.dtHora), ' %H:%i %d/%m/%Y ') 
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            LIMIT 1
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa}
    order by PorcentagemCpu desc;`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fazerListaCpuOffline(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = ``;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `
        SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador as "idComputador",
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT date_format(MAX(r.dtHora), ' %H:%i %d/%m/%Y ') 
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            LIMIT 1
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa} 
    order by c.ativo;    
        `;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fazerListaCpuOnline(fkEmpresa) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador AS 'idComputador',
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT FORMAT(MAX(r.dtHora), 'HH:mm dd/MM/yyyy')
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT TOP 1 r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            ORDER BY r.dtHora DESC
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa} 
    ORDER BY c.ativo;
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `
        SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador as "idComputador",
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT date_format(MAX(r.dtHora), ' %H:%i %d/%m/%Y ') 
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            LIMIT 1
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa} and c.ativo = 1;  
        `;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function fazerListaPorNome(fkEmpresa, nome) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `
        SELECT 
    f.nome AS 'NomeFuncionario',
    c.idComputador AS 'idComputador',
    c.ipComputador AS 'IpComputador',
    c.ativo AS 'Status',
    c.sistemaOperacional AS 'SistemaOperacional',
    (
        SELECT FORMAT(MAX(r.dtHora), 'HH:mm dd/MM/yyyy')
        FROM registro r
        WHERE r.fkHasComponente IN (
            SELECT hc.idHasComponente
            FROM hasComponente hc
            WHERE hc.fkComputador = c.idComputador
        )
    ) AS 'UltimaSessao',
    (
        SELECT TOP 1 r.registro
        FROM registro r
        JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
        JOIN componente comp ON hc.fkComponente = comp.idComponente
        WHERE comp.tipo = 'CPU' AND r.dtHora = (
            SELECT MAX(r2.dtHora)
            FROM registro r2
            JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
            WHERE hc2.fkComputador = c.idComputador
            AND comp.tipo = 'CPU'
        )
        ORDER BY r.dtHora DESC
    ) AS 'PorcentagemCPU'
FROM computador c
JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
WHERE f.fkEmpresa = ${fkEmpresa} AND f.nome LIKE '%${nome}%';
`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `
        SELECT 
        f.nome AS 'NomeFuncionario',
        c.idComputador as "idComputador",
        c.ipComputador AS 'IpComputador',
        c.ativo AS 'Status',
        c.sistemaOperacional AS 'SistemaOperacional',
        (
            SELECT date_format(MAX(r.dtHora), ' %H:%i %d/%m/%Y ') 
            FROM registro r
            WHERE r.fkHasComponente IN (
                SELECT hc.idHasComponente
                FROM hasComponente hc
                WHERE hc.fkComputador = c.idComputador
            )
        ) AS 'UltimaSessao',
        (
            SELECT r.registro
            FROM registro r
            JOIN hasComponente hc ON r.fkHasComponente = hc.idHasComponente
            JOIN componente comp ON hc.fkComponente = comp.idComponente
            WHERE comp.tipo = 'CPU' AND r.dtHora = (
                SELECT MAX(r2.dtHora)
                FROM registro r2
                JOIN hasComponente hc2 ON r2.fkHasComponente = hc2.idHasComponente
                WHERE hc2.fkComputador = c.idComputador
                AND comp.tipo = 'CPU'
            )
            LIMIT 1
        ) AS 'PorcentagemCPU'
    FROM computador c
    JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
    WHERE f.fkEmpresa = ${fkEmpresa} and f.nome like '%${nome}%'
    ; 
        `;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  fazerLista,
  fazerListaPorNome,
  fazerListaCpuOffline,
  fazerListaCpuOnline,
  ListagemCpuProblema,
  ListagemCpuON,
  ListagemCpuOff,
  ListagemTotalComputadores,
};
