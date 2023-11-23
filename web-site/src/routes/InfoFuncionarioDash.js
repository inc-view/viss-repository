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
router.get("/fazerListaProblema", function(req,res) {
    dashListagemController.fazerListaProblema(req,res);
});
router.post("/fazerListaPorNome", function(req,res) {
    dashListagemController.fazerListaPorNome(req,res);
});
router.get("/fazerListaCpuOnline", function(req,res) {
    dashListagemController.fazerListaCpuOnline(req,res);
});
router.get("/fazerListaCpuOffline", function(req,res) {
    dashListagemController.fazerListaCpuOffline(req,res);
});
router.get("/ListagemTotalComputadores", function(req, res){
        dashListagemController.ListagemTotalComputadores(req, res);
});
router.get("/ListagemCpusProblema", function(req, res){
    dashListagemController.ListagemCpuProblema(req, res);
});

module.exports = router;