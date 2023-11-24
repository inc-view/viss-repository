/* var query = location.search.slice(1);
var partes = query.split('&');
var idMaquina = 0

partes.forEach(function (parte) {
  var chaveValor = parte.split('=');
  var chave = chaveValor[0];
  var valor = chaveValor[1];
  idMaquina = valor;
}); */

var dataDash = new Date();

var dataOcorrenciasCpu = []
var labelsOcorrenciasCpu = []

var optionsColMonthCpu = {
  series: [{
    name: 'Quantidades de ocorrências',
    data: dataOcorrenciasCpu
  }],
  chart: {
    height: 200,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },

  xaxis: {
    categories: labelsOcorrenciasCpu,
    position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      }
    }

  }
};

var chartColMonthCpu = new ApexCharts(document.querySelector("#chartColMonthCpu"), optionsColMonthCpu);
chartColMonthCpu.render();

function updateDashboardAlertasCpu() {
  data_dash.innerHTML = `${dataDash.getDate()}/${dataDash.getMonth() + 1}/${dataDash.getFullYear()}`;
  /* fetch(`/routeDashAlertasCpu/dashboardAlertasCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        for (i = 0; i < resposta.length; i++) {
          let registro = resposta[i]
          labelsOcorrenciasCpu.push(registro.Mes)
          dataOcorrenciasCpu.push(registro.Ocorrencias)
        }

        cardCpu.innerHTML = `${resposta[0].cpu}%`

        chartColMonthCpu.updateDashboardAlertasCpu([
          {
            name: labelsOcorrenciasCpu,
            data: dataOcorrenciasCpu,
          }
        ]);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    }); */



  fetch(`/routeDashAlertasCpu/dashboardAlertasCpu/${idMaquina}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      maquina: localStorage.getItem("ID_MAQUINA"),
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {

        if (data.length > 0) {

          data.reverse()

          for (var i = 0; i < 13; i++) {

            if (data[i] != undefined) {
              labelsOcorrenciasCpu.push(registro.Mes)
              console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
              dataOcorrenciasCpu.push(registro.Ocorrencias)
              console.log("PASSOU AQUI")

            } else {
              labels.push(labels[i - 1] - 1)
            }

          }
          console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")


        }


        chartColMonthCpu.update([
          {
            name: 'Quantidades de ocorrências',
            data: dataOcorrenciasCpu,
          }
        ]);

        chartColMonthCpu.update({
          xaxis: {
            categories: labelsOcorrenciasCpu,
          },
        });

        /* document.getElementById('horasUsoOne').innerHTML = (data[0].dia == dia) ? data[0].horas_uso : "00:00:00"
        document.getElementById('cpuUsoOne').innerHTML = (data[0].dia == dia) ? data[0].cpu : "0.0" */
      });

      console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")

    }
  });
}