var softwareModel = require("../models/softwareModel");

function cadastrar(req, res){

  let nome = req.body.nome
  let categoria = req.body.categoria

  softwareModel.insert(nome, categoria).then(
    (response)=>{
      res.json(response)
      console.log("Cadastro software")
    }
  ).catch((error)=>{
    console.log("Error: cadastrarSoftware > " + error)
  })

}

function listar(req, res){
  softwareModel.listar()
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

function listarDadosSoftware(req, res){
  let id = req.body.id
  softwareModel.listarDadosSoftware(id)
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

function editarSoftware(req, res){
  let dadosEdicao = {
    "nome" : req.body.nome,
    "categoria":req.body.categoria,
    "id":req.body.id,
  }

  softwareModel.editarSoftware(dadosEdicao).then(
    (response)=>{
      if(response.affectedRows > 0){
        res.status(200).send("Update realizado")
      }else{
        res.status(400).send("Update não realizado")
      }
    }
    
  ).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  cadastrar,
  listar,
  listarDadosSoftware,
  editarSoftware
}