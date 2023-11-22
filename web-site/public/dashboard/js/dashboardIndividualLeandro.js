var idMaquina = 0

var mediaCpuAllDay = []
var mediaCpuAllMonth = []
var mediaMemoryAllDay = []
var mediaMemoryAllMonth = []

var labelsDashboardMediaCpuDay = []
var mediaCpuDataDay = []

var varDashboardMediaCpuDay = new Chart(dashboardMediaCpuDay, {
    type: `line`,
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
    type: `line`,
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
    type: `line`,
    data: {
        labels: labelsDashboardMediaMemoryDay,
        datasets: [{
            label: `Uso da Memória (Funcionário)`,
            data: mediaMemoryDataDay,
            borderColor: 'red'
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
    type: `line`,
    data: {
        labels: labelsDashboardMediaMemoryMonth,
        datasets: [{
            label: `Uso da Memória (Funcionário)`,
            data: mediaMemoryDataMonth,
            borderColor: 'red'
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
    fetch(`/routeLeandro/dashboardMediaCpuDay/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardMediaCpuDay.push(registro.data)
                    mediaCpuDataDay.push(registro.cpu)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function updateDashboardMediaCpuMonth() {
    fetch(`/routeLeandro/dashboardMediaCpuMonth/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardMediaCpuMonth.push(registro.mes)
                    mediaCpuDataMonth.push(registro.cpu)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function updateDashboardMediaMemoryDay() {
    fetch(`/routeLeandro/dashboardMediaMemoryDay/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardMediaMemoryDay.push(registro.data)
                    mediaMemoryDataDay.push(registro.memory)
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
    fetch(`/routeLeandro/dashboardMediaMemoryMonth/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    labelsDashboardMediaMemoryMonth.push(registro.mes)
                    mediaMemoryDataMonth.push(registro.memory)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getMediaCpuAllDay() {
    fetch(`/routeLeandro/getMediaCpuAllDay/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    mediaCpuAllDay.push(registro.cpu)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getMediaCpuAllMonth() {
    fetch(`/routeLeandro/getMediaCpuAllMonth/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    mediaCpuAllMonth.push(registro.cpu)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getMediaMemoryAllDay() {
    fetch(`/routeLeandro/getMediaMemoryAllDay/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    mediaMemoryAllDay.push(registro.memory)
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getMediaMemoryAllMonth() {
    fetch(`/routeLeandro/getMediaMemoryAllMonth/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    let registro = resposta[i]
                    mediaMemoryAllMonth.push(registro.memory)
                }

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

                idKpiMediaCpuDay.innerHTML = `${Math.round(resposta[0].cpu, 0)}%`

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

                idKpiMediaCpuAllTime.innerHTML = `${Math.round(resposta[0].cpu, 0)}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function kpiMediaMemoryDay() {
    fetch(`/routeLeandro/kpiMediaMemoryDay`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                idKpiMediaMemoryDay.innerHTML = `${Math.round(resposta[0].memory, 0)}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function kpiMediaMemoryAllTime() {
    fetch(`/routeLeandro/kpiMediaMemoryAllTime`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                idKpiMediaMemoryAllTime.innerHTML = `${Math.round(resposta[0].memory, 0)}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

updateDashboardMediaCpuDay()
updateDashboardMediaMemoryDay()
updateDashboardMediaCpuMonth()
updateDashboardMediaMemoryMonth()

getMediaCpuAllDay()
getMediaCpuAllMonth()
getMediaMemoryAllDay()
getMediaMemoryAllMonth()

// setInterval(kpiMediaCpuDay, 1000)
// setInterval(kpiMediaCpuAllTime, 1000)
// setInterval(kpiMediaMemoryDay, 1000)
// setInterval(kpiMediaMemoryAllTime, 1000)

kpiMediaCpuDay()
kpiMediaCpuAllTime()
kpiMediaMemoryDay()
kpiMediaMemoryAllTime()

setTimeout(updateDashboards, 1000)

function updateDashboards() {
    varDashboardMediaCpuDay.update()
    varDashboardMediaCpuMonth.update()
    varDashboardMediaMemoryDay.update()
    varDashboardMediaMemoryMonth.update()
}
