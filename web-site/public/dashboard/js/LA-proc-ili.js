var fkEmpresa = localStorage.getItem("FK_EMPRESA");
let proximaAtualizacao;
 // Criando estrutura para plotar gráfico - labels
 var labelsGraf1 = [];

 // Criando estrutura para plotar gráfico - dados
     var dadosGraf1 = {
         labels: labelsGraf1,
         datasets: [{
         label: 'Qtde Registros',
         data: [],
         backgroundColor: '#0097B2',
         borderColor: '#0097B2',
         tension: 0.1
     }]
     };

     const config = {
        type: 'bar',
        data: dadosGraf1,
        options: {
            animation: false, // Desabilita as animações
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        maxTicksLimit: 7 // Defina o número máximo de rótulos que deseja exibir
                    }
                }
            } 
        }
    };

    // Adicionando gráfico criado em div na tela
    var myChart;

function obterDadosGrafico() {
    if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }
        
        fetch(`/procIlic/buscarGraf/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos:`, resposta);
                    
                    resposta.reverse();
                    
                    plotarGrafico(resposta);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    // Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
    // Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
    // A função *plotarGrafico* também invoca a função *atualizarGrafico*
    function plotarGrafico(resposta) {

        console.log('iniciando plotagem do gráfico...');

        console.log('----------------------------------------------')
        console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
        console.log(resposta)

       var dados_tratados = resposta[1];

        // Inserindo valores recebidos em estrutura para plotar o gráfico
       for (i = 0; i < dados_tratados.length; i++) {
        labelsGraf1.push(dados_tratados[i].data_hora);
            dadosGraf1.datasets[0].data.push(dados_tratados[i].contagem);

        }


        console.log('----------------------------------------------')
        console.log('O gráfico será plotado com os respectivos valores:')
        console.log('Labels:')
        console.log(labelsGraf1)
        console.log('Dados:')
        console.log(dadosGraf1.datasets)
        console.log('----------------------------------------------')
        
        myChart = new Chart(
        document.getElementById(`grafProcIlic`),
        config
    );
        // Criando estrutura para plotar gráfico - config
        
        setInterval(() => atualizarGrafico(fkEmpresa, dadosGraf1, myChart), 3000);
    }


    // Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
    // buscando a última medida inserida em tabela contendo as capturas, 
var dadosTeste;
var novoRegistroTeste;
var valorAntigo;
var valorNovo;
    //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
    //     Para ajustar o "select", ajuste o comando sql em src/models
    function atualizarGrafico(fkEmpresa, dados, myChart) {
        fetch(`/procIlic/buscarGraf/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {
                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico:`);
                    console.log(dados);
                    novoRegistroTeste = novoRegistro;
                     valorAntigo = dados.datasets[0].data;
                     valorNovo = novoRegistro[0];
                    
                    if (!(novoRegistro[0].data_hora == dados.labels[dados.labels.length - 1] || novoRegistro[0].data_hora == undefined) ) {
                        // tirando e colocando valores no gráfico
                        if(dadosGraf1.datasets[0].data != null || dadosGraf1.datasets[0].data != undefined){
                            dados.labels.shift(); // apagar o primeiro
                        }
                        console.log("============")
                        console.log("Novo registro" , novoRegistro)
                        console.log("==============")
                        dados.labels.push(novoRegistro[0].data_hora); 

                        dados.datasets[0].data.shift();  
                        dados.datasets[0].data.push(novoRegistro[0].contagem); // incluir uma nova medida de umidade

                        myChart.update();
                        
                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setInterval(() => atualizarGrafico(fkEmpresa, dados, myChart), 3000);
                    
                    }else{
                        for(var i = 0; i < valorAntigo.length; i++){
                            console.log("VALOR ANTIGO - ", valorAntigo)
                            console.log("VALOR NOVO - ", valorNovo)
    
                            for(var contador = 0; contador < valorAntigo.length; contador++){
                             if(valorNovo[i] != valorAntigo[i] && valorAntigo != undefined){
                                console.log("ENCONTREI", valorAntigo[i], valorNovo[i].contagem)
                                //dados.datasets[0].data[contador].contagem = novoRegistro[0].contagem;
                                myChart.data.datasets[0].data[i] = valorNovo[i].contagem;
                                myChart.update();
                             }
                            }
                        }
                        console.log("---------------------------------------------------------------")
                        console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                        console.log("Horário do novo dado capturado:")
                        console.log(novoRegistro[0].data_hora)
                        console.log("Horário do último dado capturado:")
                        console.log(dados.labels[dados.labels.length - 1])
                        console.log("---------------------------------------------------------------")
                        }

                    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setInterval(() => atualizarGrafico(fkEmpresa, dados, myChart), 3000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }