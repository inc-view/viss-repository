function infoMaquina() {
    var state;
    var name;
    var brand;
    var system;
    var ip;
    fetch(`/routeLeandro/dashboardCpu/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let registro = resposta[0]

                if (registro.Status == 1) {
                    state = `Online`
                } else {
                    state = `Offline`
                }
                name = registro.NomeFuncionario
                brand = registro.MarcaComputador
                system = registro.SistemaOperacional
                ip = registro.ipComputador

                cardStatus.innerHTML = `Status: ${state}`
                cardName.innerHTML = `Nome do Funcionário: ${name}`
                cardBrand.innerHTML = `Marca da Máquina: ${brand}`
                cardSystem.innerHTML = `Sistema Operacional: ${system}`
                cardIp.innerHTML = `IP da Máquina: ${ip}`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

infoMaquina()

var labelsDashboardGeral = [0, 0, 0, 0, 0]
var cpuDataDashboardGeral = [0, 0, 0, 0, 0]
var memoryDataDashboardGeral = [0, 0, 0, 0, 0]
var diskDataDashboardGeral = [0, 0, 0, 0, 0]

var varDashboardGeral = new Chart(dashboardGeral, {
    type: `line`,
    data: {
        labels: labelsDashboardGeral,
        datasets: [{
            label: `CPU`,
            data: cpuDataDashboardGeral,
            borderColor: '#2CA093',
        },
        {
            label: `Memória RAM`,
            data: memoryDataDashboardGeral,
            borderColor: '#B80096'
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

var varDashboardCpu = new Chart(dashboardCpu, {
    type: `line`,
    data: {
        labels: labelsDashboardCpu,
        datasets: [{
            label: `Uso da CPU`,
            data: dataDashboardCpu,
            borderColor: '#2CA093',
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

var varDashboardMemory = new Chart(dashboardMemory, {
    type: `line`,
    data: {
        labels: labelsDashboardMemory,
        datasets: [{
            label: `Uso da Memória`,
            data: dataDashboardMemory,
            borderColor: '#B80096'
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

var varDashboardDisk = new Chart(dashboardDisk, {
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
    var dataDash = new Date();
    data_dash.innerHTML = `${dataDash.getDate()}/${dataDash.getMonth()}/${dataDash.getFullYear()}`
    fetch(`/routeLeandro/dashboardCpu/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    var data = new Date(registro.dtHora);
                    var dataTratada = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                    labelsDashboardCpu.push(dataTratada)
                    dataDashboardCpu.push(registro.cpu)
                }

                if (labelsDashboardCpu.length > 5) {
                    labelsDashboardCpu.shift()
                }
                if (dataDashboardCpu.length > 5) {
                    dataDashboardCpu.shift()
                }

                cardCpu.innerHTML = `${resposta[0].cpu}%`

                if (resposta[0].cpu <= 45) {
                    cardCpu.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    cardCpu.style = `color: white !important`
                } else if (resposta[0].cpu < 80) {
                    cardCpu.style = `color: yellow !important`
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

                if (resposta[0].cpu <= 50) {
                    cardMemory.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    cardMemory.style = `color: white !important`
                } else if (resposta[0].cpu < 80) {
                    cardMemory.style = `color: yellow !important`
                } else if (resposta[0].cpu < 90) {
                    cardMemory.style = `color: orange !important`
                } else {
                    cardMemory.style = `color: red !important`
                }

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
