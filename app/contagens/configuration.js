import { IntlNumber, IntlPercentil } from "../../utils";

export const allCountsStatistics = (summaryData, counts) => {
  const {totalAmount, numberOfCounts, MaximumValue} = {...summaryData}
  return [
    {
      title: "Total de ciclistas",
      value: IntlNumber(totalAmount),
    },
    {
      title: "Contagens Realizadas",
      value: IntlNumber(numberOfCounts),
    },
    { title: "Pontos Monitorados", value: IntlNumber(counts) },
    {
      title: "Máximo em um ponto",
      value: IntlNumber(MaximumValue),
    },
  ];
};

export const CardsData = (summaryData) => {
  return [
    {
      label: "Mulheres",
      icon: "women",
      data: IntlPercentil(summaryData.totalWomenPercentile),
    },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: IntlPercentil(summaryData.totalChildrenPercentile),
    },
    {
      label: "Capacete",
      icon: "helmet",
      data: IntlPercentil(summaryData.totalHelmetPercentile),
    },
    {
      label: "Serviço",
      icon: "service",
      data: IntlPercentil(summaryData.totalServicePercentile),
    },
    {
      label: "Cargueira",
      icon: "cargo",
      data: IntlPercentil(summaryData.totalCargoPercentile),
    },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: IntlPercentil(summaryData.totalWrongWayPercentile),
    },
  ];
};
