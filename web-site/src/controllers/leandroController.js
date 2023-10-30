var leandroModel = require("../models/leandroModel");

function dashboardGeralCPU(req, res) {
    let idMaquina = req.params.id

    leandroModel.dadosCPU(idMaquina).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


    // 

    // 

}

function dashboardGeralRAM(req, res){
    let idMaquina = req.params.id
    leandroModel.dadosMEM(idMaquina).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                }
                   
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    
}


function dashboardGeralDISCO(req, res){

    let idMaquina = req.params.id
    leandroModel.dadosDisco(idMaquina).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    
}




function dashboardCpu(req, res) {
    let idMaquina = req.params.id
    leandroModel.dashboardCpu(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
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

function dashboardMemory(req, res) {
    let idMaquina = req.params.id
    leandroModel.dashboardMemory(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
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

function dashboardDisk(req, res) {
    let idMaquina = req.params.id
    leandroModel.dashboardDisk(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
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

function infoMaquina(req, res) {
    let idMaquina = req.params.id
    leandroModel.infoMaquina(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
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
    dashboardGeralCPU,
    dashboardGeralRAM,
    dashboardGeralDISCO,
    
    dashboardCpu,
    dashboardMemory,
    dashboardDisk,
    infoMaquina
}