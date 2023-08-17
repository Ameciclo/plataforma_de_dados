import { IntlNumberMax1Digit, IntlPercentil } from "../../utils";

export function combineFeatures(dataArray) {
  const combinedFeatures = dataArray.map((item) => {
    let status = "NotPDC";
    if (item.relation_id !== 0)
      status = item.has_cycleway ? "Realizada" : "Projeto";
    const properties = {
      id: item.id,
      name: item.name,
      ...item.geojson.features[0].properties,
      STATUS: status,
    };
    return {
      type: "Feature",
      geometry: item.geojson.features[0].geometry,
      properties: properties,
    };
  });

  const combinedGeoJSON = {
    type: "FeatureCollection",
    features: combinedFeatures,
  };
  return combinedGeoJSON;
}

export function sumKilometersByRelationId(data) {
  const result = {};

  // Inicializa o objeto com todos os relation_ids de 1 a 257
  for (let i = 0; i <= 238; i++) {
    result[i] = 0;
  }

  // Percorre os dados e soma os quilômetros para cada relation_id
  for (const d of data) {
    const { relation_id, length } = d;
    result[relation_id] += length;
  }

  return result;
}

export function cityCycleStructureExecutionStatisticsByCity(
  citiesSummary,
  citiesData
) {
  const cityStats = {}; // Usar um objeto em vez de um array

  citiesData.forEach((city) => {
    if (citiesSummary[city.id]) {
      cityStats[city.id] = {
        name: city.name,
        id: city.id,
        total:citiesSummary[city.id].pdc_feito + citiesSummary[city.id].out_pdc,
        ...citiesSummary[city.id],
      };
    }
  });

  return cityStats;
}

export const cycleStructureExecutionStatistics = (data) => {
  const { pdc_feito, out_pdc, pdc_total, percent } = { ...data };

  return [
    {
      title: "estrutura cicloviárias",
      unit: "km",
      value: IntlNumberMax1Digit(pdc_feito + out_pdc),
    },
    {
      title: "projetada no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(pdc_total),
    },
    {
      title: "implantados no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(pdc_feito),
    },
    {
      title: "cobertos do plano cicloviário",
      unit: "%",
      value: IntlPercentil(percent),
    },
  ];
};

export function cityCycleStructureExecutionStatistics(selectedCity) {
  const { pdc_feito, pdc_total, percent, total } = {
    ...selectedCity,
  };
  return [
    {
      title: "estruturas cicloviárias",
      unit: "km",
      value: IntlNumberMax1Digit(total),
    },
    {
      title: "projetadas no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(pdc_total),
    },
    {
      title: "implantados no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(pdc_feito),
    },
    {
      title: "cobertos do plano cicloviário",
      value: IntlPercentil(percent),
      unit: "%",
    },
  ].filter((e) => e);
}

export function sortCards(data, order) {
  const units = {
    percentil: "%",
    pdc_feito: "km",
    pdc_total: "km",
    total: "km",
  };
  return data
    .map((d) => ({
      id: d.id,
      label: d.name,
      unit: units[order],
      value: d[order],
    }))
    .sort((a, b) => (b.value >= a.value ? 1 : -1));
}

const PDCLayer = {
  id: "Não executado no PDC",
  type: "line",
  paint: {
    "line-color": "#000000",
    "line-opacity": 0.5,
    "line-width": 2,
  },
  filter: ["==", "STATUS", "Projeto"],
};

const PDCDoneLayer = {
  id: "Executados dentro do PDC",
  type: "line",
  paint: {
    "line-color": "#008080",
    "line-width": 3,
  },
  filter: ["==", "STATUS", "Realizada"],
};

const NotPDC = {
  id: "Executados fora do PDC",
  type: "line",
  paint: {
    "line-color": "#E02F31",
    "line-width": 1.5,
    "line-opacity": 0.8,
    //          'line-dasharray': [2,.5],
  },
  filter: ["==", "STATUS", "NotPDC"],
};

export const layersConf = [PDCLayer, PDCDoneLayer, NotPDC];
