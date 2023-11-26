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


module.exports = {
  buscarGraf1
}