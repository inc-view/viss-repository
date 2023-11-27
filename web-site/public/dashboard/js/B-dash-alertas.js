/* var query = location.search.slice(1);
var partes = query.split('&');
var idMaquina = 0

partes.forEach(function (parte) {
  var chaveValor = parte.split('=');
  var chave = chaveValor[0];
  var valor = chaveValor[1];
  idMaquina = valor;
}); */

let idMaquina = 1;
let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


var dataDash = new Date();

var dataOcorrenciasCpu = []
var labelsOcorrenciasCpu = []
var labels = []

var optionsColMonthCpu = {
  series: [
    {
      name: labelsOcorrenciasCpu,
      data: dataOcorrenciasCpu,
    }
  ],
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
    categories: labels
  },
};

var chartColMonthCpu = new ApexCharts(document.querySelector("#chartColMonthCpu"), optionsColMonthCpu);
chartColMonthCpu.render();

function updateDashboardAlertasCpu() {

  fetch(`/routeDashAlertasCpu/dashboardAlertasCpu/${idMaquina}`).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {

          console.log(data)

          for (var i = 0; i < data.length; i++) {
            labels.push(meses[data[i].mes - 1])
            dataOcorrenciasCpu.push(data[i].ocorrencia)
          }

          chartColMonthCpu.updateSeries([
            {
              name: "Ocorrências",
              data: dataOcorrenciasCpu,
            }
          ]);

          chartColMonthCpu.updateOptions({
            xaxis: {
              categories: labels,
            },
          });

        });

      }
    });

}

let selectListAlertas = document.getElementById("selectListAlertas")
selectListAlertas.addEventListener("change", () => {
  dataOcorrenciasCpu = [];
  labelsOcorrenciasCpu = [];
  labels = [];

  if (selectListAlertas.value > 0) {

    fetch(`/routeDashAlertasCpu/listarOcorrenciaMes/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month: selectListAlertas.value,
        maquina: idMaquina,
        empresa: localStorage.getItem("FK_EMPRESA"),
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {

          for (var i = 0; i < data.length; i++) {
            labels.push(data[i].data)
            dataOcorrenciasCpu.push(data[i].ocorrencia)
          }

          chartColMonthCpu.updateSeries([
            {
              name: "Ocorrências",
              data: dataOcorrenciasCpu,
            }
          ]);

          chartColMonthCpu.updateOptions({
            xaxis: {
              categories: labels,
            }
          });

        })
      }
    });
    console.log("oi")
  } else {
    updateDashboardAlertasCpu()
  }
})



window.onload = () => {
  updateDashboardAlertasCpu()
}