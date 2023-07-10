// import { characteristicsMap } from "../../configuration";
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
              media: IntlNumber(value),
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
  const maxValues = {};
  const maxIndexes = {};

  // Inicialize os valores máximos com -Infinity
  Object.keys(data[0].summary).forEach((key) => {
    maxValues[key] = -Infinity;
    maxIndexes[key] = 0;
  });

  // Encontre os valores máximos e seus respectivos índices
  data.forEach((d, i) => {
    Object.entries(d.summary).forEach(([key, value]) => {
      if (value > maxValues[key]) {
        maxValues[key] = value;
        maxIndexes[key] = i;
      }
    });
  });

  // Atualize as propriedades "maior" em result
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
  const minValues = {};
  const minIndexes = {};

  // Inicialize os valores mínimos com Infinity
  Object.keys(data[0].summary).forEach((key) => {
    minValues[key] = Infinity;
    minIndexes[key] = 0;
  });

  // Encontre os valores mínimos e seus respectivos índices
  data.forEach((d, i) => {
    Object.entries(d.summary).forEach(([key, value]) => {
      if (value < minValues[key]) {
        minValues[key] = value;
        minIndexes[key] = i;
      }
    });
  });

  // Atualize as propriedades "menor" em result
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
