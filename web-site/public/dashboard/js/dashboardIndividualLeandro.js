var mediaCpuAllDay = []
var mediaCpuAllMonth = []
var mediaMemoryAllDay = []
var mediaMemoryAllMonth = []

var labelsDashboardMediaCpuDay = []
var mediaCpuDataDay = []

var varDashboardMediaCpuDay = new Chart(dashboardMediaCpuDay, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaCpuDay,
        datasets: [{
            label: `Uso da CPU (Funcionário)`,
            data: mediaCpuDataDay,
            borderColor: 'red'
        },
        {
            label: `Uso da Memória (Empresa)`,
            data: mediaCpuAllDay,
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

var labelsDashboardMediaCpuMonth = []
var mediaCpuDataMonth = []

var varDashboardMediaCpuMonth = new Chart(dashboardMediaCpuMonth, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaCpuMonth,
        datasets: [{
            label: `Uso da CPU (Funcionário)`,
            data: mediaCpuDataMonth,
            borderColor: 'red'
        },
        {
            label: `Uso da Memória (Empresa)`,
            data: mediaCpuAllMonth,
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

var labelsDashboardMediaMemoryDay = []
var mediaMemoryDataDay = []

var varDashboardMediaMemoryDay = new Chart(dashboardMediaMemoryDay, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaMemoryDay,
        datasets: [{
            label: `Uso da Memória (Funcionário)`,
            data: mediaMemoryDataDay,
            borderColor: 'blue'
        },
        {
            label: `Uso da Memória (Empresa)`,
            data: mediaMemoryAllDay,
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

var labelsDashboardMediaMemoryMonth = []
var mediaMemoryDataMonth = []

var varDashboardMediaMemoryMonth = new Chart(dashboardMediaMemoryMonth, {
    type: `bar`,
    data: {
        labels: labelsDashboardMediaMemoryMonth,
        datasets: [{
            label: `Uso da Memória (Funcionário)`,
            data: mediaMemoryDataMonth,
            borderColor: 'blue'
        },
        {
            label: `Uso da Memória (Empresa)`,
            data: mediaMemoryAllMonth,
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

function hideDash() {
    rowDashDay.style.display = `none`
    rowDashMonth.style.display = `none`

    if (selectDash.value == 1) {
        showDashDay()
    }
    if (selectDash.value == 2) {
        showDashMonth()
    }
}
function showDashDay() {
    rowDashDay.style.display = `flex`
}
function showDashMonth() {
    rowDashMonth.style.display = `flex`
}

function hideKpi() {
    rowKpiDay.style.display = `none`
    rowKpiAllTime.style.display = `none`

    if (selectKpi.value == 1) {
        showKpiDay()
    }
    if (selectKpi.value == 2) {
        showKpiAllTime()
    }
}
function showKpiDay() {
    rowKpiDay.style.display = `flex`
}
function showKpiAllTime() {
    rowKpiAllTime.style.display = `flex`
}

function updateDashboardMediaCpuDay() {
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

function updateDashboardMediaCpuMonth() {
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

function updateDashboardMediaMemoryDay() {
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

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function updateDashboardMediaMemoryMonth() {
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

function kpiMediaCpuDay() {
    fetch(`/routeLeandro/kpiMediaCpuDay`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {

                    let dataFormat = new Date(resposta[i].dtHora)
                    let dataFormatFinally = `${dataFormat.getHours()}:${dataFormat.getMinutes()}:${dataFormat.getSeconds()}`
                    labelsDashboardGeral.push(dataFormatFinally)
                    cpuDataDashboardGeral.push(resposta[i].registro)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function kpiMediaCpuAllTime() {
    fetch(`/routeLeandro/kpiMediaCpuAllTime`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (i = 0; i < resposta.length; i++) {

                    let dataFormat = new Date(resposta[i].dtHora)
                    let dataFormatFinally = `${dataFormat.getHours()}:${dataFormat.getMinutes()}:${dataFormat.getSeconds()}`
                    labelsDashboardGeral.push(dataFormatFinally)
                    cpuDataDashboardGeral.push(resposta[i].registro)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function kpiMediaMemoryDay() {
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

function kpiMediaMemoryAllTime() {
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

setInterval(updateDashboardMediaCpuDay, 1000)
setInterval(updateDashboardMediaMemoryDay, 1000)
setInterval(updateDashboardMediaCpuMonth, 1000)
setInterval(updateDashboardMediaMemoryMonth, 1000)

setInterval(kpiMediaCpuDay, 1000)
setInterval(kpiMediaCpuAllTime, 1000)
setInterval(kpiMediaMemoryDay, 1000)
setInterval(kpiMediaMemoryAllTime, 1000)