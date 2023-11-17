function ppmAtual(numero) {
    console.log('na js');
    fetch(`/J-routes/ppmAtual`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // a resposta é [ { 'round(AVG(registro), 0)': '110' } ], quero ela sem casas decimais
                document.getElementById("ppmAtual").innerHTML = resposta[0]['round(AVG(registro), 0)']
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })
}

function ppmIdeal() {
    fetch(`/J-dashboard/ppmIdeal/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // document.getElementById("atendimentosAtual").innerHTML = resposta[1]
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function atendimentoAtual() {
    fetch(`/J-dashboard/atendimentoAtual/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // document.getElementById("ppmIdeal").innerHTML = resposta[2]
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function atendimentoIdeal() {
    fetch(`/J-dashboard/atendimentoIdeal/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // document.getElementById("atendimentosIdeal").innerHTML = resposta[3]
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function graficoProdutividade() {
    fetch(`/J-dashboard/graficoProdutividade/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}