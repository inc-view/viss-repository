var express = require("express");
var router = express.Router();

var infoFuncionarioDashController = require("../controllers/InfoFuncionarioDashController");

router.get("/ListagemDuracao", function (req, res) {
    infoFuncionarioDashController.ListagemDuracao(req, res);
});
router.get("/ListagemTMA", function (req, res) {
    infoFuncionarioDashController.ListagemTMA (req, res);
});
router.get("/fazerLista", function(req,res) {
    infoFuncionarioDashController.fazerLista(req,res);
});

router.get("/ListagemTotalChamadas", function(req,res) {
    infoFuncionarioDashController.ListagemTotalChamadas(req,res);
});


router.post("/fazerListaPorNome", function(req,res) {
    infoFuncionarioDashController.fazerListaPorNome(req,res);
});
router.post("/fazerGrafico", function(req,res) {
    infoFuncionarioDashController.fazerGrafico(req,res);
});


module.exports = router;