var express = require("express");
var router = express.Router();

var procIliController = require("../controllers/LA-procIliController");

router.get("/buscarGraf/:fkEmpresa", function (req, res) {
    procIliController.buscarGraf1(req, res);
});

router.get("/buscarKPI/:fkEmpresa", function (req, res) {
    procIliController.buscarKpi(req, res);
});


module.exports = router;