var express = require("express");
var router = express.Router();

var processoController = require("../controllers/e-processoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     empresaController.cadastrar(req, res);
// })

// router.get("/buscar", function (req, res) {
//     empresaController.buscarPorCnpj(req, res);
// });

// router.get("/buscar/:id", function (req, res) {
//   empresaController.buscarPorId(req, res);
// });

router.post("/listar", function (req, res) {
  processoController.listar(req, res);
});

router.post("/listarThree", function (req, res) {
  processoController.listarThree(req, res);
});

router.post("/getFirstLine", function (req, res) {
  processoController.getFirstLine(req, res);
});

router.post("/getSecondLine", function (req, res) {
  processoController.getSecondLine(req, res);
});

router.get("/count/:idEmpresa", function (req, res) {
  processoController.count(req, res);
});

module.exports = router;