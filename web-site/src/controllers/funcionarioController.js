const { response } = require("express")
var funcionarioModel = require("../models/funcionarioModel")

function cadastrarFuncionario(req, res){

  var dados = {
    "nome": req.body.nome,
    "cpf": req.body.cpf,
    "telefone": req.body.telefone,
    "email": req.body.email,
    "pass": req.body.senha,
    "fkGestor": req.body.fkGestor,
    "fkEmpresa": req.body.fkEmpresa
  }

  funcionarioModel.insert(dados)
  .then((response)=>{
    res.json(response)
    console.log("Inserido com sucesso" + response)
  })
  .catch((error)=>{
    console.log("Error: cadastrarFuncionario > " + error)
  })

}


function listarFuncionario(req, res){

  var fkEmpresa = req.params.fkEmpresa

  funcionarioModel.listar(fkEmpresa)
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


function listarFuncionarioEdit(req, res){

  let id = req.body.id
  let empresa = req.body.empresa

  funcionarioModel.listarDadosFuncionario(id, empresa)
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


function editarFuncionario(req, res){

  let dadosEdicao = {
    "nome" : req.body.nome,
    "telefone":req.body.telefone,
    "email":req.body.email,
    "pass":req.body.pass,
    "id":req.body.id,
    "empresa":req.body.empresa
  }

  funcionarioModel.editarFuncionario(dadosEdicao).then(
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

module.exports ={
  cadastrarFuncionario,
  listarFuncionario,
  listarFuncionarioEdit,
  editarFuncionario
}
