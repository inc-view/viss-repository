var express = require("express");
var router = express.Router();

var leandroController = require("../controllers/leandroController");

router.get("/dashboardGeral", function (req, res) {
    leandroController.dashboardGeral(req, res);
});

router.get("/dashboardCpu", function (req, res) {
    leandroController.dashboardCpu(req, res);
});

router.get("/dashboardMemory", function (req, res) {
    leandroController.dashboardMemory(req, res);
});

router.get("/dashboardDisk", function (req, res) {
    leandroController.dashboardDisk(req, res);
});

router.get("/infoMaquina", function (req, res) {
    leandroController.infoMaquina(req, res);
});

module.exports = router;