const formidable = require('formidable');
var express = require("express");
var router = express.Router();

var fileController = require("../controllers/fileController.js");


router.post("/arquivo", function(req, res, next){

  const path = require('path')
  const fs = require('fs');
  const formidable = require('formidable');


  const options = {
    filter: function ({name, originalFilename, mimetype}) {
      return mimetype && mimetype.includes("csv");
    }
  };

  const form = new formidable.IncomingForm(options);

  form.parse(req, (err, fields, files) => {
    var newName = files.fileCsv[0].newFilename
    var oldpath = files.fileCsv[0].filepath
    var newpath = path.join(__dirname, '../../uploads', `${newName}.csv`)
    fs.renameSync(oldpath, newpath);
    res.send('File uploaded and moved!');
  });


})


module.exports = router;
