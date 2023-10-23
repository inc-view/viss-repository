var express = require("express");
var router = express.Router();

var dashListagemController = require("../controllers//dashListagemController");

router.get("/ListagemCpuON", function (req, res) {
    dashListagemController.ListagemCpuON(req, res);
});
router.get("/ListagemCpuOff", function (req, res) {
    dashListagemController.ListagemCpuOff(req, res);
});
router.get("/fazerLista", function(req,res) {
    dashListagemController.fazerLista(req,res);
});

module.exports = router;