import { characteristicsMap } from "../../configuration";
import { IntlNumber, IntlDateStr, IntlPercentil } from "../../../../utils";
import { colors } from "../../configuration"

export const getPointsDataForSingleCounting = (d, color) => {
  return [
    {
      key: d.name,
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.summary.total,
      color: color,
    },
    {
      key: d.name + " north",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.north.name,
      color: color,
    },
    {
      key: d.name + " south",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.south.name,
      color: color,
    },
    {
      key: d.name + " east",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.east.name,
      color: color,
    },
    {
      key: d.name + " west",
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
      name: d.west.name,
      color: color,
    },
  ];
};

export const getPointDataForSingleCounting = (d, color) => {
  return [
    {
      key: d.name,
      latitude: d.coordinates.point.x,
      longitude: d.coordinates.point.y,
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
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

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

  const series = data.map((d, index) => ({
    name: d.name,
    data: Object.values(countsByHour[index]),
  }));
  return {series, hours};
}

export function getBoxesForCountingComparision(data) {
  let result = data.map((d, index) => {
    let  total_cyclists = 0
    if (d.summary) total_cyclists = d.summary.total_cyclists
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
              media: IntlNumber(value) + " (" + IntlPercentil(value/total_cyclists) + ")",
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
