import { LayerProps } from "react-map-gl";

const ciclovia: LayerProps = {
  id: "ciclovias",
  type: "line",
  paint: {
    "line-color": "#E02F31",
    "line-width": 1.5,
  },
  filter: ["==", "Tipo", "Ciclovia"],
};

const ciclofaixa: LayerProps = {
  id: "ciclofaixas",
  type: "line",
  paint: {
    "line-color": "#E02F31",
    "line-width": 1.5,
    "line-dasharray": [2, 0.5],
  },
  filter: ["==", "Tipo", "Ciclofaixa"],
};

const ciclorrota: LayerProps = {
  id: "ciclorrota",
  type: "line",
  paint: {
    "line-color": "#E02F31",
    "line-width": 2,
    "line-dasharray": [1, 2.5],
  },
  filter: ["==", "Tipo", "Ciclorrota"],
};

export const idecicloLayers = [ciclovia, ciclofaixa, ciclorrota]

const layers = {
  ciclovia,
  ciclofaixa,
  ciclorrota,
};

const navControlStyle = {
  right: 10,
  top: 10,
};

const mapStyle = {
  navControlStyle: navControlStyle,
  layers: layers,
};

export default mapStyle;
