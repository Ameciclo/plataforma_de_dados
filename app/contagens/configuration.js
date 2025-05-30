import { IntlNumber, IntlPercentil } from "../../utils";

export const colors = ["#24CBE5", "#E02F31", "#DDDF00", "#6AF9C4"];


export const allCountsStatistics = (summaryData) => {
  const { total_cyclists  , number_counts, where_max_count, different_counts_points } = {
    ...summaryData,
  };
  return [
    {
      title: "Total de ciclistas",
      value: IntlNumber(total_cyclists),
    },
    {
      title: "Contagens Realizadas",
      value: IntlNumber(number_counts),
    },
    { title: "Pontos Monitorados", value: IntlNumber(different_counts_points) },
    {
      title: "Máximo em um ponto",
      value: IntlNumber(where_max_count.total_cyclists),
    },
  ];
};

export const CardsData = (summaryData) => {
  const {
    total_cyclists,
    total_cargo,
    total_helmet,
    total_juveniles,
    total_motor,
    total_ride,
    total_service,
    total_shared_bike,
    total_sidewalk,
    total_women,
    total_wrong_way,
  } = { ...summaryData };

  return [
    {
      label: "Mulheres",
      icon: "/icons/contagens/women.svg",
      data: IntlPercentil(total_women / total_cyclists),
    },
    {
      label: "Crianças e Adolescentes",
      icon: "/icons/contagens/children.svg",
      data: IntlPercentil(total_juveniles / total_cyclists),
    },
    {
      label: "Carona",
      icon: "/icons/contagens/ride.svg",
      data: IntlPercentil(total_ride / total_cyclists),
    },
    {
      label: "Capacete",
      icon: "/icons/contagens/helmet.svg",
      data: IntlPercentil(total_helmet / total_cyclists),
    },
    {
      label: "Serviço",
      icon: "/icons/contagens/service.svg",
      data: IntlPercentil(total_service / total_cyclists),
    },
    {
      label: "Cargueira",
      icon: "/icons/contagens/cargo.svg",
      data: IntlPercentil(total_cargo / total_cyclists),
    },
    {
      label: "Compartilhada",
      icon: "/icons/contagens/shared_bike.svg",
      data: IntlPercentil(total_shared_bike / total_cyclists),
    },
    {
      label: "Calçada",
      icon: "/icons/contagens/sidewalk", //CRIAR!
      data: IntlPercentil(total_sidewalk / total_cyclists),
    },
    {
      label: "Contramão",
      icon: "/icons/contagens/wrong_way.svg",
      data: IntlPercentil(total_wrong_way / total_cyclists),
    },
  ];
};

export const characteristicsMap = new Map([
  ["total_cyclists", { name: "Total" }],
  ["total_women", { name: "Mulheres" }],
  ["total_child", { name: "Crianças e Adolescentes" }],
  ["total_ride", { name: "Carona" }],
  ["total_helmet", { name: "Capacete" }],
  ["total_service", { name: "Serviço" }],
  ["total_cargo", { name: "Cargueira" }],
  ["total_shared_bike", { name: "Compartilhada" }],
  ["total_sidewalk", { name: "Calçada" }],
  ["total_wrong_way", { name: "Contramão" }],
  ["women", { name: "Mulheres" }],
  ["child", { name: "Crianças e Adolescentes" }],
  ["ride", { name: "Carona" }],
  ["helmet", { name: "Capacete" }],
  ["service", { name: "Serviço" }],
  ["cargo", { name: "Cargueira" }],
  ["shared_bike", { name: "Compartilhada" }],
  ["sidewalk", { name: "Calçada" }],
  ["wrong_way", { name: "Contramão" }],
]);
