import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../utils";
import { COUNTINGS_DATA } from "../../../servers";
import { characteristicsMap } from "../configuration";
import { colors } from "../configuration";

export function getPointsData(d) {
  const { name, coordinates } = d;
  const [centralPoint] = coordinates;

  const points = [
    {
      key: name,
      latitude: centralPoint.point.x,
      longitude: centralPoint.point.y,
    },
    {
      key: `${name}_north`,
      latitude: centralPoint.point.x + 0.001,
      longitude: centralPoint.point.y,
      color: colors[0]
    },
    {
      key: `${name}_south`,
      latitude: centralPoint.point.x - 0.001,
      longitude: centralPoint.point.y,
      color: colors[1]
    },
    {
      key: `${name}_east`,
      latitude: centralPoint.point.x,
      longitude: centralPoint.point.y + 0.001,
      color: colors[2]
    },
    {
      key: `${name}_west`,
      latitude: centralPoint.point.x,
      longitude: centralPoint.point.y - 0.001,
      color: colors[3]
    },
  ];

  return points;
}

export const getPointsDataForSingleCounting = (d) => {
  return [
    {
      key: d.name,
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.summary.total,
    },
    {
      key: d.name + " north",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.north.name,
    },
    {
      key: d.name + " south",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.south.name,
    },
    {
      key: d.name + " east",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.east.name,
    },
    {
      key: d.name + " west",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.west.name,
    },
  ];
};

export const CountingStatistic = (data) => {
  const { id, date, summary } = { ...data };
  const { total_cyclists, max_hour } = { ...summary };
  const JSON_URL = `${COUNTINGS_DATA}/${id}`;
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

export function getChartData(sessions) {
  const series = [];
  const hours = [];
  const totalCyclists = [];

  Object.values(sessions).forEach((session) => {
    const { start_time, total_cyclists, characteristics } = session;
    const hour = parseInt(start_time.split(":")[0]);
    hours.push(hour);
    totalCyclists.push(total_cyclists);

    Object.entries(characteristics).forEach(([key, value]) => {
      if (characteristicsMap.has(key)) {
        const characteristic = characteristicsMap.get(key);
        const seriesIndex = series.findIndex(
          (s) => s.name === characteristic?.name
        );
        if (seriesIndex !== -1) {
          series[seriesIndex].data.push(value);
        } else {
          series.push({
            name: characteristic?.name || "",
            data: [value],
            visible: false,
          });
        }
      }
    });
  });

  series.push({
    name: "Total de Ciclistas",
    data: totalCyclists,
    visible: true,
  });

  return { series, hours };
}
