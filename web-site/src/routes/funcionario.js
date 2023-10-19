var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController")

router.post("/cadastrar", (req, res)=>{
  funcionarioController.cadastrarFuncionario(req, res);
});

router.get("/listar/:fkEmpresa", (req, res)=>{
  funcionarioController.listarFuncionario(req, res);
});

router.post("/listarFuncionario", (req, res)=>{
  funcionarioController.listarFuncionarioEdit(req, res);
})

router.post("/editarFuncionario", (req, res)=>{
  funcionarioController.editarFuncionario(req, res);
})

module.exports = router;
