var database = require("../database/config");

function listar(orderBy, fkEmpresa) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from listProcessData where fkEmpresa = ${fkEmpresa} order by ${orderBy} desc;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from listProcessData where fkEmpresa = ${fkEmpresa} order by \`${orderBy}\` desc;`;
  }

  console.log(query)
  return database.executar(query);
}

function listarThree(orderBy, fkEmpresa) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select TOP 3 * from listProcessData where fkEmpresa = ${fkEmpresa} order by ${orderBy} desc;`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from listProcessData where fkEmpresa = ${fkEmpresa} order by \`${orderBy}\` desc limit 3;`;
  }

  console.log(query)

  return database.executar(query);
}


function count(fkEmpresa) {

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select count(*) as qtde from listProcessData where fkEmpresa = ${fkEmpresa}`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select count(*) as qtde from listProcessData where fkEmpresa = ${fkEmpresa}`;
  }

  console.log(query)

  return database.executar(query);
}


function getFirstLine(fkProcesso, fkEmpresa) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from listDataOneProcess where fkProcesso = ${fkProcesso};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from listDataOneProcess where fkProcesso = ${fkProcesso} and fkEmpresa = ${fkEmpresa};`;
  }
  console.log(query)

  return database.executar(query);
}

function getSecondLine(fkProcesso, fkEmpresa) {

  var query = ""

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    query = `select * from listDataOneProcess where fkProcesso = ${fkProcesso};`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    query = `select * from listDataOneProcess where fkProcesso = ${fkProcesso} and fkEmpresa = ${fkEmpresa};`;
  }

  console.log(query)

  return database.executar(query);
}

module.exports = { 
  listar,
  listarThree,
  count,
  getFirstLine,
  getSecondLine
};
