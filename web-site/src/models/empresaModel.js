var database = require("../database/config");

function buscarPorId(id) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from empresa where id = '${id}'`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from empresa where id = '${id}'`;
  }

  return database.executar(query);

}


function buscarPorCnpj(cnpj) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from empresa where cnpj = '${cnpj}'`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from empresa where cnpj = '${cnpj}'`;
  }

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;
  }

  return database.executar(query);
  
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
