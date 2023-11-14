var leandroModel = require("../models/leandroModel");

function dashboardGeral(req, res) {
    var idMaquina = req.params.idMaquina;
    leandroModel.dashboardGeral(idMaquina).then(function (resultado) {
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
function dashboardCpu(req, res) {
    var idMaquina = req.params.idMaquina;
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
    var idMaquina = req.params.idMaquina;
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
    var idMaquina = req.params.idMaquina;
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
    var idMaquina = req.params.idMaquina;
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

function dashboardGeralRAM(req, res){
    let idMaquina = req.params.idMaquina
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

    let idMaquina = req.params.idMaquina
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

function dashboardGeralCPU(req, res) {
    let idMaquina = req.params.idMaquina
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
}

//Individual Leandro

function dashboardMediaCpuDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.dashboardMediaCpuDay(idMaquina).then(
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

function dashboardMediaCpuMonth() {
    let idMaquina = req.params.idMaquina
    leandroModel.dashboardMediaCpuMonth(idMaquina).then(
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

function dashboardMediaMemoryDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.dashboardMediaMemoryDay(idMaquina).then(
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

function dashboardMediaMemoryMonth() {
    let idMaquina = req.params.idMaquina
    leandroModel.dashboardMediaMemoryMonth(idMaquina).then(
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

function getMediaCpuAllDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.getMediaCpuAllDay(idMaquina).then(
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

function getMediaCpuAllMonth() {
    let idMaquina = req.params.idMaquina
    leandroModel.getMediaCpuAllMonth(idMaquina).then(
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

function getMediaMemoryAllDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.getMediaMemoryAllDay(idMaquina).then(
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

function getMediaMemoryAllMonth() {
    let idMaquina = req.params.idMaquina
    leandroModel.getMediaMemoryAllMonth(idMaquina).then(
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

function kpiMediaCpuDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.kpiMediaCpuDay(idMaquina).then(
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

function kpiMediaCpuAllTime() {
    let idMaquina = req.params.idMaquina
    leandroModel.kpiMediaCpuAllTime(idMaquina).then(
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

function kpiMediaMemoryDay() {
    let idMaquina = req.params.idMaquina
    leandroModel.kpiMediaMemoryDay(idMaquina).then(
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

function kpiMediaMemoryAllTime() {
    let idMaquina = req.params.idMaquina
    leandroModel.kpiMediaMemoryAllTime(idMaquina).then(
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

module.exports = {
    dashboardGeral,
    dashboardCpu,
    dashboardGeralRAM,
    dashboardGeralCPU,
    dashboardGeralDISCO,
    dashboardMemory,
    dashboardDisk,
    infoMaquina,
    dashboardMediaCpuDay,
    dashboardMediaCpuMonth,
    dashboardMediaMemoryDay,
    dashboardMediaMemoryMonth,
    getMediaCpuAllDay,
    getMediaCpuAllMonth,
    getMediaMemoryAllDay,
    getMediaMemoryAllMonth,
    kpiMediaCpuDay,
    kpiMediaCpuAllTime,
    kpiMediaMemoryDay,
    kpiMediaMemoryAllTime
}