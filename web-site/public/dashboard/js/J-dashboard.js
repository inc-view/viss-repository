function ppmAtual() {
  var valor = localStorage.getItem("FK_EMPRESA");
  console.log(valor);
  //mandar a variavel valor o J-route
  fetch(`/J-routes/ppmAtual?empresa=${valor}`, { cache: "no-store" }).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
          // PUXAR ROTA COM ESSE SELECT
          // a resposta é [ { 'round(AVG(registro), 0)': '110' } ], quero ela sem casas decimais
          document.getElementById("ppmAtual").innerHTML =
            resposta[0]["media_PPM"];
        });
      } else {
        console.warn("Nenhum dado encontrado ou erro na API");
      }
    }
  );
}

function ppmIdeal() {
  var valor = localStorage.getItem("FK_EMPRESA");
  fetch(`/J-routes/ppmIdeal?empresa=${valor}`, { cache: "no-store" }).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
          // PUXAR ROTA COM ESSE SELECT
          // a resposta é [ { media_ppm: null } ], quero ela sem casas decimais

          document.getElementById("ppmIdeal").innerHTML =
            resposta[0]["media_ppm"];
        });
      } else {
        console.warn("Nenhum dado encontrado ou erro na API");
      }
    }
  );
}

function atendimentoAtual() {
  var valor = localStorage.getItem("FK_EMPRESA");
  fetch(`/J-routes/atendimentoAtual?empresa=${valor}`, {
    cache: "no-store",
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
        // PUXAR ROTA COM ESSE SELECT
        // a resposta é [ { total_ligacoes_atendidas: '113' } ], quero ela sem casas decimais

        document.getElementById("atendimentoAtual").innerHTML =
          resposta[0]["total_ligacoes_dia"];
      });
    } else {
      console.warn("Nenhum dado encontrado ou erro na API");
    }
  });
}

function atendimentoIdeal() {
  var valor = localStorage.getItem("FK_EMPRESA");
  fetch(`/J-routes/atendimentoIdeal?empresa=${valor}`, {
    cache: "no-store",
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
        // PUXAR ROTA COM ESSE SELECT
        // a resposta é [ { total_ligacoes_atendidas: 225 } ], quero ela sem casas decimais
        document.getElementById("atendimentoIdeal").innerHTML =
          resposta[0]["total_ligacoes_atendidas"];
      });
    } else {
      console.warn("Nenhum dado encontrado ou erro na API");
    }
  });
}

function graficoProdutividade() {
  var valor = localStorage.getItem("FK_EMPRESA");
  fetch(`/J-routes/graficoProdutividade?empresa=${valor}`, {
    cache: "no-store",
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
        var options = {
          chart: {
            type: "line",
            height: 300,
          },
          colors: ["#008000"],
          series: [
            {
              name: "sales",
              data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
          ],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          stroke: {
            curve: "smooth",
          },
        };

        var options1 = {
          chart: {
            type: "line",
            height: 300,
          },
          colors: ["#eead2d"],
          series: [
            {
              name: "sales",
              data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
          ],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          stroke: {
            curve: "smooth",
          },
        };

        var options2 = {
          chart: {
            type: "line",
            height: 300,
          },
          colors: ["#f17ea1"],
          series: [
            {
              name: "sales",
              data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
          ],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          stroke: {
            curve: "smooth",
          },
        };

        var options3 = {
          chart: {
            type: "line",
            height: 300,
          },
          colors: ["#e84b33"],
          series: [
            {
              name: "sales",
              data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
          ],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          stroke: {
            curve: "smooth",
          },
        };

        var chart1 = new ApexCharts(document.querySelector("#chart"), options);
        chart1.render();

        var chart2 = new ApexCharts(
          document.querySelector("#chart1"),
          options1
        );
        chart2.render();

        var chart3 = new ApexCharts(
          document.querySelector("#chart2"),
          options2
        );
        chart3.render();

        var chart4 = new ApexCharts(
          document.querySelector("#chart3"),
          options3
        );
        chart4.render();

        var optionsCol = {
          series: [
            {
              name: "Inflation", //{ hora_do_dia: 0, media_registro_PPM: '98.0000' }
              data: [
                resposta[0].media_registro_PPM,
                resposta[1].media_registro_PPM,
                resposta[2].media_registro_PPM,
                resposta[3].media_registro_PPM,
                resposta[4].media_registro_PPM,
                resposta[5].media_registro_PPM,
                resposta[6].media_registro_PPM,
                resposta[7].media_registro_PPM,
                resposta[8].media_registro_PPM,
                resposta[9].media_registro_PPM,
                resposta[10].media_registro_PPM,
                resposta[11].media_registro_PPM,
                resposta[12].media_registro_PPM,
                resposta[13].media_registro_PPM,
                resposta[14].media_registro_PPM,
                resposta[15].media_registro_PPM,
                resposta[16].media_registro_PPM,
                resposta[17].media_registro_PPM,
                resposta[18].media_registro_PPM,
                resposta[19].media_registro_PPM,
                resposta[20].media_registro_PPM,
                resposta[21].media_registro_PPM,
                resposta[22].media_registro_PPM,
                resposta[23].media_registro_PPM,
              ],
            },
          ],
          chart: {
            height: 250,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          xaxis: {
            categories: [
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
            ],
            position: "top",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          title: {
            text: "Monthly Inflation in Argentina, 2002",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444",
            },
          },
          yaxis: {
            max: 100  // Define o valor máximo do eixo Y como 100
          },
        };

        var chartCol = new ApexCharts(
          document.querySelector("#chartCol"),
          optionsCol
        );
        chartCol.render();
      });
    } else {
      console.warn("Nenhum dado encontrado ou erro na API");
    }
  });
}

function fazerListaInfoFuncionario() {
  var valor = localStorage.getItem("FK_EMPRESA");

  fetch(`/J-routes/fazerListaInfoFuncionario?empresa=${valor}`, {
    cache: "no-store",
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
        var listaElement = document.getElementById("Lista");
        listaElement.innerHTML = "";
        for (let i = 0; i < resposta.length; i++) {
          let tr = document.createElement("tr");

          let tdNome = document.createElement("td");
          tdNome.setAttribute("class", "py-1");
          tdNome.innerHTML = `${resposta[i].nome_funcionario}`;
          tr.appendChild(tdNome);

          let tdRecebidas = document.createElement("td");
          tdRecebidas.innerHTML = `${resposta[i].chamadas_recebidas}`;
          tr.appendChild(tdRecebidas);

          let tdAtendidas = document.createElement("td");
          tdAtendidas.innerHTML = `${resposta[i].chamadas_atendidas}`;
          tr.appendChild(tdAtendidas);

          let tdPercAtendidas = document.createElement("td");
          tr.appendChild(tdPercAtendidas);
          tdPercAtendidas.innerHTML = `${resposta[i].porcentagem_atendidas}%`;

          let tdAbandonadas = document.createElement("td");
          tr.appendChild(tdAbandonadas);
          tdAbandonadas.innerHTML = `${resposta[i].chamadas_abandonadas}`;

          let tdDuracao = document.createElement("td");
          tr.appendChild(tdDuracao);
          tdDuracao.innerHTML = `${resposta[i].duracao_total}`;

          tr.style.cursor = "pointer";
          listaElement.appendChild(tr);
        }
      });
    } else {
      console.warn("Nenhum dado encontrado ou erro na API");
    }
  });
}
