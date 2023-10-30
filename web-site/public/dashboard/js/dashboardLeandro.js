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
function infoMaquina() {
    var state;
    var name;
    var brand;
    var system;
    var ip;
    fetch(`/routeLeandro/infoMaquina/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
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
                ip = registro.IpComputador

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

var labelsDashboardGeral = []
var cpuDataDashboardGeral = []
var memoryDataDashboardGeral = []
var diskDataDashboardGeral = []

var dashboardGeral = document.getElementById('dashboard-geral-cpu')
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
            label: `RAM`,
            data: memoryDataDashboardGeral,
            borderColor: '#b34db2',
        },
        {
            label: `DISCO`,
            data: diskDataDashboardGeral,
            borderColor: '#5353ec',
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



    fetch(`/routeLeandro/dashboardGeralRAM/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) { 
                    memoryDataDashboardGeral.push(resposta[i].registro)
                }

                memoryDataDashboardGeral = memoryDataDashboardGeral.reverse()


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });


    fetch(`/routeLeandro/dashboardGeralDISCO/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) { 
                    diskDataDashboardGeral.push(resposta[i].registro)
                }

                diskDataDashboardGeral = diskDataDashboardGeral.reverse()


                setTimeout(() => {

                    cpuDataDashboardGeral = []
                    labelsDashboardGeral = []
                    diskDataDashboardGeral = []
                    memoryDataDashboardGeral = []

                    varDashboardGeral.update();

                }, 2000)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });


    


}




function updateDashboardCpu() {
    
    fetch(`/routeLeandro/dashboardCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    var data = new Date(registro.dthora);
                    var dataDMATratada = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
                    var dataTratada = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                    data_dash.innerHTML = dataDMATratada
                    labelsDashboardCpu.push(dataTratada)
                    dataDashboardCpu.push(registro.cpu)
                }

                if (labelsDashboardCpu.length > 5) {
                    labelsDashboardCpu.shift()
                    dataDashboardCpu.shift()
                    varDashboardCpu.update()
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

function updateDashboardMemory() {
   
    data_dash2.innerHTML = `${dataDash.getDate()}/${dataDash.getMonth() + 1}/${dataDash.getFullYear()}`
    fetch(`/routeLeandro/dashboardMemory/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    var data = new Date(registro.dthora);
                    var dataTratada = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                    labelsDashboardMemory.push(dataTratada)
                    dataDashboardMemory.push(registro.memory)
                }

                if (labelsDashboardMemory.length > 5) {
                    labelsDashboardMemory.shift()
                    dataDashboardMemory.shift()
                    varDashboardMemory.update()
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
}

function updateDashboardDisk() {
    data_dash3.innerHTML = `${dataDash.getDate()}/${dataDash.getMonth() + 1}/${dataDash.getFullYear()}`

    fetch(`/routeLeandro/dashboardDisk/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    var data = new Date(registro.dthora);
                    var dataTratada = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                    labelsDashboardDisk.push(dataTratada)
                    dataDashboardDisk.push(registro.disk)
                }

                if (labelsDashboardDisk.length > 5) {
                    labelsDashboardDisk.shift()
                    dataDashboardDisk.shift()
                    varDashboardDisk.update()
                }

                cardDisk.innerHTML = `${resposta[0].disk}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
}

setInterval(updateDashboardGeral, 5000)
setInterval(updateDashboardCpu, 1000)
setInterval(updateDashboardMemory, 1000)
setInterval(updateDashboardDisk, 1000)
