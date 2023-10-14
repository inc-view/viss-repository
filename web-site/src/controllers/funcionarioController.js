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

module.exports ={
  cadastrarFuncionario,
  listarFuncionario
}
