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

function dashboardMediaCpuDay(req, res) {
    let idMaquina = req.params.idMaquina
    let days = req.params.days
    leandroModel.dashboardMediaCpuDay(idMaquina, days).then(
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

function dashboardMediaCpuMonth(req, res) {
    let idMaquina = req.params.idMaquina
    let months = req.params.months
    leandroModel.dashboardMediaCpuMonth(idMaquina, months).then(
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

function dashboardMediaMemoryDay(req, res) {
    let idMaquina = req.params.idMaquina
    let days = req.params.days
    leandroModel.dashboardMediaMemoryDay(idMaquina, days).then(
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

function dashboardMediaMemoryMonth(req, res) {
    let idMaquina = req.params.idMaquina
    let months = req.params.months
    leandroModel.dashboardMediaMemoryMonth(idMaquina, months).then(
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

function getMediaCpuAllDay(req, res) {
    let idMaquina = req.params.idMaquina
    let days = req.params.days
    leandroModel.getMediaCpuAllDay(idMaquina, days).then(
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

function getMediaCpuAllMonth(req, res) {
    let idMaquina = req.params.idMaquina
    let months = req.params.months
    leandroModel.getMediaCpuAllMonth(idMaquina, months).then(
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

function getMediaMemoryAllDay(req, res) {
    let idMaquina = req.params.idMaquina
    let days = req.params.days
    leandroModel.getMediaMemoryAllDay(idMaquina, days).then(
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

function getMediaMemoryAllMonth(req, res) {
    let idMaquina = req.params.idMaquina
    let months = req.params.months
    leandroModel.getMediaMemoryAllMonth(idMaquina, months).then(
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

function kpiMediaCpuDay(req, res) {
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

function kpiMediaCpuAllTime(req, res) {
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

function kpiMediaMemoryDay(req, res) {
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

function kpiMediaMemoryAllTime(req, res) {
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