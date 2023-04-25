import { IntlNumberMax1Digit, IntlPercentil } from "../../utils";

export const cycleStructureExecutionStatistics = (data) => {
  const kms = data.kms;
  const { pdc_feito, out_pdc, pdc_total } = { ...kms };
  const percent = 0.0 + pdc_feito / pdc_total;
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
  const { km_ciclos, km_completed, km_projected, percentil } = {
    ...selectedCity,
  };
  return [
    {
      title: "estrutura cicloviárias",
      unit: "km",
      value: IntlNumberMax1Digit(km_ciclos),
    },
    {
      title: "projetada no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(km_projected),
    },
    {
      title: "implantados no plano cicloviário",
      unit: "km",
      value: IntlNumberMax1Digit(km_completed),
    },
    {
      title: "cobertos do plano cicloviário",
      value: IntlPercentil(percentil / 100),
      unit: "%",
    },
  ].filter((e) => e);
}

export function sortCards(data, order) {
  const units = {
    percentil: "%",
    km_completed: "km",
    km_projected: "km",
    km_ciclos: "km",
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
