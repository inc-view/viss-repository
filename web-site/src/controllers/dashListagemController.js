var DashListagemModel = require("../models/DashListagemModel");

function ListagemCpuON(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.ListagemCpuON(fkEmpresa).then(function (resultado) {
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
function ListagemCpuOff(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.ListagemCpuOff(fkEmpresa).then(function (resultado) {
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
function ListagemCpuProblema(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.ListagemCpuProblema(fkEmpresa).then(function (resultado) {
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
function ListagemTotalComputadores(req, res){
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.ListagemTotalComputadores(fkEmpresa).then(function (resultado) {
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
function fazerLista(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.fazerLista(fkEmpresa).then(function (resultado) {
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
function fazerListaProblema(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.fazerListaProblema(fkEmpresa).then(function (resultado) {
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
function fazerListaCpuOffline(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.fazerListaCpuOffline(fkEmpresa).then(function (resultado) {
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

function fazerListaCpuOnline(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    DashListagemModel.fazerListaCpuOnline(fkEmpresa).then(function (resultado) {
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
    fazerLista,
    fazerListaCpuOffline,
    fazerListaCpuOnline,
    fazerListaProblema,
    ListagemCpuProblema,
    ListagemCpuON,
    ListagemCpuOff,
    ListagemTotalComputadores,
}