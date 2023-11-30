
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 80;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

var empresasRouter = require("./src/routes/empresas");
var fileRouter = require("./src/routes/files");
var funcionarioRouter = require("./src/routes/funcionario")
var softwareRouter = require("./src/routes/software")
    
var procIliRouter = require("./src/routes/LA-procIli");
var eProcessoRouter = require("./src/routes/e-processos")


// Meus Route's
var dashListagemRouter = require("./src/routes/routeDashListagem")
var leandroRouter = require("./src/routes/routeLeandro")


// Route Breno
var dashAlertasCpuRouter = require("./src/routes/routeDashAlertasCpu")

var infoFuncionarioDashRouter = require("./src/routes/InfoFuncionarioDash")


// João Route´s
var Jroutes = require("./src/routes/J-routes")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

app.use("/empresas", empresasRouter);
app.use("/files", fileRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/software", softwareRouter);

app.use("/procIlic", procIliRouter);
app.use("/processo", eProcessoRouter);


// Meus Route's
app.use("/routeDashListagem",dashListagemRouter )
app.use("/routeLeandro", leandroRouter)
app.use("/infoFuncionarioDash",infoFuncionarioDashRouter )


// Route Breno
app.use("/routeDashAlertasCpu", dashAlertasCpuRouter)

// João Route's
app.use("/J-routes", Jroutes )



app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});