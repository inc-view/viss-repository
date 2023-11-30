
fazerLista(), pegarTMA(), pegarTotalChamadas(), pegarDuracao();

setInterval(pegarTMA, 15000);
setInterval(pegarTotalChamadas, 15000);
setInterval(pegarDuracao, 15000);

function pegarTotalChamadas() {
    fetch(`/InfoFuncionarioDash/ListagemTotalChamadas?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var modificarElement = document.getElementById("TextTotalChamadas")
                modificarHtml = modificarElement.innerHTML;
                modificarElement.innerHTML = ``;
                modificarHtml = `${resposta[0].chamadasAbandonadas}`

                modificarElement.innerHTML = modificarHtml

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

}
function pegarTMA() {
    fetch(`/InfoFuncionarioDash/ListagemTMA?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificarElement = document.getElementById("TextTMA")
                modificarHtml = modificarElement.innerHTML;
                modificarElement.innerHTML = ``;
                modificarHtml = `${resposta[0].TMA.toFixed(4)}`

                modificarElement.innerHTML = modificarHtml


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

}
function pegarDuracao() {
    fetch(`/InfoFuncionarioDash/ListagemDuracao?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificarElement = document.getElementById("TextTempoMedio")
                modificarHtml = modificarElement.innerHTML;
                modificarElement.innerHTML = ``;
                modificarHtml = `${resposta[0].tempoMedioDuracao}`

                modificarElement.innerHTML = modificarHtml


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

}




function fazerLista() {
    fetch(`/InfoFuncionarioDash/fazerLista?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var listaElement = document.getElementById("Lista")
                listaElement.innerHTML = '';
                for (let i = 0; i < resposta.length; i++) {

                    let tr = document.createElement("tr");
                    tr.setAttribute("data-bs-toggle", "modal");
                    tr.setAttribute("data-bs-target", "#modalFunciorio");


                    let tdNome = document.createElement("td");
                    tdNome.setAttribute("class", "py-1");
                    tdNome.innerHTML = `${resposta[i].nome_funcionario}`;
                    tr.appendChild(tdNome);

                    let tdTMA = document.createElement("td");
                    tdTMA.innerHTML = `${resposta[i].TMA.toFixed(4)}`;
                    tr.appendChild(tdTMA);

                    let tdChamada = document.createElement("td");
                    let divChamada = document.createElement("div");
                    divChamada.setAttribute("style", "display: flex; justify-content: center");
                    divChamada.innerHTML = `${resposta[i].chamadas_recebidas}`;
                    tdChamada.appendChild(divChamada);
                    tr.appendChild(tdChamada);

                    let tdporAtendidas = document.createElement("td");
                    let divPorAtendidas = document.createElement("div");
                    divPorAtendidas.setAttribute("style", "display: flex; justify-content: center");
                    divPorAtendidas.innerHTML = `${resposta[i].chamadas_atendidas}`;
                    tdporAtendidas.appendChild(divPorAtendidas);
                    tr.appendChild(tdporAtendidas);

                    let tdChamadasAbandonadas = document.createElement("td");
                    let divChamadasAbandonadas = document.createElement("div");
                    divChamadasAbandonadas.setAttribute("style", "display: flex; justify-content: center");
                    divChamadasAbandonadas.innerHTML = `${resposta[i].chamadas_abandonadas}`;
                    tdChamadasAbandonadas.appendChild(divChamadasAbandonadas);
                    tr.appendChild(tdChamadasAbandonadas);

                    let tdporAtendidasPorc = document.createElement("td");
                    let divPorAtendidasPorc = document.createElement("div");
                    divPorAtendidasPorc.setAttribute("style", "display: flex; justify-content: center");
                    divPorAtendidasPorc.innerHTML = `${resposta[i].porcentagem_atendidas}%`;
                    tdporAtendidasPorc.appendChild(divPorAtendidasPorc);
                    tr.appendChild(tdporAtendidasPorc);

                    let tdDuracao = document.createElement("td");
                    let divDuracao = document.createElement("div");
                    divDuracao.setAttribute("style", "display: flex; justify-content: center");
                    divDuracao.innerHTML = `${resposta[i].duracao_total}`;
                    tdDuracao.appendChild(divDuracao);
                    tr.appendChild(tdDuracao);

                    tr.onclick = () => {
                        localStorage.FK_FUNCIONARIO = resposta[i].id_funcionario,
                            fazerGrafico()
                    }
                    tr.style.cursor = "pointer";
                    listaElement.appendChild(tr);
                }

            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}



function fazerListaPorNome() {

    var NomePesquisa = ipt_Pesquisa.value;

    fetch(`/InfoFuncionarioDash/fazerListaPorNome`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: localStorage.FK_EMPRESA,
            nome: NomePesquisa
        })
    }).then(function (response) {

        var listaElement = document.getElementById("Lista")
        listaElement.innerHTML = '';

        if (response.status == 200) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);


                    for (let i = 0; i < resposta.length; i++) {

                        let tr = document.createElement("tr");
                        tr.setAttribute("data-bs-toggle", "modal");
                        tr.setAttribute("data-bs-target", "#modalFunciorio");


                        let tdNome = document.createElement("td");
                    tdNome.setAttribute("class", "py-1");
                    tdNome.innerHTML = `${resposta[i].nome_funcionario}`;
                    tr.appendChild(tdNome);

                    let tdTMA = document.createElement("td");
                    tdTMA.innerHTML = `${resposta[i].TMA.toFixed(4)}`;
                    tr.appendChild(tdTMA);

                    let tdChamada = document.createElement("td");
                    let divChamada = document.createElement("div");
                    divChamada.setAttribute("style", "display: flex; justify-content: center");
                    divChamada.innerHTML = `${resposta[i].chamadas_recebidas}`;
                    tdChamada.appendChild(divChamada);
                    tr.appendChild(tdChamada);

                    let tdporAtendidas = document.createElement("td");
                    let divPorAtendidas = document.createElement("div");
                    divPorAtendidas.setAttribute("style", "display: flex; justify-content: center");
                    divPorAtendidas.innerHTML = `${resposta[i].chamadas_atendidas}`;
                    tdporAtendidas.appendChild(divPorAtendidas);
                    tr.appendChild(tdporAtendidas);

                    let tdChamadasAbandonadas = document.createElement("td");
                    let divChamadasAbandonadas = document.createElement("div");
                    divChamadasAbandonadas.setAttribute("style", "display: flex; justify-content: center");
                    divChamadasAbandonadas.innerHTML = `${resposta[i].chamadas_abandonadas}`;
                    tdChamadasAbandonadas.appendChild(divChamadasAbandonadas);
                    tr.appendChild(tdChamadasAbandonadas);

                    let tdporAtendidasPorc = document.createElement("td");
                    let divPorAtendidasPorc = document.createElement("div");
                    divPorAtendidasPorc.setAttribute("style", "display: flex; justify-content: center");
                    divPorAtendidasPorc.innerHTML = `${resposta[i].porcentagem_atendidas}%`;
                    tdporAtendidasPorc.appendChild(divPorAtendidasPorc);
                    tr.appendChild(tdporAtendidasPorc);

                    let tdDuracao = document.createElement("td");
                    let divDuracao = document.createElement("div");
                    divDuracao.setAttribute("style", "display: flex; justify-content: center");
                    divDuracao.innerHTML = `${resposta[i].duracao_total}`;
                    tdDuracao.appendChild(divDuracao);
                    tr.appendChild(tdDuracao);

                        tr.onclick = () => {
                            localStorage.FK_FUNCIONARIO = resposta[i].id_funcionario,
                                fazerGrafico()
                        }
                        tr.style.cursor = "pointer";
                        listaElement.appendChild(tr);
                    }

                });

            } else {
                console.warn('Nenhum dado encontrado ou erro na API');
            }
        } else {
            listaElement.innerHTML = "Nenhum resultado encontrado"
        }


    })

}

