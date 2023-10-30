fazerLista(), pegarCpuOff(), pegarTotalComputadores(), pegarCpuProblema()


function pegarCpuProblema() {
    fetch(`/routeDashListagem/ListagemCpusProblema?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var modificarElement = document.getElementById("TextComputadorProblema")
                modificarHtml = modificarElement.innerHTML;
                modificarElement.innerHTML = ``;
                modificarHtml += `${resposta[0].totalCpuProblema}`

                modificarElement.innerHTML = modificarHtml

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

}
function pegarCpuOff() {
    fetch(`/routeDashListagem/ListagemCpuOff?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                var modificarElement = document.getElementById("TextOfline")
                modificarHtml = modificarElement.innerHTML;
                modificarElement.innerHTML = ``;
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
                    modificarElements.forEach(function (modificarElement) {
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


function fazerLista() {
    fetch(`/routeDashListagem/fazerLista?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.warn(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var listaElement = document.getElementById("Lista")
                listaElement.innerHTML = '';
                for (let i = 0; i < resposta.length; i++) {
                    // let a = document.createElement("a");
                    // a.style.textDecoration = "none";
                    // a.style.color = "black";
                    // a.setAttribute("target", "_self");
                    // a.setAttribute("href", `./dashboardLeandro.html?id=${resposta[i].idComputador}`);

                    let tr = document.createElement("tr");

                    let tdNome = document.createElement("td");
                    tdNome.setAttribute("class", "py-1");
                    tdNome.innerHTML = `${resposta[i].NomeFuncionario}`
                    tr.appendChild(tdNome);

                    let tdIp = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].IpComputador}`
                    tr.appendChild(tdIp);

                    let tdProgress = document.createElement("td");
                    
                    tr.appendChild(tdProgress);
                    
                    let divProgress = document.createElement("div");
                    tdProgress.appendChild(divProgress);
                    divProgress.setAttribute("class","progress");
                    
                    let divBarraProgresso = document.createElement("div");
                    divProgress.appendChild(divBarraProgresso);
                    divBarraProgresso.setAttribute("id","Barra")
                    if (resposta[i].PorcentagemCPU == undefined || resposta[i].PorcentagemCPU == null || resposta[i].PorcentagemCPU < 66) {                    
                        divBarraProgresso.setAttribute("class","progress-bar bg-sucess");
                    }else if(resposta[i].PorcentagemCPU <90 ){
                        divBarraProgresso.setAttribute("class","progress-bar bg-warning");
                    }else{
                        divBarraProgresso.setAttribute("class","progress-bar bg-danger");
                    }
                    divBarraProgresso.setAttribute("role","progressbar");
                    if(resposta[i].PorcentagemCPU == null){
                        divBarraProgresso.style.width = 0+"%";
                    }else{
                    divBarraProgresso.style.width = resposta[i].PorcentagemCPU+"%";}
                    divBarraProgresso.setAttribute("aria-valuenow", 10);
                    divBarraProgresso.setAttribute("aria-valuemin", 0);
                    divBarraProgresso.setAttribute("aria-valuemax", 100);


                    let tdStatus = document.createElement("td");
                    tr.appendChild(tdStatus);
                    let labelStatus = document.createElement("label");
                    tdStatus.appendChild(labelStatus);
                    if (resposta[i].Status == 1){
                        labelStatus.setAttribute("class","badge badge-success");
                        labelStatus.innerHTML = `Online`;    
                    }
                    else if(resposta[i].Status == 0 || resposta[i].Status == null){
                        labelStatus.setAttribute("class","badge badge-danger");
                        labelStatus.innerHTML = `Offline`;
                    }

                    let tdUltimaSessao = document.createElement("td");
                    tr.appendChild(tdUltimaSessao);
                    tdUltimaSessao.innerHTML = `${resposta[i].UltimaSessao}`;
                    
                    tr.onclick = ()=>{window.location.href = `./dashboardLeandro.html?id=${resposta[i].idComputador}`}
                    tr.style.cursor = "pointer";
                    listaElement.appendChild(tr);
                }

        
            

                // listaHtml = listaElement.innerHTML;

                // listaHtml += ` <a style="text-decoration: none; color: black;" target="_self" href="./dashboardLeandro.html?id=${resposta[i].idComputador}">`
                // for (i = 0; i < resposta.length; i++) {
                //     listaHtml +=  `<tr>
                //     <td class="py-1"> 
                //    ${resposta[i].NomeFuncionario}
                //     </td>
                //     <td>
                //      ${resposta[i].IpComputador}
                //     </td>`
                //     if (resposta[i].PorcentagemCPU == undefined ||resposta[i].PorcentagemCPU == null ){
                //         listaHtml+= `<td>
                //         <div class="progress">

                //         <div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                //       </div> 
                //         </td>`
                //     }else if (resposta[i].PorcentagemCPU <= 33){
                //         listaHtml+=`<td>
                //     <div class="progress">
                //     <div id="Barra" class="progress-bar bg-success" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                //   </div> 
                //     </td>`}else if (resposta[i].PorcentagemCPU<= 66){listaHtml+=`<td>
                //     <div class="progress">
                //     <div id="Barra" class="progress-bar bg-success" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                //   </div> 
                //     </td>`}else if(resposta[i].PorcentagemCPU>66){
                //         listaHtml+=`<td>
                //     <div class="progress">
                //     <div id="Barra" class="progress-bar bg-danger" role="progressbar" style="width: ${resposta[i].PorcentagemCPU}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                //   </div> 
                //     </td>`
                //     }
                //     if(resposta[i].Status == 1){
                //         listaHtml+= `
                //         <td>
                //         <label class="badge badge-success">Online</label>
                //       </td>` 
                //     }else if (respota[i.Status == 0]){listaHtml += `<td><label class="badge badge-danger">Offline</label></td>`}

                //     listaHtml+= `<td>
                //       ${resposta[i].UltimaSessao}
                //     </td>
                //     <td>

                //     </td>
                //   </tr>`



                //   listaElement.innerHTML = listaHtml
                // }


            });
} else {
    console.warn('Nenhum dado encontrado ou erro na API');
}
    })

}

                
function fazerListaComputadoresOffline(){
    fetch(`/routeDashListagem/fazerListaCpuOffline?fkEmpresa=${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var listaElement = document.getElementById("Lista")
                listaElement.innerHTML = '';
                for (let i = 0; i < resposta.length; i++) {
                    
                    let a = document.createElement("a");
                    a.style.textDecoration = "none";
                    a.style.color = "black";
                    a.setAttribute("target", "_self");
                    a.setAttribute("href", `./dashboardLeandro.html?id=${resposta[i].idComputador}`);

                    let tr = document.createElement("tr");

                    let tdNome = document.createElement("td");
                    tdNome.setAttribute("class", "py-1");
                    tdNome.innerHTML = `${resposta[i].NomeFuncionario}`
                    tr.appendChild(tdNome);

                    let tdIp = document.createElement("td");
                    tdIp.innerHTML = `${resposta[i].IpComputador}`
                    tr.appendChild(tdIp);

                    let tdProgress = document.createElement("td");
                    
                    tr.appendChild(tdProgress);
                    
                    let divProgress = document.createElement("div");
                    tdProgress.appendChild(divProgress);
                    divProgress.setAttribute("class","progress");
                    
                    let divBarraProgresso = document.createElement("div");
                    divProgress.appendChild(divBarraProgresso);
                    divBarraProgresso.setAttribute("id","Barra")
                    if (resposta[i].PorcentagemCPU == undefined || resposta[i].PorcentagemCPU == null || resposta[i].PorcentagemCPU < 66) {                    
                        divBarraProgresso.setAttribute("class","progress-bar bg-sucess");
                    }else if(resposta[i].PorcentagemCPU <85 ){
                        divBarraProgresso.setAttribute("class","progress-bar bg-warning");
                    }else{
                        divBarraProgresso.setAttribute("class","progress-bar bg-danger");
                    }
                    divBarraProgresso.setAttribute("role","progressbar");
                    if(resposta[i].PorcentagemCPU == null){
                        divBarraProgresso.style.width = 0+"%";
                    }else{
                    divBarraProgresso.style.width = resposta[i].PorcentagemCPU+"%";}
                    divBarraProgresso.setAttribute("aria-valuenow", 10);
                    divBarraProgresso.setAttribute("aria-valuemin", 0);
                    divBarraProgresso.setAttribute("aria-valuemax", 100);


                    let tdStatus = document.createElement("td");
                    tr.appendChild(tdStatus);
                    let labelStatus = document.createElement("label");
                    tdStatus.appendChild(labelStatus);
                    if (resposta[i].Status == 1){
                        labelStatus.setAttribute("class","badge badge-success");
                        labelStatus.innerHTML = `Online`;    
                    }
                    else if(resposta[i].Status == 0 || resposta[i].Status == null){
                        labelStatus.setAttribute("class","badge badge-danger");
                        labelStatus.innerHTML = `Offline`;
                    }

                    let tdUltimaSessao = document.createElement("td");
                    tr.appendChild(tdUltimaSessao);
                    tdUltimaSessao.innerHTML = `${resposta[i].UltimaSessao}`;
                    
                    tr.onclick = ()=>{window.location.href = `./dashboardLeandro.html?id=${resposta[i].idComputador}`}
                    tr.style.cursor = "pointer";
                    listaElement.appendChild(tr);
                }
            

            });
} else {
    console.warn('Nenhum dado encontrado ou erro na API');
}
    }) 

                }  






