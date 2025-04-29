// app/observatorio-sinistros/configuration.js
import { IntlNumber, IntlPercentil } from "../../utils";

/**
 * Labels para cada tipo de veículo
 */
export const typeLabels = {
  auto: "Automóvel",
  moto: "Moto",
  ciclom: "Ciclomotor",
  ciclista: "Ciclista",
  pedestre: "Pedestre",
  onibus: "Ônibus",
  caminhao: "Caminhão",
  viatura: "Viatura",
  outros: "Outros",
};

/**
 * Gera cards de sinistros por categoria de veículo
 */
export function vehicleCards(vehicles) {
  return Object.entries(vehicles).map(([key, value]) => ({
    id: key,
    title: typeLabels[key] || key,
    unit: "sinistros",
    value,
  }));
}

/**
 * Configuração de camadas para o mapa
 */
/** @type {import('react-map-gl').LayerProps[]} */
export const layersConf = [
  {
    id: "Sinistros",
    type: "circle", // literal string para LayerProps
    paint: {
      // raio baseado em número de vítimas
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "vitimas"],
        0,
        4,
        5,
        12,
      ],
      "circle-color": "#E02F31",
      "circle-opacity": 0.6,
    },
  },
];

export const CardsData = (summaryData, total) => {
  const {
    auto,
    moto,
    ciclom,
    ciclista,
    pedestre,
    onibus,
    caminhao,
    viatura,
    outros,
  } = { ...summaryData };

  return [
    {
      label: "Motoristas de carro",
      icon: "women",
      data: IntlPercentil(auto / total),
    },
    {
      label: "Motociclistas",
      icon: "children",
      data: IntlPercentil(moto / total),
    },
    {
      label: "Condutores de Ciclomotores",
      icon: "ride",
      data: IntlPercentil(ciclom / total),
    },
    {
      label: "Ciclistas",
      icon: "women",
      data: IntlPercentil(ciclista / total),
    },
    {
      label: "Pedestres",
      icon: "service",
      data: IntlPercentil(pedestre / total),
    },
    {
      label: "Motoristas de Ônibus",
      icon: "cargo",
      data: IntlPercentil(onibus / total),
    },
    {
      label: "Motoristas de Caminhão",
      icon: "shared_bike",
      data: IntlPercentil(caminhao / total),
    },
    {
      label: "Motoristas de Viaturas",
      icon: "sidewalk", //CRIAR!
      data: IntlPercentil(viatura / total),
    },
    {
      label: "Outros",
      icon: "wrong_way",
      data: IntlPercentil(outros / total),
    },
  ];
};
