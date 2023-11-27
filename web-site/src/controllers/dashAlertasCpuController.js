var dashAlertasCpuModel = require("../models/dashAlertasCpuModel");

function dashboardAlertasCpu(req, res) {
    var idMaquina = req.params.idMaquina;
    dashAlertasCpuModel.dashboardAlertasCpu(idMaquina).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarOcorrenciaMes(req, res) {
    var idMaquina = req.body.idMaquina;
    var mes = req.body.month;
    var empresa = req.body.fkEmpresa;

    dashAlertasCpuModel.listarOcorrenciaMes(mes).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    dashboardAlertasCpu,
    listarOcorrenciaMes
}