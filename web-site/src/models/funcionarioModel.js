const { query } = require("express");
const database = require("../database/config");

function insert(dados) {
  var querySql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `insert into funcionario(fkGestor, fkEmpresa, nome, email, cpf, telefone, senha)
    values(${dados.fkGestor}, ${dados.fkEmpresa}, '${dados.nome}', 
      '${dados.email}', '${dados.cpf}', '${dados.telefone}', '${dados.pass}')`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    querySql = `insert into funcionario(fkGestor, fkEmpresa, nome, email, cpf, telefone, senha)
    values(${dados.fkGestor}, ${dados.fkEmpresa}, '${dados.nome}', 
      '${dados.email}', '${dados.cpf}', '${dados.telefone}', '${dados.pass}')`;
  }

  return database.executar(querySql);
}


function listar(fkEmpresa) {
  var querySql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `select idFuncionario, fkEmpresa, nome, email, telefone from funcionario
                    where fkEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    querySql = `select idFuncionario, fkEmpresa, nome, email, telefone from funcionario
                    where fkEmpresa = ${fkEmpresa};`;
  }
  return database.executar(querySql);
}


function listarDadosFuncionario(id, fkEmpresa) {

  var querySql = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `select * from funcionario
                    where idFuncionario = ${id} and fkEmpresa = ${fkEmpresa};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    querySql = `select * from funcionario
    where idFuncionario = ${id} and fkEmpresa = ${fkEmpresa};`;
  }
  return database.executar(querySql);
}

function editarFuncionario(dados) {

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    querySql = `update funcionario
                    set nome = '${dados.nome}', email = '${dados.email}', telefone = '${dados.telefone}', senha = '${dados.senha}'
                    where idFuncionario = ${dados.id} and fkEmpresa = ${dados.empresa}`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    querySql = `update funcionario
      set nome = '${dados.nome}', email = '${dados.email}', telefone = '${dados.telefone}', senha = '${dados.senha}'
      where idFuncionario = ${dados.id} and fkEmpresa = ${dados.empresa}`;
  }

  return database.executar(querySql);
}

module.exports = {
  insert,
  listar,
  listarDadosFuncionario,
  editarFuncionario,
};
