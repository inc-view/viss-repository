var dashAlertasCpuModel = require("../models/dashAlertasCpuModel");

function dashboardAlertasCpu(req, res) {
    var idMaquina = req.params.idMaquina;
    dashAlertasCpuModel.dashboardAlertasCpu(idMaquina).then(function (resultado) {
        if (resultado.length > 5) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    dashboardAlertasCpu
}