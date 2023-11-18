var express = require("express");
var router = express.Router();

var softwareController = require("../controllers/softwareController.js");

router.get("/listar", function (req, res) {
  softwareController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
  softwareController.cadastrar(req, res);
});

router.post("/listarDadosSoftware", function (req, res) {
  softwareController.listarDadosSoftware(req, res);
});

router.post("/editarSoftware", function (req, res) {
  softwareController.editarSoftware(req, res);
});


module.exports = router;