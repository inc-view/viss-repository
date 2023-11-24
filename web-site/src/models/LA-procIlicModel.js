const database = require("../database/config")


function buscarGraf1(fkEmpresa){
  
  var querySql = `CALL spSelectGraf1(${fkEmpresa});`
  return database.executar(querySql)

}







module.exports = {
  buscarGraf1
}