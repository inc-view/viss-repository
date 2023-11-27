var procIlicModel = require("../models/LA-procIlicModel");


function buscarGraf1(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    if(fkEmpresa == undefined) {
        res.status(400).send("Seu FKEmpresa está Undefined");
    }
    else{
        procIlicModel.buscarGraf1(fkEmpresa)
        .then(
            function(resultado){
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }
        ).catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
            console.error("Erro na consulta")
        })
    }

}

function buscarKpi(req, res){
    var fkEmpresa = req.params.fkEmpresa
    if(fkEmpresa == undefined) {
        res.status(400).send("Seu FKEmpresa está Undefined");
    }
    else{
        procIlicModel.buscarKpi(fkEmpresa)
        .then(
            function(resultado){
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }
        ).catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
            console.error("Erro na consulta")
        })
    }
}
module.exports = {
    buscarGraf1,
    buscarKpi
}