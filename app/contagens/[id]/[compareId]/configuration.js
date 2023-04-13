import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../../utils";

export const getPointsDataForSingleCounting = (d, color) => {
  return [
    {
      key: d.name,
      latitude: d.location.coordinates[0],
      longitude: d.location.coordinates[1],
      name: d.summary.total,
      color: color
    },
    {
      key: d.name + " north",
      latitude: d.north.location.coordinates[1],
      longitude: d.north.location.coordinates[0],
      name: d.north.name,
      color: color
    },
    {
      key: d.name + " south",
      latitude: d.south.location.coordinates[1],
      longitude: d.south.location.coordinates[0],
      name: d.south.name,
      color: color
    },
    {
      key: d.name + " east",
      latitude: d.east.location.coordinates[1],
      longitude: d.east.location.coordinates[0],
      name: d.east.name,
      color: color
    },
    {
      key: d.name + " west",
      latitude: d.west.location.coordinates[1],
      longitude: d.west.location.coordinates[0],
      name: d.west.name,
      color: color
    },
  ];
};

export const CountingStatistic = (data) => {
  const {date, id, summary} = {...data}
  const {total, hour_max, download_xlsx_url} = {...summary}
  const JSON_URL = `https://api.contagem.ameciclo.org/v1/cyclist-count/${id}`
  return [
    { title: "Total de ciclistas", value: IntlNumber(total) },
    { title: "Pico em 1h", value: IntlNumber(hour_max) },
    { title: "Data da Contagem", value: IntlDateStr(date) },
    {
      type: "LinksBox",
      title: "Dados",
      value: [
        { label: "XLSX", url: download_xlsx_url },
        {
          label: "JSON",
          url: JSON_URL,
        },
      ],
    },
  ];
};

export function getCountingCards(data) {
  const summary = data.summary
  return [
    { label: "Mulheres", icon: "women", data: IntlPercentil(summary.women_percent) },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: IntlPercentil(summary.children_percent),
    },
    { label: "Capacete", icon: "helmet", data: IntlPercentil(summary.helmet_percent) },
    { label: "Serviço", icon: "service", data: IntlPercentil(summary.service_percent) },
    { label: "Cargueira", icon: "cargo", data: IntlPercentil(summary.cargo_percent) },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: IntlPercentil(summary.wrong_way_percent),
    },
    { label: "Calçada", icon: "sidewalk", data: IntlPercentil(summary.sidewalk_percent) },
  ];
}
