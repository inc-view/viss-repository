const database = require("../database/config")

function insert(dados){

  var querySql = `insert into funcionario(fkGestor, fkEmpresa, nome, email, cpf, telefone, senha)
                  values(${dados.fkGestor}, ${dados.fkEmpresa}, '${dados.nome}', 
                    '${dados.email}', '${dados.cpf}', '${dados.telefone}', '${dados.pass}')` 

  return database.executar(querySql)

}


function listar(fkEmpresa){

  var querySql = `select idFuncionario, fkEmpresa, nome, email, telefone from funcionario
	                where fkEmpresa = ${fkEmpresa};`
  return database.executar(querySql)

}


function listarDadosFuncionario(id, fkEmpresa){

  var querySql = `select * from funcionario
                  where idFuncionario = ${id} and fkEmpresa = ${fkEmpresa};`
  return database.executar(querySql)

}


function editarFuncionario(dados){
  var querySql = `update funcionario
                  set nome = '${dados.nome}', email = '${dados.email}', telefone = '${dados.telefone}', senha = '${dados.senha}'
                  where idFuncionario = ${dados.id} and fkEmpresa = ${dados.empresa}`
  return database.executar(querySql)
}

module.exports = {
  insert,
  listar,
  listarDadosFuncionario,
  editarFuncionario
}