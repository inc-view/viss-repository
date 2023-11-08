labelsDashboardMediaCpu = []
mediaCpuData = []

var varDashboardMediaCpu = new Chart(dashboardMediaCpu, {
    type: `bar`,
    data: {
        labels: labelsDashboardCpu,
        datasets: [{
            label: `Uso da Memória`,
            data: mediaCpuData,
            borderColor: '#B80096'
        },
        {
            data: Array(5).fill(90),
            borderColor: '#e06666',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            pointRadius: 0,
            borderWidth: 2
        },
        {
            data: Array(5).fill(65),
            borderColor: '#ffc61a',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            pointRadius: 0,
            borderWidth: 2
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