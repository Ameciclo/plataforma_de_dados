export const GeneralStatistics = (summaryData, counts) => {
  return {
    title: "Estatísticas Gerais",
    subtitle: "",
    type: "general",
    boxes: [
      { title: "Total de ciclistas", value: summaryData.totalAmount },
      { title: "Contagens Realizadas", value: summaryData.numberOfCounts },
      { title: "Pontos Monitorados", value: counts },
      { title: "Máximo em um ponto", value: summaryData.MaximumValue },
    ],
  };
};

export function getCountingCards(summary) {
  return [
    { label: "Mulheres", icon: "women", data: summary.women_percent },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: summary.children_percent,
    },
    { label: "Capacete", icon: "helmet", data: summary.helmet_percent },
    { label: "Serviço", icon: "service", data: summary.service_percent },
    { label: "Cargueira", icon: "cargo", data: summary.cargo_percent },
    { label: "Contramão", icon: "wrong_way", data: summary.wrong_way_percent },
    { label: "Calçada", icon: "sidewalk", data: summary.sidewalk_percent },
  ];
};

export const getPointsDataForSingleCounting = (d) => {
  return [
    {
      key: d.name,
      latitude: d.location.coordinates[0],
      longitude: d.location.coordinates[1],
      name: d.summary.total,
    },
    {
      key: d.name + " north",
      latitude: d.north.location.coordinates[1],
      longitude: d.north.location.coordinates[0],
      name: d.north.name,
    },
    ,
    {
      key: d.name + " south",
      latitude: d.south.location.coordinates[1],
      longitude: d.south.location.coordinates[0],
      name: d.south.name,
    },
    ,
    {
      key: d.name + " east",
      latitude: d.east.location.coordinates[1],
      longitude: d.east.location.coordinates[0],
      name: d.east.name,
    },
    ,
    {
      key: d.name + " west",
      latitude: d.west.location.coordinates[1],
      longitude: d.west.location.coordinates[0],
      name: d.west.name,
    },
  ];
};

export const CountingStatistic = (data) => {
  const date = new Date(data.date);
  return {
    title: "",
    subtitle: "",
    boxes: [
      { title: "Total de ciclistas", value: data.summary.total },
      { title: "Pico em 1h", value: data.summary.hour_max },
      { title: "Data da Contagem", value: date.toLocaleDateString() },
      {
        type: "LinksBox",
        title: "Dados",
        value: [
          { label: "XLSX", url: data.summary.download_xlsx_url },
          {
            label: "JSON",
            url: `https://api.contagem.ameciclo.org/v1/cyclist-count/${data._id}`,
          },
        ],
      },
    ],
  };
};

export const CardsData = (summaryData) => {
  return [
    {
      label: "Mulheres",
      icon: "women",
      data: summaryData.totalWomenPercentile,
    },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: summaryData.totalChildrenPercentile,
    },
    {
      label: "Capacete",
      icon: "helmet",
      data: summaryData.totalHelmetPercentile,
    },
    {
      label: "Serviço",
      icon: "service",
      data: summaryData.totalServicePercentile,
    },
    {
      label: "Cargueira",
      icon: "cargo",
      data: summaryData.totalCargoPercentile,
    },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: summaryData.totalWrongWayPercentile,
    },
  ];
};
