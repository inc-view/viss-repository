fazerLista(), pegarTMA(), pegarTotalComputadores(), pegarTotalChamadas()

setInterval(pegarCpuOff, 7000);
setInterval(pegarTotalComputadores, 7000);
setInterval(pegarCpuProblema, 7000);

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
                modificarHtml = `${resposta[0].TMA}`

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
                    
                    let tdNome = document.createElement("td");
                    tdNome.setAttribute("class", "py-1");
                    tdNome.innerHTML = `${resposta[i].nome_funcionario}`
                    tr.appendChild(tdNome);

                    let tdTMA = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].TMA}`
                    tr.appendChild(tdTMA);

                    let tdIp = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].chamadas_recebidas}`
                    tr.appendChild(tdIp);

                    let tdporAtendidas = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].chamadas_atendidas}`
                    tr.appendChild(tdporAtendidas);
                   
                    let tdporAtendidasPorc = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].porcentagem_atendidas}%`
                    tr.appendChild(tdporAtendidasPorc);

                
                    let chamadasAbandonadas = document.createElement("td");
                    tr.appendChild(chamadasAbandonadas);
                    tdUltimaSessao.innerHTML = `${resposta[i].chamadas_abandonadas}`;

                    let tdUltimaSessao = document.createElement("td");
                    tr.appendChild(tdUltimaSessao);
                    tdUltimaSessao.innerHTML = `${resposta[i].duracao_total}`;

                    tr.onclick = () => { window.location.href = `./dashboardLeandro.html?id=${resposta[i].idComputador}` }
                    tr.style.cursor = "pointer";
                    listaElement.appendChild(tr);
                }

            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}



function fazerListaPorNome(){

    var NomePesquisa = ipt_Pesquisa.value;

    fetch(`/InfoFuncionarioDash/fazerListaPorNome`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa : localStorage.FK_EMPRESA,
            nome : NomePesquisa
        })
     }).then(function (response) {

        var listaElement = document.getElementById("Lista")
        listaElement.innerHTML = '';

        if(response.status == 200){
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
    
            
                    for (let i = 0; i < resposta.length; i++) {
    
                        let tr = document.createElement("tr");
                    
                        let tdNome = document.createElement("td");
                        tdNome.setAttribute("class", "py-1");
                        tdNome.innerHTML = `${resposta[i].nome_funcionario}`
                        tr.appendChild(tdNome);
    
                        let tdTMA = document.createElement("td");
                        tdIp.innerHTML = `${resposta[i].TMA}`
                        tr.appendChild(tdTMA);
    
                        let tdIp = document.createElement("td");
                        tdIp.innerHTML = `${resposta[i].chamadas_recebidas}`
                        tr.appendChild(tdIp);
    
                        let tdporAtendidas = document.createElement("td");
                        tdIp.innerHTML = `${resposta[i].chamadas_atendidas}`
                        tr.appendChild(tdporAtendidas);
                       
                        let tdporAtendidasPorc = document.createElement("td");
                        tdIp.innerHTML = `${resposta[i].porcentagem_atendidas}%`
                        tr.appendChild(tdporAtendidasPorc);
    
                    
                        let chamadasAbandonadas = document.createElement("td");
                        tr.appendChild(chamadasAbandonadas);
                        tdUltimaSessao.innerHTML = `${resposta[i].chamadas_abandonadas}`;
    
                        let tdUltimaSessao = document.createElement("td");
                        tr.appendChild(tdUltimaSessao);
                        tdUltimaSessao.innerHTML = `${resposta[i].duracao_total}`;
    
                        tr.onclick = () => { window.location.href = `./dashboardLeandro.html?id=${resposta[i].idComputador}` }
                        tr.style.cursor = "pointer";
                        listaElement.appendChild(tr);
                    }
    
                });

            } else {
                console.warn('Nenhum dado encontrado ou erro na API');
            }
        }else{
            listaElement.innerHTML = "Nenhum resultado encontrado"
        }

       
    })

}
