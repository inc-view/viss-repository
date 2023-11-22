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
