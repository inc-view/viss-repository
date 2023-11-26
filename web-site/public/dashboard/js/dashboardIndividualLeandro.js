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

function downloadPdfDay() {
    var pdf = new jsPDF()
    var linhas = 1
    var grupos = 0

    pdf.setFontSize(12)

    pdf.text(`Relatório da média de uso de CPU diária (${labelsDashboardMediaCpuDay.length} dias)`, 20, 30)
    pdf.text(`Média do uso da CPU:`, 20, 40)

    for (var i = 0; i < labelsDashboardMediaCpuDay.length; i++) {
        pdf.text(`${labelsDashboardMediaCpuDay[i]}`, 20, (linhas) * 50)
        pdf.text(`Funcionário - ${Math.round(mediaCpuDataDay[i], 0)}% de Uso (CPU)`, 20, (linhas) * 50 + 10)
        pdf.text(`Empresa - ${Math.round(mediaCpuAllDay[i], 0)}% de Uso (CPU)`, 20, (linhas) * 50 + 20)
        grupos++
        linhas++
        if (grupos > 5) {
            pdf.addPage()
            grupos = 0
            linhas = 1
        }
    }

    pdf.addPage()

    linhas = 1
    grupos = 0

    pdf.text(`Média do uso da memória`, 20, 40)

    for (var i = 0; i < labelsDashboardMediaMemoryDay.length; i++) {
        pdf.text(`${labelsDashboardMediaMemoryDay[i]}`, 20,(linhas) * 50)
        pdf.text(`Funcionário - ${Math.round(mediaMemoryDataDay[i], 0)}% de Uso (Memória)`, 20, (linhas) * 50 + 10)
        pdf.text(`Empresa - ${Math.round(mediaMemoryAllDay[i], 0)}% de Uso (Memória)`, 20,(linhas) * 50 + 20)
        grupos++
        linhas++
        if (grupos > 5) {
            pdf.addPage()
            grupos = 0
            linhas = 1
        }
    }

    pdf.save(`relatorioDiario${labelsDashboardMediaCpuDay.length}.pdf`)
}

function downloadPdfMonth() {
    var pdf = new jsPDF()
    var linhas = 1
    var grupos = 0

    pdf.setFontSize(12)

    pdf.text(`Relatório da média de uso de CPU mensal (${labelsDashboardMediaCpuDay.length} meses)`, 20, 30)
    pdf.text(`Média do uso da CPU:`, 20, 40)

    for (var i = 0; i < labelsDashboardMediaCpuMonth.length; i++) {
        pdf.text(`${labelsDashboardMediaCpuMonth[i]}`, 20, (linhas) * 50)
        pdf.text(`Funcionário - ${Math.round(mediaCpuDataMonth[i], 0)}% de Uso (CPU)`, 20, (linhas) * 50 + 10)
        pdf.text(`Empresa - ${Math.round(mediaCpuAllMonth[i], 0)}% de Uso (CPU)`, 20, (linhas) * 50 + 20)
        grupos++
        linhas++
        if (grupos > 5) {
            pdf.addPage()
            grupos = 0
            linhas = 1
        }
    }

    pdf.addPage()

    linhas = 1
    grupos = 0

    pdf.text(`Média do uso da memória`, 20, 40)

    for (var i = 0; i < labelsDashboardMediaMemoryMonth.length; i++) {
        pdf.text(`${labelsDashboardMediaMemoryMonth[i]}`, 20,(linhas) * 50)
        pdf.text(`Funcionário - ${Math.round(mediaMemoryDataMonth[i], 0)}% de Uso (Memória)`, 20, (linhas) * 50 + 10)
        pdf.text(`Empresa - ${Math.round(mediaMemoryAllMonth[i], 0)}% de Uso (Memória)`, 20,(linhas) * 50 + 20)
        grupos++
        linhas++
        if (grupos > 5) {
            pdf.addPage()
            grupos = 0
            linhas = 1
        }
    }

    pdf.save(`relatorioMensal${labelsDashboardMediaCpuMonth.length}.pdf`)
}

function changeTextDashDay(days) {
    textDashDayCpu.innerHTML = `Média de Uso da CPU (Últimos ${days} Dias)`
    textDashDayMemory.innerHTML = `>Média de Uso da Memória (Últimos ${days} Dias)`
}

function changeTextDashMonth(months) {
    textDashMonthCpu.innerHTML = `Média de Uso da CPU (Últimos ${months} Meses)`
    textDashMonthMemory.innerHTML = `Média de Uso da Memóris (Últimos ${months} Meses)`
}

