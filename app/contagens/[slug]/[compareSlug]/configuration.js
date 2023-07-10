import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../../utils";
export const colors = ["#24CBE5", "#E02F31", "#DDDF00", "#6AF9C4"];

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

export const getPointDataForSingleCounting = (d, color) => {
  return [
    {
      key: d.name,
      latitude: d.coordinates[0].point.x,
      longitude: d.coordinates[0].point.y,
      name: d.summary.total,
      color: color,
    },
  ];
};

export function getPointsDataForComparingCounting(data) {
  return data.map((d, index) => {
    const points = getPointDataForSingleCounting(d, colors[index]);
    return points[0];
  });
}

export function getChartData(data) {
  const countsByHour = {};

  data.forEach((countData, index) => {
    const countSessions = Object.values(countData.sessions);
    countSessions.forEach((session) => {
      const { quantitative } = session;
      Object.entries(quantitative).forEach(([hour, count]) => {
        countsByHour[index] = countsByHour[index] || {};
        countsByHour[index][hour] = (countsByHour[index][hour] || 0) + count;
      });
    });
  });

  const chartData = data.map((d, index) => ({
    name: d.name,
    data: Object.values(countsByHour[index]),
  }));
  return chartData;
}

const characteristicsMap = new Map([
  ["total", { name: "Total" }],
  ["hour_max", { name: "Pico" }],
  ["women_percent", { name: "Mulheres" }],
  ["children_percent", { name: "Crianças e Adolescentes" }],
  ["helmet_percent", { name: "Capacete" }],
  ["service_percent", { name: "Serviço" }],
  ["cargo_percent", { name: "Cargueira" }],
  ["wrong_way_percent", { name: "Contramão" }],
  ["sidewalk_percent", { name: "Calçada" }],
]);

export function getBoxesForCountingComparision(data) {
  let result = data.map((d, index) => {
    return {
      titulo: d.name,
      media: IntlDateStr(d.date),
      color: colors[index],
      parametros: Object.entries(d.summary)
        .map(([label, value]) => {
          if (characteristicsMap.has(label)) {
            const characteristic = characteristicsMap.get(label);
            return {
              titulo: characteristic.name,
              label,
              media: IntlPercentil(value),
              maior: false,
              menor: false,
            };
          }
          return null;
        })
        .filter((parametro) => parametro !== null),
    };
  });

  result = getMaxValues(data, result);
  result = getMinValues(data, result);
  return result;
}

function getMaxValues(data, result) {
  const maxValues = {
    total: 0,
    hour_max: 0,
    women_percent: 0,
    children_percent: 0,
    helmet_percent: 0,
    service_percent: 0,
    cargo_percent: 0,
    wrong_way_percent: 0,
    sidewalk_percent: 0,
  };

  const maxIndexes = {
    total: 0,
    hour_max: 0,
    women_percent: 0,
    children_percent: 0,
    helmet_percent: 0,
    service_percent: 0,
    cargo_percent: 0,
    wrong_way_percent: 0,
    sidewalk_percent: 0,
  };

  data.forEach((d, i) => {
    Object.entries(d.summary).forEach(([label, value]) => {
      if (characteristicsMap.has(label) && value > maxValues[label]) {
        maxValues[label] = value;
        maxIndexes[label] = i;
      }
    });
  });

  return result.map((d, i) => {
    return {
      titulo: d.titulo,
      media: d.media,
      color: d.color,
      parametros: d.parametros.map((p, j) => {
        const maior = maxIndexes[p.label] === i;
        return {
          ...p,
          maior,
        };
      }),
    };
  });
}

function getMinValues(data, result) {
  const minValues = {
    total: Infinity,
    hour_max: Infinity,
    women_percent: Infinity,
    children_percent: Infinity,
    helmet_percent: Infinity,
    service_percent: Infinity,
    cargo_percent: Infinity,
    wrong_way_percent: Infinity,
    sidewalk_percent: Infinity,
  };

  const minIndexes = {
    total: 0,
    hour_max: 0,
    women_percent: 0,
    children_percent: 0,
    helmet_percent: 0,
    service_percent: 0,
    cargo_percent: 0,
    wrong_way_percent: 0,
    sidewalk_percent: 0,
  };

  data.forEach((d, i) => {
    Object.entries(d.summary).forEach(([label, value]) => {
      if (characteristicsMap.has(label) && value < minValues[label]) {
        minValues[label] = value;
        minIndexes[label] = i;
      }
    });
  });

  return result.map((d, i) => {
    return {
      titulo: d.titulo,
      media: d.media,
      color: d.color,
      parametros: d.parametros.map((p, j) => {
        const menor = minIndexes[p.label] === i;
        return {
          ...p,
          menor,
        };
      }),
    };
  });
}
