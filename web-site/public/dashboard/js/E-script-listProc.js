let nameSerieOne = "";
let dataSerieOne = [];

let nameSerieTwo = "";
let dataSerieTwo = [];

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
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
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
    nameSerieOne = dados[firstLine.value].nameSerie;
    dataSerieOne = dados[firstLine.value].dataSerie;

    chartColMonth.updateSeries([
      {
        name: nameSerieOne,
        data: dataSerieOne,
      },
      {
        name: nameSerieTwo,
        data: dataSerieTwo,
      },
    ]);
  } else {
    alert("Comparação de gráficos iguais");
  }
});

// Atualizar dados do >> Segundo grafico
secondLine.addEventListener("change", () => {
  if (secondLine.value != firstLine.value) {
    nameSerieTwo = dados[secondLine.value].nameSerie;
    dataSerieTwo = dados[secondLine.value].dataSerie;

    chartColMonth.updateSeries([
      {
        name: nameSerieOne,
        data: dataSerieOne,
      },
      {
        name: nameSerieTwo,
        data: dataSerieTwo,
      },
    ]);
  } else {
    alert("Comparação de gráficos iguais");
  }
});

// ------------------------------------

function listMainProcess(){

  let orderByQuery = selectListProcess.value;

  fetch(`/processo/listar/`, 
  { method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderby: orderByQuery,
      empresa: localStorage.getItem("FK_EMPRESA")  
    })
  }).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {

          let listMain = document.getElementById("listProcessMain");
          let classColorCPU = "";
          let classColorRAM = "";
          listMain.innerHTML = "";

          if(data.length > 0){

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
                            <p class="text-success">${row.cpu}%</p>
                          </div>

                          <div class="progress progress-md">
                            <div
                              class="progress-bar ${classColorCPU}"
                              role="progressbar"
                              style="width: ${Math.round(row.cpu, 0)}%"
                              aria-valuenow="${Math.round(row.cpu, 0)}"
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
                            <p class="text-success">${row.ram}%</p>
                          </div>

                          <div class="progress progress-md">
                            <div
                              class="progress-bar ${classColorRAM}"
                              role="progressbar"
                              style="width: ${Math.round(row.ram, 0)}%"
                              aria-valuenow="${Math.round(row.ram, 0)}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  
                  `;
            });

          }else{
            listMain.innerHTML = "<h4> Nenhum resultado encontrado </h4>"
          }

        });
      }
    }
  );

}

const selectListProcess = document.getElementById("selectListProcess");
selectListProcess.addEventListener("change", ()=>{listMainProcess()})


function totalProcess(){

  fetch(`/processo/count/${localStorage.getItem("FK_EMPRESA")}`,).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {
          document.getElementById("totalProcessDiv").innerHTML = data[0].qtde
        });
      }
    }
  );

}



function listTopThreeProcess(){

  let orderByQuery = selectTopThree.value;

  fetch(`/processo/listarThree/`, 
  { method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderby: orderByQuery,
      empresa: localStorage.getItem("FK_EMPRESA")  
    })
  }).then(
    (response) => {
      if (response.ok) {
        response.json().then((data) => {

          //let listMain = document.getElementById("listProcessMain");

          if(data.length > 0){

            document.getElementById("titleTopThree").innerHTML = (orderByQuery == "horas_uso") ? "Mais usados" : "Maior consumo"
            
            let listTopThree = document.getElementById("appendTopThree")
            listTopThree.innerHTML = ""

            data.forEach((row) => {
              if(orderByQuery == "horas_uso"){

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
                `
              }else{

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
                `

              }


            });

          }else{
            listTopThree.innerHTML = "<h4> Nenhum resultado encontrado </h4>"
          }

        });
      }
    }
  );
}

const selectTopThree = document.getElementById("selectTopThree")
selectTopThree.addEventListener("change", ()=>{listTopThreeProcess()})




window.onload = ()=>{
  listMainProcess()
  listTopThreeProcess()
  totalProcess()
}


