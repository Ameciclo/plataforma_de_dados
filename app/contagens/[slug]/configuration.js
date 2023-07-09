import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../utils";
import { COUNTINGS_DATA_NEW } from "../../../servers";

export function getPointsData(d) {
  const points = d.map((p) => ({
    key: p.name,
    latitude: p.point.x,
    longitude: p.point.y,
    name: p.name,
  }));
  return points;
}

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
    {
      key: d.name + " south",
      latitude: d.south.location.coordinates[1],
      longitude: d.south.location.coordinates[0],
      name: d.south.name,
    },
    {
      key: d.name + " east",
      latitude: d.east.location.coordinates[1],
      longitude: d.east.location.coordinates[0],
      name: d.east.name,
    },
    {
      key: d.name + " west",
      latitude: d.west.location.coordinates[1],
      longitude: d.west.location.coordinates[0],
      name: d.west.name,
    },
  ];
};

export const CountingStatistic = (data) => {
  const { id, date, max_hour, summary } = { ...data };
  const { total_cyclists } = { ...summary };
  const JSON_URL = `${COUNTINGS_DATA_NEW}?id=${id}`;
  return [
    { title: "Total de ciclistas", value: IntlNumber(total_cyclists) },
    {
      title: "Pico em 1h",
      value: IntlNumber(max_hour),
    },
    { title: "Data da Contagem", value: IntlDateStr(date) },
    {
      type: "LinksBox",
      title: "Dados",
      value: [
        {
          label: "JSON",
          url: JSON_URL,
        },
      ],
    },
  ];
};

export function getCountingCards(data) {
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
  } = { ...data };
  return [
    {
      label: "Mulheres",
      icon: "women",
      data: IntlPercentil(total_women / total_cyclists),
    },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: IntlPercentil(total_juveniles / total_cyclists),
    },
    {
      label: "Carona",
      icon: "ride",
      data: IntlPercentil(total_ride / total_cyclists),
    },
    {
      label: "Capacete",
      icon: "helmet",
      data: IntlPercentil(total_helmet / total_cyclists),
    },
    {
      label: "Serviço",
      icon: "service",
      data: IntlPercentil(total_service / total_cyclists),
    },
    {
      label: "Cargueira",
      icon: "cargo",
      data: IntlPercentil(total_cargo / total_cyclists),
    },
    {
      label: "Compartilhada",
      icon: "shared_bike",
      data: IntlPercentil(total_shared_bike / total_cyclists),
    },
    {
      label: "Calçada",
      icon: "sidewalk",
      data: IntlPercentil(total_sidewalk / total_cyclists),
    },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: IntlPercentil(total_wrong_way / total_cyclists),
    },
  ];
}
