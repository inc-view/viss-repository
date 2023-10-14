var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController")

router.post("/cadastrar", (req, res)=>{
  funcionarioController.cadastrarFuncionario(req, res);
});

router.get("/listar/:fkEmpresa", (req, res)=>{
  funcionarioController.listarFuncionario(req, res);
});

module.exports = router;
