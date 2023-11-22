var express = require("express");
var router = express.Router();

var leandroController = require("../controllers/leandroController");

router.get("/dashboardGeralCPU/:idMaquina", function (req, res) {
    leandroController.dashboardGeralCPU(req, res);
});

router.get("/dashboardGeralRAM/:idMaquina", function (req, res) {
    leandroController.dashboardGeralRAM(req, res);
});

router.get("/dashboardGeralDISCO/:idMaquina", function (req, res) {
    leandroController.dashboardGeralDISCO(req, res);
});

router.get("/dashboardCpu/:idMaquina", function (req, res) {
    leandroController.dashboardCpu(req, res);
});

router.get("/dashboardMemory/:idMaquina", function (req, res) {
    leandroController.dashboardMemory(req, res);
});

router.get("/dashboardDisk/:idMaquina", function (req, res) {
    leandroController.dashboardDisk(req, res);
});

router.get("/infoMaquina/:idMaquina", function (req, res) {
    leandroController.infoMaquina(req, res);
});

//Individual Leandro

router.get("/dashboardMediaCpuDay/:idMaquina", function (req, res) {
    leandroController.dashboardMediaCpuDay(req, res);
});

router.get("/dashboardMediaCpuMonth/:idMaquina", function (req, res) {
    leandroController.dashboardMediaCpuMonth(req, res);
});

router.get("/dashboardMediaMemoryDay/:idMaquina", function (req, res) {
    leandroController.dashboardMediaMemoryDay(req, res);
});

router.get("/dashboardMediaMemoryMonth/:idMaquina", function (req, res) {
    leandroController.dashboardMediaMemoryMonth(req, res);
});

router.get("/getMediaCpuAllDay/:idMaquina", function (req, res) {
    leandroController.getMediaCpuAllDay(req, res);
});

router.get("/getMediaCpuAllMonth/:idMaquina", function (req, res) {
    leandroController.getMediaCpuAllMonth(req, res);
});

router.get("/getMediaMemoryAllDay/:idMaquina", function (req, res) {
    leandroController.getMediaMemoryAllDay(req, res);
});

router.get("/getMediaMemoryAllMonth/:idMaquina", function (req, res) {
    leandroController.getMediaMemoryAllMonth(req, res);
});

router.get("/kpiMediaCpuDay", function (req, res) {
    leandroController.kpiMediaCpuDay(req, res);
});

router.get("/kpiMediaCpuAllTime", function (req, res) {
    leandroController.kpiMediaCpuAllTime(req, res);
});

router.get("/kpiMediaMemoryDay", function (req, res) {
    leandroController.kpiMediaMemoryDay(req, res);
});

router.get("/kpiMediaMemoryAllTime", function (req, res) {
    leandroController.kpiMediaMemoryAllTime(req, res);
});

module.exports = router;