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
  dataArray,
  citiesData
) {
  const cityStats = {}; // Usar um objeto em vez de um array
  const cities = {};

  citiesData.forEach((city) => {
    cities[city.id] = city.name;
  });

  dataArray.forEach((item) => {
    const { city_id, has_cycleway, relation_id, length } = item;
    const city_name = cities[city_id];
    const isOnPDC = relation_id !== 0;

    if (!cityStats[city_name]) {
      cityStats[city_name] = {
        id: city_id,
        name: city_name,
        pdc_feito: 0,
        out_pdc: 0,
        pdc_total: 0,
        percentil: 0,
        total: 0,
        ways: [],
      };
    }

    if (isOnPDC) {
      cityStats[city_name].pdc_total += length;
      if (has_cycleway) cityStats[city_name].pdc_feito += length;
    } else {
      cityStats[city_name].out_pdc += length;
    }
    cityStats[city_name].total =
      cityStats[city_name].pdc_feito + cityStats[city_name].out_pdc;
    cityStats[city_name].percentil =
      cityStats[city_name].pdc_feito / cityStats[city_name].pdc_total;
    cityStats[city_name].ways.push(item);
  });

  return cityStats;
}

export const cycleStructureExecutionStatistics = (data) => {
  const newData = data.map((d) => {
    const hasCycleway = d.has_cycleway === true;
    const isNotOutPDC = d.relation_id !== 0;

    const pdc_feito = hasCycleway && isNotOutPDC ? d.length : 0;
    const out_pdc = hasCycleway && !isNotOutPDC ? d.length : 0;
    const pdc_total = isNotOutPDC ? d.length : 0;

    return {
      ...d,
      pdc_feito,
      out_pdc,
      pdc_total,
    };
  });

  const kms = newData.reduce(
    (accumulator, currentData) => {
      accumulator.pdc_feito += currentData.pdc_feito;
      accumulator.out_pdc += currentData.out_pdc;
      accumulator.pdc_total += currentData.pdc_total;
      return accumulator;
    },
    { pdc_feito: 0, out_pdc: 0, pdc_total: 0 }
  );

  const percent = kms.pdc_feito / kms.pdc_total;

  return [
    {
      title: "estrutura cicloviárias",
      unit: "km",
      value: IntlNumberMax1Digit(kms.pdc_feito + kms.out_pdc),
    },
    {
      title: "projetada no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(kms.pdc_total),
    },
    {
      title: "implantados no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(kms.pdc_feito),
    },
    {
      title: "cobertos do plano cicloviário",
      unit: "%",
      value: IntlPercentil(percent),
    },
  ];
};

export function cityCycleStructureExecutionStatistics(selectedCity) {
  const { pdc_feito, pdc_total, percentil, total } = {
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
      value: IntlPercentil(percentil),
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
