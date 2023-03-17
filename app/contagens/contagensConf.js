export const GeneralStatistics = (summaryData, counts) => {
  return {
    title: "Estatísticas Gerais",
    subtitle: "",
    boxes: [
      { title: "Total de ciclistas", value: summaryData.totalAmount },
      { title: "Contagens Realizadas", value: summaryData.numberOfCounts },
      { title: "Pontos Monitorados", value: counts },
      { title: "Máximo em um ponto", value: summaryData.MaximumValue },
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
