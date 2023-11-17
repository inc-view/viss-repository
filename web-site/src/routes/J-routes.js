var express = require("express");
var router = express.Router();

var J_controller = require("../controllers/J-controller");

router.get("/ppmAtual", function (req, res) {
    J_controller.ppmAtual(req, res);
});

router.get("/ppmIdeal", function (req, res) {
    J_controller.ppmIdeal(req, res);
});

router.get("/atendimentoAtual", function (req, res) {
    J_controller.atendimentoAtual(req, res);
});

router.get("/atendimentoIdeal", function (req, res) {
    J_controller.atendimentoIdeal(req, res);
});

router.get("/graficoProdutividade", function (req, res) {
    J_controller.graficoProdutividade(req, res);
});

module.exports = router; 