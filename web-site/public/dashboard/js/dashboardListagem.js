fazerLista(), pegarCpuON(),pegarCpuOff(),pegarTotalComputadores(),pegarCpuProblema()

function pegarCpuON(){
    fetch(`/routeDashListagem/ListagemCpuON?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var modificarElement = document.getElementById("TextOnline")
                modificarHtml = modificarElement.innerHTML;
               
                modificarHtml += `${resposta[0].TotalDeComputadoresOnline}`

                modificarElement.innerHTML = modificarHtml

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}
function pegarCpuProblema(){
    fetch(`/routeDashListagem/ListagemCpusProblema?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var modificarElement = document.getElementById("TextComputadorProblema")
                modificarHtml = modificarElement.innerHTML;
               
                modificarHtml += `${resposta[0].totalCpuProblema}`

                modificarElement.innerHTML = modificarHtml

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}
function pegarCpuOff(){
    fetch(`/routeDashListagem/ListagemCpuOff?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificarElement = document.getElementById("TextOfline")
                modificarHtml = modificarElement.innerHTML;
               
                modificarHtml += `${resposta[0].TotalDeComputadoresOfline}`

                modificarElement.innerHTML = modificarHtml
                    

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}

function pegarTotalComputadores() {
    fetch(`/routeDashListagem/ListagemTotalComputadores?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);

                // Selecionar todos os elementos com a classe "TotalComputadores"
                var modificarElements = document.querySelectorAll(".TotalComputadores");

                // Verificar se algum elemento foi encontrado
                if (modificarElements.length > 0) {
                    modificarElements.forEach(function(modificarElement) {
                        var modificarHtml = modificarElement.innerHTML;
                        modificarHtml += `${resposta[0].totalComputadores}`;
                        modificarElement.innerHTML = modificarHtml;
                    });
                } else {
                    console.error('Elementos com a classe "TotalComputadores" não encontrados.');
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}


function fazerLista(){
    fetch(`/routeDashListagem/fazerLista?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var listaElement = document.getElementById("Lista")
                
                listaHtml = listaElement.innerHTML;

                for (i = 0; i < resposta.length; i++) {
                    listaHtml +=  `<tr>
                    <td class="py-1"> 
                    <a style="text-decoration: none; color: black;" target="_blank" href="./dashboardLeandro.html?id=${resposta[i].idComputador}">${resposta[i].NomeFuncionario}</a>

                    </td>
                    <td>
                     ${resposta[i].IpComputador}
                    </td>`
                    if (resposta[i].PorcentagemCPU == undefined ||resposta[i].PorcentagemCPU == null ){
                        listaHtml+= `<td>
                        <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div> 
                        </td>`
                    }else if (resposta[i].PorcentagemCPU <= 33){
                        listaHtml+=`<td>
                    <div class="progress">
                    <div id="Barra" class="progress-bar bg-success" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div> 
                    </td>`}else if (resposta[i].PorcentagemCPU<= 66){listaHtml+=`<td>
                    <div class="progress">
                    <div id="Barra" class="progress-bar bg-success" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div> 
                    </td>`}else if(resposta[i].PorcentagemCPU>66){
                        listaHtml+=`<td>
                    <div class="progress">
                    <div id="Barra" class="progress-bar bg-danger" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div> 
                    </td>`
                    }
                    if(resposta[i].Status == 1){
                        listaHtml+= `
                        <td>
                        <label class="badge badge-success">Online</label>
                      </td>` 
                    }else if (respota[i.Status == 0]){listaHtml += `<td><label class="badge badge-danger">Offline</label></td>`}
                    
                    listaHtml+= `<td>
                      ${resposta[i].UltimaSessao}
                    </td>
                  </tr>`
                  
                }
                listaElement.innerHTML = listaHtml;
                
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })
    
}


