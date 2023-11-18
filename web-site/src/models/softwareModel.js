var database = require("../database/config");

function insert(nome, categoria){
  let instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
     
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `insert into software (nomeSoftware, categoriaSoftware) values('${nome}', '${categoria}')`;

  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function listar(){
  let instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
     
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `select * from software`;

  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarDadosSoftware(id){
  let instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
     
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `select * from software where idSoftware = ${id}`;

  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarSoftware(dados){
  let instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
     
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `update software set nomeSoftware = '${dados.nome}', categoriaSoftware = '${dados.categoria}' where idSoftware = ${dados.id};`;

  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  insert,
  listar,
  listarDadosSoftware,
  editarSoftware
}