function hideDash() {
    rowDashDay.style.display = `none`
    rowDashMonth.style.display = `none`
    idFilterMonth.style.display = `none`
    idFilterDay.style.display = `none`

    if (selectDash.value == 1) {
        showDashDay()
    }
    if (selectDash.value == 2) {
        showDashMonth()
    }
}
function showDashDay() {
    rowDashDay.style.display = `flex`
    idFilterDay.style.display = `flex`
}
function showDashMonth() {
    rowDashMonth.style.display = `flex`
    idFilterMonth.style.display = `flex`
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

function updateDashboardMediaCpuDay(days) {
    mediaCpuDataDay.length = 0
    labelsDashboardMediaCpuDay.length = 0
    fetch(`/routeLeandro/dashboardMediaCpuDay/${idMaquina}/${days}`, { cache: 'no-store' }).then(function (response) {
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

function updateDashboardMediaCpuMonth(months) {
    mediaCpuDataMonth.length = 0
    labelsDashboardMediaCpuMonth.length = 0
    fetch(`/routeLeandro/dashboardMediaCpuMonth/${idMaquina}/${months}`, { cache: 'no-store' }).then(function (response) {
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

function updateDashboardMediaMemoryDay(days) {
    mediaMemoryDataDay.length = 0
    labelsDashboardMediaMemoryDay.length = 0
    fetch(`/routeLeandro/dashboardMediaMemoryDay/${idMaquina}/${days}`, { cache: 'no-store' }).then(function (response) {
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

function updateDashboardMediaMemoryMonth(months) {
    mediaMemoryDataMonth.length = 0
    labelsDashboardMediaMemoryMonth.length = 0
    fetch(`/routeLeandro/dashboardMediaMemoryMonth/${idMaquina}/${months}`, { cache: 'no-store' }).then(function (response) {
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

function getMediaCpuAllDay(days) {
    mediaCpuAllDay.length = 0
    fetch(`/routeLeandro/getMediaCpuAllDay/${idMaquina}/${days}`, { cache: 'no-store' }).then(function (response) {
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

function getMediaCpuAllMonth(months) {
    mediaCpuAllMonth.length = 0
    fetch(`/routeLeandro/getMediaCpuAllMonth/${idMaquina}/${months}`, { cache: 'no-store' }).then(function (response) {
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

function getMediaMemoryAllDay(days) {
    mediaMemoryAllDay.length = 0
    fetch(`/routeLeandro/getMediaMemoryAllDay/${idMaquina}/${days}`, { cache: 'no-store' }).then(function (response) {
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

function getMediaMemoryAllMonth(months) {
    mediaMemoryAllMonth.length = 0
    fetch(`/routeLeandro/getMediaMemoryAllMonth/${idMaquina}/${months}`, { cache: 'no-store' }).then(function (response) {
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

                if (resposta[0].cpu <= 45) {
                    idKpiMediaCpuDay.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    idKpiMediaCpuDay.style = `color: darkgreen !important`
                } else if (resposta[0].cpu < 80) {
                    idKpiMediaCpuDay.style = `color: darkyellow !important`
                } else if (resposta[0].cpu < 90) {
                    idKpiMediaCpuDay.style = `color: orange !important`
                } else {
                    idKpiMediaCpuDay.style = `color: red !important`
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

                idKpiMediaCpuAllTime.innerHTML = `${Math.round(resposta[0].cpu, 0)}%`

                if (resposta[0].cpu <= 45) {
                    idKpiMediaCpuAllTime.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    idKpiMediaCpuAllTime.style = `color: darkgreen !important`
                } else if (resposta[0].cpu < 80) {
                    idKpiMediaCpuAllTime.style = `color: darkyellow !important`
                } else if (resposta[0].cpu < 90) {
                    idKpiMediaCpuAllTime.style = `color: orange !important`
                } else {
                    idKpiMediaCpuAllTime.style = `color: red !important`
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
    fetch(`/routeLeandro/kpiMediaMemoryDay`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                idKpiMediaMemoryDay.innerHTML = `${Math.round(resposta[0].memory, 0)}%`

                if (resposta[0].cpu <= 45) {
                    idKpiMediaMemoryDay.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    idKpiMediaMemoryDay.style = `color: darkgreen !important`
                } else if (resposta[0].cpu < 80) {
                    idKpiMediaMemoryDay.style = `color: darkyellow !important`
                } else if (resposta[0].cpu < 90) {
                    idKpiMediaMemoryDay.style = `color: orange !important`
                } else {
                    idKpiMediaMemoryDay.style = `color: red !important`
                }

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

                if (resposta[0].cpu <= 45) {
                    idKpiMediaMemoryAllTime.style = `color: green !important`
                } else if (resposta[0].cpu < 65) {
                    idKpiMediaMemoryAllTime.style = `color: darkgreen !important`
                } else if (resposta[0].cpu < 80) {
                    idKpiMediaMemoryAllTime.style = `color: darkyellow !important`
                } else if (resposta[0].cpu < 90) {
                    idKpiMediaMemoryAllTime.style = `color: orange !important`
                } else {
                    idKpiMediaMemoryAllTime.style = `color: red !important`
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

updateDashboardMediaCpuDay(14)
updateDashboardMediaMemoryDay(14)
updateDashboardMediaCpuMonth(12)
updateDashboardMediaMemoryMonth(12)

getMediaCpuAllDay(14)
getMediaCpuAllMonth(12)
getMediaMemoryAllDay(14)
getMediaMemoryAllMonth(12)

// setInterval(kpiMediaCpuDay, 1000)
// setInterval(kpiMediaCpuAllTime, 1000)
// setInterval(kpiMediaMemoryDay, 1000)
// setInterval(kpiMediaMemoryAllTime, 1000)

kpiMediaCpuDay()
kpiMediaCpuAllTime()
kpiMediaMemoryDay()
kpiMediaMemoryAllTime()

setInterval(updateDashboards, 1000)

function updateDashboards() {
    varDashboardMediaCpuDay.update()
    varDashboardMediaCpuMonth.update()
    varDashboardMediaMemoryDay.update()
    varDashboardMediaMemoryMonth.update()
}
