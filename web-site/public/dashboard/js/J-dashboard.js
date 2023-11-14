function fazerListaComputadoresOffline() {
    fetch(`/J-dashboard/kpisProdutividade/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                document.getElementById("ppmAtual").innerHTML = resposta[0]
                document.getElementById("atendimentosAtual").innerHTML = resposta[1]
                document.getElementById("ppmIdeal").innerHTML = resposta[2]
                document.getElementById("atendimentosIdeal").innerHTML = resposta[3]
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}