function fazerGrafico() {
    fetch(`/InfoFuncionarioDash/fazerGrafico`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: localStorage.FK_EMPRESA,
            fkFuncionario: localStorage.FK_FUNCIONARIO
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var options = {
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '50%'
                            }
                        }
                    },
                    series: [resposta[0].chamadas_atendidas, resposta[0].chamadas_abandonadas],
                    labels: ["Atendida", "Recusada"],
                    chart: {

                        type: 'donut',
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            },

                        }
                    }]
                };

                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();

                var modificarElementTMA = document.getElementById("TextTMAFuncionario")
                modificarHtmlTMA = modificarElementTMA.innerHTML;
                modificarElementTMA.innerHTML = ``;
                modificarHtmlTMA = `${resposta[0].TMA.toFixed(4)}`

                modificarElementTMA.innerHTML = modificarHtmlTMA

                var modificarElementDuracao = document.getElementById("TextDuracaoFuncionario")
                modificarHtmlDuracao = modificarElementDuracao.innerHTML;
                modificarElementDuracao.innerHTML = ``;
                modificarHtmlDuracao = `${resposta[0].duracao_total}`

                modificarElementDuracao.innerHTML = modificarHtmlDuracao


            });
        } else {
            console.warn("Nenhum dado encontrado ou erro na API");
        }
    });
}

function LimparSession() {
    localStorage.removeItem('FK_FUNCIONARIO');
}
