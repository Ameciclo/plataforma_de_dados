// app/vias-inseguras/configuration.js
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
 * Configuração de camadas para o mapa de vias inseguras
 */
/** @type {import('react-map-gl').LayerProps[]} */
export const layersConf = [
  {
    id: "vias-inseguras",
    type: "line",
    paint: {
      "line-color": [
        "interpolate",
        ["linear"],
        ["get", "sinistros"],
        0, "#FFF176",
        10, "#FFA726",
        20, "#F57F17",
        50, "#E53935",
        100, "#B71C1C"
      ],
      "line-width": [
        "interpolate",
        ["linear"],
        ["get", "sinistros"],
        0, 2,
        100, 8
      ],
      "line-opacity": 0.8
    },
  },
];

/**
 * Gera cards com estatísticas de vias inseguras
 */
export const getViasInsegurasStats = (streetsData) => {
  if (!streetsData || streetsData.length === 0) return [];
  
  // Ordenar vias pelo número de sinistros (decrescente)
  const sortedStreets = [...streetsData].sort((a, b) => 
    b.totalSinistros - a.totalSinistros
  );
  
  // Pegar as 5 vias mais perigosas
  const topStreets = sortedStreets.slice(0, 5);
  
  // Total de sinistros em todas as vias
  const totalSinistros = streetsData.reduce((sum, street) => 
    sum + (street.totalSinistros || 0), 0
  );
  
  // Total de sinistros fatais
  const totalFatais = streetsData.reduce((sum, street) => 
    sum + (street.totalFatais || 0), 0
  );
  
  return [
    {
      id: "total-sinistros",
      title: "Total de Sinistros",
      value: totalSinistros,
      unit: "",
    },
    {
      id: "total-fatais",
      title: "Sinistros Fatais",
      value: totalFatais,
      unit: "",
    },
    {
      id: "via-mais-perigosa",
      title: "Via Mais Perigosa",
      value: topStreets[0]?.name || "N/A",
      unit: `(${topStreets[0]?.totalSinistros || 0} sinistros)`,
    },
    {
      id: "percentual-fatais",
      title: "% Sinistros Fatais",
      value: totalSinistros > 0 ? (totalFatais / totalSinistros * 100).toFixed(1) : "0",
      unit: "%",
    },
  ];
};

/**
 * Gera cards com dados de tipos de veículos
 */
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
