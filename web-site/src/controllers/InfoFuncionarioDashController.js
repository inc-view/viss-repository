var infoFuncionarioDash = require("../models/InfoFuncionarioDashModel");

function ListagemTotalChamadas(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    infoFuncionarioDash.ListagemTotalChamadas(fkEmpresa).then(function (resultado) {
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

function ListagemTMA(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    infoFuncionarioDash.ListagemTMA(fkEmpresa).then(function (resultado) {
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
function ListagemDuracao(req, res) {
    var fkEmpresa = req.query.fkEmpresa;
    infoFuncionarioDash.ListagemDuracao(fkEmpresa).then(function (resultado) {
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
    infoFuncionarioDash.fazerLista(fkEmpresa).then(function (resultado) {
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

function fazerListaPorNome(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var nome = req.body.nome
    infoFuncionarioDash.fazerListaPorNome(fkEmpresa,nome).then(function (resultado) {
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
    fazerListaPorNome,
    ListagemDuracao,
    ListagemTotalChamadas,
    ListagemTMA,

}