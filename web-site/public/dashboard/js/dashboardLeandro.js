var labelsDashboardGeral = [0, 0, 0, 0, 0]
var cpuDataDashboardGeral = [0, 0, 0, 0, 0]
var memoryDataDashboardGeral = [0, 0, 0, 0, 0]
var diskDataDashboardGeral = [0, 0, 0, 0, 0]

var varDashboardGeral = new Chart (dashboardGeral, {
    type: `line`,
    data: {
        labels: labelsDashboardGeral,
        datasets: [{
            label: `CPU`,
            data: cpuDataDashboardGeral,
            borderColor: '#FF0000',
        },
        {
            label: `Memória RAM`,
            data: memoryDataDashboardGeral,
            borderColor: '#009900'
        },
        {
            label: `Disco`,
            data: diskDataDashboardGeral,
            borderColor: '#0000FF'
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

var labelsDashboardCpu = []
var dataDashboardCpu = []

var varDashboardCpu = new Chart (dashboardCpu, {
    type: `line`,
    data: {
        labels: labelsDashboardCpu,
        datasets: [{
            label: `Uso da CPU`,
            data: dataDashboardCpu,
            borderColor: '#FF0000',
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

var labelsDashboardMemory = []
var dataDashboardMemory = []

var varDashboardMemory = new Chart (dashboardMemory, {
    type: `line`,
    data: {
        labels: labelsDashboardMemory,
        datasets: [{
            label: `Uso da Memória`,
            data: dataDashboardMemory,
            borderColor: '#009900'
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

var labelsDashboardDisk = []
var dataDashboardDisk = []

var varDashboardDisk = new Chart (dashboardDisk, {
    type: `line`,
    data: {
        labels: labelsDashboardDisk,
        datasets: [{
            label: `Uso do Disco`,
            data: dataDashboardDisk,
            borderColor: '#0000FF'
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

function hideDashboards() {
    idDashboardCpu.style.display = `none`
    idDashboardMemory.style.display = `none`
    idDashboardDisk.style.display = `none`
}

function showCpu() {
    idDashboardCpu.style.display = `flex`
}

function showMemory() {
    idDashboardMemory.style.display = `flex`
}

function showDisk() {
    idDashboardDisk.style.display = `flex`
}

function updateDashboardGeral() {
    fetch(`/routeLeandro/dashboardGeral/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardGeral.push(registro.dtHora)
                    cpuDataDashboardGeral.push(registro.cpu)
                    memoryDataDashboardGeral.push(registro.memory)
                    diskDataDashboardGeral.push(registro.disk)
                }

                if (labelsDashboardGeral.length > 5) {
                    labelsDashboardGeral.shift()
                }
                if (cpuDataDashboardGeral.length > 5) {
                    cpuDataDashboardGeral.shift()
                }
                if (memoryDataDashboardGeral.length > 5) {
                    memoryDataDashboardGeral.shift()
                }
                if (diskDataDashboardGeral.length > 5) {
                    diskDataDashboardGeral.shift()
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
        varDashboardGeral.update()
}

function updateDashboardCpu() {
    fetch(`/routeLeandro/dashboardCpu/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardCpu.push(registro.dtHora)
                    dataDashboardCpu.push(registro.cpu)
                }

                if (labelsDashboardCpu.length > 5) {
                    labelsDashboardCpu.shift()
                }
                if (dataDashboardCpu.length > 5) {
                    dataDashboardCpu.shift()
                }

                cardCpu.innerHTML = `${resposta[0].cpu}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
        varDashboardCpu.update()
}

function updateDashboardMemory() {
    fetch(`/routeLeandro/dashboardMemory/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardMemory.push(registro.dtHora)
                    dataDashboardMemory.push(registro.memory)
                }

                if (labelsDashboardMemory.length > 5) {
                    labelsDashboardMemory.shift()
                }
                if (dataDashboardMemory.length > 5) {
                    dataDashboardMemory.shift()
                }

                cardMemory.innerHTML = `${resposta[0].memory}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    varDashboardMemory.update()
}

function updateDashboardDisk() {
    fetch(`/routeLeandro/dashboardDisk/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardDisk.push(registro.dtHora)
                    dataDashboardDisk.push(registro.disk)
                }

                if (labelsDashboardDisk.length > 5) {
                    labelsDashboardDisk.shift()
                }
                if (dataDashboardDisk.length > 5) {
                    dataDashboardDisk.shift()
                }

                cardDisk.innerHTML = `${resposta[0].disk}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    varDashboardDisk.update()
}

// setInterval(updateDashboardGeral, 2000)
setInterval(updateDashboardCpu, 1000)
setInterval(updateDashboardMemory, 1000)
setInterval(updateDashboardDisk, 1000)