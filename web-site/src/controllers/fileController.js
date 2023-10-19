const csv = require("csvtojson");
const fs = require("fs");

var fileModel = require("../models/fileModel");

function salvarDados(req, res, fileName) {

  var filePath = `${__dirname}../../../uploads/${fileName}`;
  csv()
    .fromFile(filePath)
    .then((data) => {
      var valuesInsert = [];
      for (row in data) {
        valuesInsert.push(
          `(null, NULL, 1, '${data[row].nome}', '${data[row].email}', '${data[row].cpf}', '${data[row].telefone}', '${data[row].senha}')`
        );
      }

      fileModel
        .insertBatch(valuesInsert)
        .then((result) => {

          if (result) {
            res.redirect('http://localhost:3333/dashboard/crud-funcionario.html')
            res.status(200);
          }

        })
        .catch((error) => {
          res.status(400).send(`${error}`);
        });
    })
    .catch((error) => {
      res.status(400).send(`Error -> fileController ${error}`);
    });
}


module.exports = {
  salvarDados,
};
