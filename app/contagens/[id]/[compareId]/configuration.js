import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../../utils";
const colors = ["#24CBE5", "#E02F31", "#DDDF00", "#6AF9C4"];

export const getPointsDataForSingleCounting = (d, color) => {
  return [
    {
      key: d.name,
      latitude: d.location.coordinates[0],
      longitude: d.location.coordinates[1],
      name: d.summary.total,
      color: color,
    },
    {
      key: d.name + " north",
      latitude: d.north.location.coordinates[1],
      longitude: d.north.location.coordinates[0],
      name: d.north.name,
      color: color,
    },
    {
      key: d.name + " south",
      latitude: d.south.location.coordinates[1],
      longitude: d.south.location.coordinates[0],
      name: d.south.name,
      color: color,
    },
    {
      key: d.name + " east",
      latitude: d.east.location.coordinates[1],
      longitude: d.east.location.coordinates[0],
      name: d.east.name,
      color: color,
    },
    {
      key: d.name + " west",
      latitude: d.west.location.coordinates[1],
      longitude: d.west.location.coordinates[0],
      name: d.west.name,
      color: color,
    },
  ];
};

export function getPointsDataForComparingCounting(data) {
  return data.map((d, index) => {
    const points = getPointsDataForSingleCounting(d, colors[index]);
    return points[0];
  });
}

export function getBoxesForCountingComparision(data) {
  return data.map((d, index) => {
    return {
      titulo: d.name,
      media: IntlDateStr(d.date),
      color: colors[index],
      parametros: [
        {
          titulo: "Total",
          media: IntlNumber(d.summary.total),
        },
        {
          titulo: "Pico",
          media: IntlNumber(d.summary.hour_max),
        },
        {
          titulo: "Mulheres",
          media: IntlPercentil(d.summary.women_percent),
        },
        {
          titulo: "Crianças e Adolescentes",
          media: IntlPercentil(d.summary.children_percent),
        },
        {
          titulo: "Capacete",
          media: IntlPercentil(d.summary.helmet_percent),
        },
        {
          titulo: "Serviço",
          media: IntlPercentil(d.summary.service_percent),
        },
        {
          titulo: "Cargueira",
          media: IntlPercentil(d.summary.cargo_percent),
        },
        {
          titulo: "Contramão",
          media: IntlPercentil(d.summary.wrong_way_percent),
        },
        {
          titulo: "Calçada",
          media: IntlPercentil(d.summary.sidewalk_percent),
        },
      ],
    };
  });
}
