import { IntlPercentil } from "../../utils";

export function getGeneralStatistics(statistics) {
  const {
    total_editions,
    total_forms,
    last_year,
    last_year_forms,
  } = statistics;
  return [
    {
      title: "Edições realizadas",
      value: total_editions,
    },
    {
      title: "Entrevistas realizadas",
      value: total_forms,
    },
    {
      title: "Ano da última edição",
      value: last_year,
    },
    {
      title: "Entrevistas na última edição",
      value: last_year_forms,
    },
  ];
}

export const CardsData = (GeneralStatistics) => {
  const {summary} = GeneralStatistics
  const summaryData = summary.main[0]
  const summaryExtra = summary.extra
  return [
    {
      label: `Raça ou cor ${summaryExtra.color_race.category}`,
      icon: "",
      data: IntlPercentil(summaryExtra.color_race.value/100),
    },
    {
      label: `Ganha ${summaryExtra.wage.category}`,
      icon: "",
      data: IntlPercentil(summaryExtra.wage.value/100),
    },
    {
      label: `Tem ${summaryExtra.age.category}`,
      icon: "",
      data: IntlPercentil(summaryExtra.age.value/100),
    },
    {
      label: `Cursou até o ${summaryExtra.schooling.category}`,
      icon: "",
      data: IntlPercentil(summaryExtra.schooling.value/100),
    },
    {
      label: "Pedala 5+ dias na semana",
      icon: "",
      data: IntlPercentil(summaryData.percent_week_at_least_5_days/100),
    },
    {
      label: "Sofreu colisão nos últimos anos",
      icon: "",
      data: IntlPercentil(summaryData.percent_collisions/100),
    },
    {
      label: `Pedala a ${summaryExtra.years_using.category}`,
      icon: "",
      data: IntlPercentil(summaryExtra.years_using.value/100),
    },
    {
      label: `Pedala ${summaryExtra.distance_time.category} até o destino`,
      icon: "",
      data: IntlPercentil(summaryExtra.distance_time.value/100),
    },
  ];
};
export function getInicialFilters() {
  return [
    { key: "gender", value: "Masculino", checked: true },
    { key: "gender", value: "Feminino", checked: true },
    { key: "gender", value: "Outro", checked: true },
    { key: "color_race", value: "Amarela", checked: false },
    { key: "color_race", value: "Branca", checked: false },
    { key: "color_race", value: "Indígena", checked: false },
    { key: "color_race", value: "Parda", checked: false },
    { key: "color_race", value: "Preta", checked: false },
    { key: "year", value: "2015", checked: false },
    { key: "year", value: "2018", checked: false },
    { key: "year", value: "2021", checked: true },
    { key: "wage", value: "até 1 SM", checked: false },
    { key: "wage", value: "de 1 a 2 SM", checked: false },
    { key: "wage", value: "de 2 a 5 SM", checked: false },
    { key: "wage", value: "acima de 5 SM", checked: false },
    { key: "schooling", value: "Sem instrução", checked: false },
    { key: "schooling", value: "Fundamental", checked: false },
    { key: "schooling", value: "Médio", checked: false },
    { key: "schooling", value: "Superior e Pós", checked: false },
    { key: "age", value: "15-24", checked: false },
    { key: "age", value: "25-34", checked: false },
    { key: "age", value: "35-44", checked: false },
    { key: "age", value: "45-55", checked: false },
    { key: "age", value: "56 ou mais", checked: false },
  ];
}

export function getFiltersKeys() {
  return [
    { key: "year", title: "Ano da Pesquisa" },
    { key: "gender", title: "Gênero" },
    { key: "color_race", title: "Cor/Raça" },
    { key: "salary", title: "Salário" },
    { key: "schooling", title: "Escolaridade" },
    { key: "age", title: "Faixa Etária" },
  ];
}


export function getHistogramData(data) {
  return {
    title: {
      text: "Quanto tempo você leva?",
    },

    subtitle: {
      text: "Histograma de agrupamento de distâncias em minutos",
    },

    xAxis: [
      {
        title: { text: "" },
        alignTicks: false,
      },
      {
        title: { text: "Distância em minutos" },
        alignTicks: false,
        opposite: false,
      },
    ],

    yAxis: [
      {
        title: { text: "" },
      },
      {
        title: { text: "Quantidade" },
        opposite: false,
      },
    ],

    series: [
      {
        name: "Total",
        type: "histogram",
        xAxis: 1,
        yAxis: 1,
        baseSeries: "s1",
        zIndex: 2,
      },
      {
        name: "",
        type: "scatter",
        data: data,
        visible: false,
        id: "s1",
        marker: {
          radius: 1.5,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };
}
