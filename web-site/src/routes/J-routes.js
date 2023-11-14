var express = require("express");
var router = express.Router();

var dashListagemController = require("../controllers/J-controller");

router.get("/kpisProdutividade", function (req, res) {
    dashListagemController.kpisProdutividade(req, res);
});

module.exports = router;