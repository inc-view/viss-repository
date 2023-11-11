var labelsDashboardMediaCpu = []
var mediaCpuData = []

var varDashboardMediaCpu = new Chart(dashboardMediaCpu, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaCpu,
        datasets: [{
            label: `Uso da CPU (Funcionário)`,
            data: mediaCpuData,
            borderColor: 'red'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }]
        }
    }
})

var labelsDashboardMediaMemory = []
var mediaMemoryData = []

var varDashboardMediaCpu = new Chart(dashboardMediaMemory, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaMemory,
        datasets: [{
            label: `Uso da Memória (Funcionário)`,
            data: mediaMemoryData,
            borderColor: 'blue'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }]
        }
    }
})

setInterval(updateDashboardMediaCpu, 1000)
setInterval(updateDashboardMediaMemory, 1000)

function updateDashboardMediaCpu() {
    fetch(`/routeLeandro/dashboardGeralCPU/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function updateDashboardMediaMemory() {
    fetch(`/routeLeandro/dashboardGeralCPU/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {

                    let dataFormat = new Date(resposta[i].dtHora)
                    let dataFormatFinally = `${dataFormat.getHours()}:${dataFormat.getMinutes()}:${dataFormat.getSeconds()}`
                    labelsDashboardGeral.push(dataFormatFinally)
                    cpuDataDashboardGeral.push(resposta[i].registro)
                }

                labelsDashboardGeral = labelsDashboardGeral.reverse()
                cpuDataDashboardGeral = cpuDataDashboardGeral.reverse()


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}