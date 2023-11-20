const { response } = require("express")
var processoModel = require("../models/e-processoModel")


function listar(req, res){

  let orderByQuery = req.body.orderby
  let fkEmpresa = req.body.empresa

  processoModel.listar(orderByQuery, fkEmpresa)
  .then((response)=>{

    if(response.length > 0){
      res.status(200).json(response)
    }else{
      res.status(204).send('Nenhum resultado encontrado')
    }


  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}

function listarThree(req, res){

  let orderByQuery = req.body.orderby
  let fkEmpresa = req.body.empresa

  processoModel.listarThree(orderByQuery, fkEmpresa)
  .then((response)=>{

    if(response.length > 0){
      res.status(200).json(response)
    }else{
      res.status(204).send('Nenhum resultado encontrado')
    }


  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}



function count(req, res){

  let id = req.params.idEmpresa
 
  processoModel.count(id)
  .then((response)=>{

    if(response.length > 0){
      res.status(200).json(response)
    }else{
      res.status(204).send('Nenhum resultado encontrado')
    }


  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}



module.exports ={
  listar,
  listarThree,
  count
}
