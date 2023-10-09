var database = require("../database/config");

function insertBatch(data){
  
  // for(row in data){
  //   var instrucao = `INSERT INTO funcionario (idFuncionario, fkGestor, fkEmpresa, nome, email, cpf, telefone, senha)
  //                   VALUES ${data[row]}`
  //   database.executar(instrucao)
  // }

  var instrucao = `INSERT INTO funcionario (idFuncionario, fkGestor, fkEmpresa, nome, email, cpf, telefone, senha)
                  VALUES ${data}`
  return database.executar(instrucao)
  
}

module.exports = { 
  insertBatch
};
