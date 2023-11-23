var express = require("express");
var router = express.Router();

var dashAlertasCpuController = require("../controllers/dashAlertasCpuController");

router.get("/dashboardAlertasCpu/:idMaquina", function (req, res) {
    dashAlertasCpuController.dashboardAlertasCpu(req, res);
});

module.exports = router;