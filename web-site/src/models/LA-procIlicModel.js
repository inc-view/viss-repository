const database = require("../database/config")


function buscarGraf1(fkEmpresa){
  
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `EXEC spSelectGraf1 @vFkEmpresa = ${fkEmpresa};`
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `CALL spSelectGraf1(${fkEmpresa});`
  }
  return database.executar(querySql)

}

function buscarKpi(fkEmpresa){
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `EXEC spSelectKPI @vFkEmpresa = ${fkEmpresa};`
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `CALL spSelectKPI(${fkEmpresa});`
  }
  return database.executar(querySql)
}

function buscarKpi2(fkEmpresa){
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `SELECT COUNT(DISTINCT s.nomeSoftware) AS qtde FROM software AS s
    JOIN softwarePermitido AS sp ON sp.fkSoftware = s.idSoftware
    JOIN computador AS c ON c.idComputador = sp.fkComputador 
    JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario WHERE f.fkEmpresa = ${fkEmpresa};`
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `SELECT COUNT(DISTINCT(s.nomeSoftware)) AS qtde FROM software AS s
    JOIN softwarePermitido AS sp ON sp.fkSoftware = s.idSoftware
    JOIN computador AS c ON c.idComputador = sp.fkComputador 
    JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario WHERE f.fkEmpresa = ${fkEmpresa};`
  }
  return database.executar(querySql)
}
function buscarKpi3(fkEmpresa){
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `SELECT COUNT(distinct(f.nome)) AS contagem, 
    (SELECT COUNT(distinct(fN.email)) FROM funcionario AS fN WHERE fkEmpresa = ${fkEmpresa}) AS totalFunc
        FROM processoIlicito AS p
        JOIN softwarePermitido AS sp ON sp.idSoftwarePermitido = p.fkSoftware 
        JOIN software AS s ON s.idSoftware = sp.fkSoftware 
        JOIN computador AS c ON sp.fkComputador = c.idComputador 
        JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario
        WHERE f.fkEmpresa = ${fkEmpresa};
    `
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `SELECT COUNT(distinct(f.nome)) AS contagem, 
    (SELECT COUNT(distinct(fN.email)) FROM funcionario AS fN WHERE fkEmpresa = ${fkEmpresa}) AS totalFunc
        FROM processoIlicito AS p
        JOIN softwarePermitido AS sp ON sp.idSoftwarePermitido = p.fkSoftware 
        JOIN software AS s ON s.idSoftware = sp.fkSoftware 
        JOIN computador AS c ON sp.fkComputador = c.idComputador 
        JOIN funcionario AS f ON f.idFuncionario = c.fkFuncionario
        WHERE f.fkEmpresa = ${fkEmpresa};`
  }
  return database.executar(querySql)
}

module.exports = {
  buscarGraf1,
  buscarKpi,
  buscarKpi2,
  buscarKpi3
}