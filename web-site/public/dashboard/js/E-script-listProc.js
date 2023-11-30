let nameSerieOne = "";
let dataSerieOne = [];

let nameSerieTwo = "";
let dataSerieTwo = [];

let labels = []

var dataAtual = new Date();
var dia = dataAtual.getDate();


var optionsColMonth = {
  series: [
    {
      name: nameSerieOne,
      data: dataSerieOne,
    },
    {
      name: nameSerieTwo,
      data: dataSerieTwo,
    },
  ],
  noData: {
    text: "Loading...",
  },
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: labels
  },
};

var chartColMonth = new ApexCharts(
  document.querySelector("#chartColMonth"),
  optionsColMonth
);
chartColMonth.render();

let dados = {
  1: {
    nameSerie: "A",
    dataSerie: [40, 40, 28, 10, 25, 109, 99],
  },
  2: {
    nameSerie: "B",
    dataSerie: [41, 58, 28, 51, 25, 59, 10],
  },
  3: {
    nameSerie: "C",
    dataSerie: [15, 25, 30, 25, 35, 45, 55],
  },
};

let firstLine = document.getElementById("selectOne");
let secondLine = document.getElementById("selectTwo");

// Atualizar dados do >> Primeiro grafico
firstLine.addEventListener("change", () => {
  if (firstLine.value != secondLine.value) {

    nameSerieOne = "Primeira Linha";
    dataSerieOne = [];
    labels = []

    var option = firstLine.children[firstLine.selectedIndex];
    var nameSerieOne = option.textContent;

    fetch(`/processo/getFirstLine/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkProcesso: firstLine.value ,
        empresa: localStorage.getItem("FK_EMPRESA"),
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {

          if (data.length > 0) {
            
            data.reverse()

            for(var i = 0; i < 7; i++){

              if(data[i] != undefined){
                labels.push(data[i].dia)
                dataSerieOne.push(data[i].cpu);
              }else{
                dataSerieOne.push(0);
                labels.push(labels[i-1] - 1)
              }
             
            }

          }


          chartColMonth.updateSeries([
            {
              name: nameSerieOne,
              data: dataSerieOne.reverse(),
            },
            {
              name: nameSerieTwo,
              data: dataSerieTwo,
            },
          ]);
      
          chartColMonth.updateOptions({
              xaxis: {
                  categories: labels.reverse(),
              },
          });

          document.getElementById('horasUsoOne').innerHTML = (data[0].dia == dia) ? data[0].horas_uso : "00:00:00"
          document.getElementById('cpuUsoOne').innerHTML = (data[0].dia == dia) ? data[0].cpu : "0.0"
        });
      }
    });

  } else {
    alert("Comparação de gráficos iguais");
  }

});


// Atualizar dados do >> Segundo grafico
secondLine.addEventListener("change", () => {
  if (firstLine.value != secondLine.value) {

    nameSerieTwo = "";
    dataSerieTwo = [];
    labels = []

    var option = secondLine.children[secondLine.selectedIndex];
    var nameSerieTwo = option.textContent;

    fetch(`/processo/getFirstLine/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkProcesso: secondLine.value ,
        empresa: localStorage.getItem("FK_EMPRESA"),
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {

          if (data.length > 0) {
            
            data.reverse()

            for(var i = 0; i < 7; i++){

              if(data[i] != undefined){
                labels.push(data[i].dia)
                dataSerieTwo.push(Math.round(data[i].cpu));
              }else{
                dataSerieTwo.push(0);
                labels.push(labels[i-1] - 1)
              }
             
            }

          }

          chartColMonth.updateSeries([
            {
              name: nameSerieOne,
              data: dataSerieOne.reverse(),
            },
            {
              name: nameSerieTwo,
              data: dataSerieTwo.reverse(),
            },
          ]);
      
          chartColMonth.updateOptions({
              xaxis: {
                  categories: labels.reverse(),
              },
          });

          document.getElementById('horasUsoTwo').innerHTML = (data[0].dia == dia) ? data[0].horas_uso : "00:00:00"
          document.getElementById('cpuUsoTwo').innerHTML = (data[0].dia == dia) ? data[0].cpu : "0.0"

        });
      }
    });

  } else {
    alert("Comparação de gráficos iguais");
  }
});




// ------------------------------------




