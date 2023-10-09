var express = require("express");
var router = express.Router();

const path = require('path')
const fs = require('fs');
const formidable = require('formidable');

var fileController = require("../controllers/fileController");


router.post("/arquivo", function(req, res){

  const options = {
    uploadDir: `${__dirname}/../../uploads`
  };
  const form = new formidable.IncomingForm(options);

  var newFilename = ''
  form.parse(req, (err, fields, files) => {

    if(files.fileCsv[0].mimetype.endsWith('csv')){

      if(err){
        res.status(400).send('Erro no processo de ler o arquivo')
        return;
      }

      newFilename = files.fileCsv[0].newFilename
      fileController.salvarDados(req, res, newFilename)
      
    }else{
      res.status(400).send("Arquivo inválido")
    }

  });
  
})

module.exports = router;
