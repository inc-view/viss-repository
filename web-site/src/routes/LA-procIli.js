var express = require("express");
var router = express.Router();

var procIliController = require("../controllers/LA-procIliController");

router.get("/buscarGraf/:fkEmpresa", function (req, res) {
    procIliController.buscarGraf1(req, res);
});

router.get("/buscarKPI/:fkEmpresa", function (req, res) {
    procIliController.buscarKpi(req, res);
});

router.get("/buscarKPI2/:fkEmpresa", function (req, res) {
    procIliController.buscarKpi2(req, res);
});

router.get("/buscarKPI3/:fkEmpresa", function (req, res) {
    procIliController.buscarKpi3(req, res);
});

module.exports = router;