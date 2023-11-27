var express = require("express");
var router = express.Router();

var dashListagemController = require("../controllers/InfoFuncionarioDashController");

router.get("/ListagemCpuON", function (req, res) {
    dashListagemController.ListagemCpuON(req, res);
});
router.get("/ListagemCpuOff", function (req, res) {
    dashListagemController.ListagemCpuOff(req, res);
});
router.get("/fazerLista", function(req,res) {
    dashListagemController.fazerLista(req,res);
});

router.post("/fazerListaPorNome", function(req,res) {
    dashListagemController.fazerListaPorNome(req,res);
});

router.get("/ListagemTotalComputadores", function(req, res){
        dashListagemController.ListagemTotalComputadores(req, res);
});
router.get("/ListagemCpusProblema", function(req, res){
    dashListagemController.ListagemCpuProblema(req, res);
});

module.exports = router;