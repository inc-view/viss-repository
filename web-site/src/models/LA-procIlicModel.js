const database = require("../database/config")


function buscarGraf1(fkEmpresa){
  if(process.env.AMBIENTE_PROCESSO == 'producao'){

  }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    var querySql = `CALL spSelectGraf1(${fkEmpresa});`
  }
  return database.executar(querySql)

}







module.exports = {
  buscarGraf1
}