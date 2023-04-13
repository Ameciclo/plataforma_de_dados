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
  let result = data.map((d, index) => {
    return {
      titulo: d.name,
      media: IntlDateStr(d.date),
      color: colors[index],
      parametros: [
        {
          titulo: "Total",
          label: "total",
          media: IntlNumber(d.summary.total),
          maior: false,
          menor: false,
        },
        {
          titulo: "Pico",
          label: "hour_max",
          media: IntlNumber(d.summary.hour_max),
          maior: false,
          menor: false,
        },
        {
          titulo: "Mulheres",
          label: "women_percent",
          media: IntlPercentil(d.summary.women_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Crianças e Adolescentes",
          label: "children_percent",
          media: IntlPercentil(d.summary.children_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Capacete",
          label: "helmet_percent",
          media: IntlPercentil(d.summary.helmet_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Serviço",
          label: "service_percent",
          media: IntlPercentil(d.summary.service_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Cargueira",
          label: "cargo_percent",
          media: IntlPercentil(d.summary.cargo_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Contramão",
          label: "wrong_way_percent",
          media: IntlPercentil(d.summary.wrong_way_percent),
          maior: false,
          menor: false,
        },
        {
          titulo: "Calçada",
          label: "sidewalk_percent",
          media: IntlPercentil(d.summary.sidewalk_percent),
          maior: false,
          menor: false,
        },
      ],
    };
  });
  result = getMaxValues(data,result);
  result = getMinValues(data,result);
  return result;
}

function getMaxValues(data,result) {
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
    if (d.summary.total > maxValues.total) {
      maxValues.total = d.summary.total;
      maxIndexes.total = i;
    }
    if (d.summary.hour_max > maxValues.hour_max) {
      maxValues.hour_max = d.summary.hour_max;
      maxIndexes.hour_max = i;
    }
    if (d.summary.women_percent > maxValues.women_percent) {
      maxValues.women_percent = d.summary.women_percent;
      maxIndexes.women_percent = i;
    }
    if (d.summary.children_percent > maxValues.children_percent) {
      maxValues.children_percent = d.summary.children_percent;
      maxIndexes.children_percent = i;
    }
    if (d.summary.helmet_percent > maxValues.helmet_percent) {
      maxValues.helmet_percent = d.summary.helmet_percent;
      maxIndexes.helmet_percent = i;
    }
    if (d.summary.service_percent > maxValues.service_percent) {
      maxValues.service_percent = d.summary.service_percent;
      maxIndexes.service_percent = i;
    }
    if (d.summary.cargo_percent > maxValues.cargo_percent) {
      maxValues.cargo_percent = d.summary.cargo_percent;
      maxIndexes.cargo_percent = i;
    }
    if (d.summary.wrong_way_percent > maxValues.wrong_way_percent) {
      maxValues.wrong_way_percent = d.summary.wrong_way_percent;
      maxIndexes.wrong_way_percent = i;
    }
    if (d.summary.sidewalk_percent > maxValues.sidewalk_percent) {
      maxValues.sidewalk_percent = d.summary.sidewalk_percent;
      maxIndexes.sidewalk_percent = i;
    }
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
    if (d.summary.total < minValues.total) {
      minValues.total = d.summary.total;
      minIndexes.total = i;
    }
    if (d.summary.hour_max < minValues.hour_max) {
      minValues.hour_max = d.summary.hour_max;
      minIndexes.hour_max = i;
    }
    if (d.summary.women_percent < minValues.women_percent) {
      minValues.women_percent = d.summary.women_percent;
      minIndexes.women_percent = i;
    }
    if (d.summary.children_percent < minValues.children_percent) {
      minValues.children_percent = d.summary.children_percent;
      minIndexes.children_percent = i;
    }
    if (d.summary.helmet_percent < minValues.helmet_percent) {
      minValues.helmet_percent = d.summary.helmet_percent;
      minIndexes.helmet_percent = i;
    }
    if (d.summary.service_percent < minValues.service_percent) {
      minValues.service_percent = d.summary.service_percent;
      minIndexes.service_percent = i;
    }
    if (d.summary.cargo_percent < minValues.cargo_percent) {
      minValues.cargo_percent = d.summary.cargo_percent;
      minIndexes.cargo_percent = i;
    }
    if (d.summary.wrong_way_percent < minValues.wrong_way_percent) {
      minValues.wrong_way_percent = d.summary.wrong_way_percent;
      minIndexes.wrong_way_percent = i;
    }
    if (d.summary.sidewalk_percent < minValues.sidewalk_percent) {
      minValues.sidewalk_percent = d.summary.sidewalk_percent;
      minIndexes.sidewalk_percent = i;
    }
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
