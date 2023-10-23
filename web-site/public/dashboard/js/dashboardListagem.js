function pegarCpuON(){
    fetch(`/dashboardListagem/ListagemCpuON`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificar = document.getElementById("TextOnline")
                modificar = resposta[0].pegarCpuON
                    

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}
function pegarCpuOff(){
    fetch(`/dashboardListagem/ListagemCpuOff`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificar = document.getElementById("TextOffline")
                modificar = `${resposta[0].pegarCpuOff}`
                    

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}

function fazerLista(){
    fetch(`/routeLeandro/dashboardMemory/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var lista = document.getElementById("Lista")
                

                for (i = 0; i < resposta.length; i++) {
                    lista +=  `<tr>
                    <td class="py-1">
                    ${resposta[i].NomeFuncionario}
                    </td>
                    <td>
                     ${resposta[i].IpComputador}
                    </td>
                    <td>
                     ${respota[i].PorcentagemCPU}
                    </td>`
                    if(resposta[i].Status == 1){
                        lista+= `<td>
                        <label class="badge badge-success">Online</label>
                      </td>` 
                    }else if (respota[i.Status == 0]){lista += `<td><label class="badge badge-danger">Offline</label></td>`}
                    
                    lista+= `<td>
                      ${resposta[i].UltimaSessao}
                    </td>
                  </tr>`
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    
}

