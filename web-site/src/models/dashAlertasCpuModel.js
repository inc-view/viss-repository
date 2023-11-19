var database = require("../database/config");

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


module.exports = { 
  updateDashboardAlertasCpu
};