function listMainProcess() {
  let orderByQuery = selectListProcess.value;

  fetch(`/processo/listar/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderby: orderByQuery,
      empresa: localStorage.getItem("FK_EMPRESA"),
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        let listMain = document.getElementById("listProcessMain");
        let classColorCPU = "";
        let classColorRAM = "";
        listMain.innerHTML = "";
        document.getElementById("selectOne").innerHTML = ""
        document.getElementById("selectTwo").innerHTML = ""

        if (data.length > 0) {
          data.forEach((row) => {
            if (row.cpu == undefined || row.cpu == null || row.cpu < 66) {
              classColorCPU = "bg-success";
            } else if (row.cpu < 90) {
              classColorCPU = "bg-warning";
            } else {
              classColorCPU = "bg-danger";
            }

            if (row.ram == undefined || row.ram == null || row.ram < 66) {
              classColorRAM = "bg-success";
            } else if (row.ram < 90) {
              classColorRAM = "bg-warning";
            } else {
              classColorRAM = "bg-danger";
            }

            listMain.innerHTML += `
                  
                    <tr>
                      <td>
                        <div class="d-flex">
                          <div>
                            <h6>${row.processo}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h6>${row.horas_uso}</h6>
                      </td>

                      <td>
                        <div>
                          <div
                            class="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap"
                          >
                            <p class="text-success">${parseFloat(row.cpu.toFixed(2))}%</p>
                          </div>

                          <div class="progress progress-md">
                            <div
                              class="progress-bar ${classColorCPU}"
                              role="progressbar"
                              style="width: ${parseFloat(row.cpu.toFixed(2))}%"
                              aria-valuenow="${parseFloat(row.cpu.toFixed(2))}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div>
                          <div
                            class="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap"
                          >
                            <p class="text-success">${parseFloat(row.ram.toFixed(2))}%</p>
                          </div>

                          <div class="progress progress-md">
                            <div
                              class="progress-bar ${classColorRAM}"
                              role="progressbar"
                              style="width: ${parseFloat(row.ram.toFixed(2))}%"
                              aria-valuenow="${parseFloat(row.ram.toFixed(2))}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  
                  `;

                  document.getElementById("selectOne").innerHTML += `<option value="${row.fkProcesso}">${row.processo}</option>`
                  document.getElementById("selectTwo").innerHTML += `<option value="${row.fkProcesso}">${row.processo}</option>`

          });

        } else {
          listMain.innerHTML = "<h4> Nenhum resultado encontrado </h4>";
        }
      });
    }
  });
}

const selectListProcess = document.getElementById("selectListProcess");
selectListProcess.addEventListener("change", () => {
  listMainProcess();
});

function totalProcess() {
  fetch(`/processo/count/${localStorage.getItem("FK_EMPRESA")}`).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {
          document.getElementById("totalProcessDiv").innerHTML = data[0].qtde;
        });
      }
    }
  );
}

function listTopThreeProcess() {
  let orderByQuery = selectTopThree.value;

  fetch(`/processo/listarThree/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderby: orderByQuery,
      empresa: localStorage.getItem("FK_EMPRESA"),
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        //let listMain = document.getElementById("listProcessMain");

        if (data.length > 0) {
          document.getElementById("titleTopThree").innerHTML =
            orderByQuery == "horas_uso" ? "Mais usados" : "Maior consumo";

          let listTopThree = document.getElementById("appendTopThree");
          listTopThree.innerHTML = "";

          data.forEach((row) => {
            if (orderByQuery == "horas_uso") {
              listTopThree.innerHTML += `

                  <div class="list align-items-center border-bottom py-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex align-items-center">
                        <p class="mb-0 text-medium text-black">
                          ${row.processo}
                        </p>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="mdi mdi-timer text-black me-1"></i>
                        <p class="mb-0 text-small text-black">
                        ${row.horas_uso}
                        </p>
                      </div>
                    </div>
                  </div>
                `;
            } else {
              listTopThree.innerHTML += `

                  <div class="list align-items-center border-bottom py-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex align-items-center">
                        <p class="mb-0 text-medium text-black">
                          ${row.processo}
                        </p>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="mdi mdi-memory text-black me-1"></i>
                        <p class="mb-0 text-small text-black">
                        ${row.cpu}
                        </p>
                      </div>
                    </div>
                  </div>
                `;
            }
          });
        } else {
          listTopThree.innerHTML = "<h4> Nenhum resultado encontrado </h4>";
        }
      });
    }
  });
}

const selectTopThree = document.getElementById("selectTopThree");
selectTopThree.addEventListener("change", () => {
  listTopThreeProcess();
});

window.onload = () => {
  listMainProcess();
  listTopThreeProcess();
  totalProcess();
};
