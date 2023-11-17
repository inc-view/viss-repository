function ppmAtual() {
    var valor = localStorage.getItem('FK_EMPRESA')
    console.log(valor)
    //mandar a variavel valor o J-routes
    fetch(`/J-routes/ppmAtual?empresa=${valor}`, { cache: 'no-store' }).then(function (response) {
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
    var valor = localStorage.getItem('FK_EMPRESA')
    fetch(`/J-routes/ppmIdeal?empresa=${valor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // a resposta é [ { media_ppm: null } ], quero ela sem casas decimais

                document.getElementById("ppmIdeal").innerHTML = resposta[0]['media_ppm'];
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function atendimentoAtual() {
    var valor = localStorage.getItem('FK_EMPRESA')
    fetch(`/J-routes/atendimentoAtual?empresa=${valor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // a resposta é [ { total_ligacoes_atendidas: '113' } ], quero ela sem casas decimais

                document.getElementById("atendimentoAtual").innerHTML = resposta[0]['total_ligacoes_dia']
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function atendimentoIdeal() {
    var valor = localStorage.getItem('FK_EMPRESA')
    fetch(`/J-routes/atendimentoIdeal?empresa=${valor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.error(`Dados recebidos: ${JSON.stringify(resposta)}`);                
                // PUXAR ROTA COM ESSE SELECT
                // a resposta é [ { total_ligacoes_atendidas: 225 } ], quero ela sem casas decimais
                document.getElementById("atendimentoIdeal").innerHTML = resposta[0]['total_ligacoes_atendidas']
            });
        } else {
            console.warn('Nenhum dado encontrado ou erro na API');
        }
    })

}

function graficoProdutividade() {
    var valor = localStorage.getItem('FK_EMPRESA')
    fetch(`/J-routes/graficoProdutividade/${localStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
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