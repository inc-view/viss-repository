var query = location.search.slice(1);
var partes = query.split('&');
var idMaquina = 0

partes.forEach(function (parte) {
  var chaveValor = parte.split('=');
  var chave = chaveValor[0];
  var valor = chaveValor[1];
  idMaquina = valor;
});

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
  data_dash.innerHTML = `${dataDash.getDate()}/${dataDash.getMonth() + 1}/${dataDash.getFullYear()}`
  fetch(`/routeDashAlertasCpu/dashboardCpuAlertasCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        for (i = 0; i < resposta.length; i++) {
          let registro = resposta[i]
          labelsOcorrenciasCpu.push(registro.Mes)
          dataOcorrenciasCpu.push(registro.Ocorrencias)
        }

        cardCpu.innerHTML = `${resposta[0].cpu}%`

        if (resposta[0].cpu <= 45) {
          cardCpu.style = `color: green !important`
        } else if (resposta[0].cpu < 65) {
          cardCpu.style = `color: darkgreen !important`
        } else if (resposta[0].cpu < 80) {
          cardCpu.style = `color: darkyellow !important`
        } else if (resposta[0].cpu < 90) {
          cardCpu.style = `color: orange !important`
        } else {
          cardCpu.style = `color: red !important`
        }

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}