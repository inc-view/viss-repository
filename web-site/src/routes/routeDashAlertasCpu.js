var express = require("express");
var router = express.Router();

var dashAlertasCpuController = require("../controllers/dashAlertasCpuController");

router.get("/dashboardAlertasCpu/:idMaquina", function (req, res) {
    dashAlertasCpuController.dashboardCpuAlertasCpu(req, res);
});

module.exports = router;