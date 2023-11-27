const database = require("../database/config")


function buscarGraf1(fkEmpresa){
  
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `EXEC spSelectGraf1 @fkEmpresa = ${fkEmpresa};`
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `CALL spSelectGraf1(${fkEmpresa});`
  }
  return database.executar(querySql)

}

function buscarKpi(fkEmpresa){
  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `EXEC spSelectKPI @fkEmpresa = ${fkEmpresa};`
  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    querySql = `CALL spSelectKPI(${fkEmpresa});`
  }
  return database.executar(querySql)
}


module.exports = {
  buscarGraf1,
  buscarKpi
}