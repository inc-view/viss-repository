var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/informacoes/:idUsuario", function (req, res) {
    usuarioController.informacoes(req, res);
});
router.get("/verificarCodEmpresa/:codEmpresa", function (req, res) {
    usuarioController.verificarCodEmpresa(req, res);
});
module.exports = router;