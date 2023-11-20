var database = require("../database/config");

function listar(orderBy, fkEmpresa) {
  var query = `select * from listProcessData where fkEmpresa = ${fkEmpresa} order by \`${orderBy}\` desc;`;
  console.log(query)

  return database.executar(query);
}

function listarThree(orderBy, fkEmpresa) {
  var query = `select * from listProcessData where fkEmpresa = ${fkEmpresa} order by \`${orderBy}\` desc limit 3;`;
  console.log(query)

  return database.executar(query);
}


function count(fkEmpresa) {
  var query = `select count(*) as qtde from listProcessData where fkEmpresa = ${fkEmpresa}`;
  console.log(query)

  return database.executar(query);
}

module.exports = { 
  listar,
  listarThree,
  count
};
