export const MAPBOXTOKEN =
  "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A";
export const MAPBOXSTYLE = "mapbox://styles/mapbox/light-v10";

import bbox from "@turf/bbox";
import * as turf from "@turf/helpers";
import { WebMercatorViewport } from "react-map-gl";

export const getInicialViewPort = (pointsData, layerData) => {
  let standardViewPort = {
    latitude: -8.0584364,
    longitude: -34.945277,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  };

  let points = [
    [-8.05843, -34.9452],
    [-8.0584364, -34.945277],
  ];

  if (pointsData)
    points = pointsData.map((point) => [point.latitude, point.longitude]);

  const lineStringFromPointData = turf.lineString(points);

  let lineStringFromLayersData = lineStringFromPointData;
  if (layerData) lineStringFromLayersData = turf.lineString(layerData);

  const [PminX, PminY, PmaxX, PmaxY] = bbox(lineStringFromPointData);
  const [LminX, LminY, LmaxX, LmaxY] = bbox(lineStringFromLayersData);

  const minX = Math.min(PminX, LminX);
  const minY = Math.min(PminY, LminY);
  const maxX = Math.max(PmaxX, LmaxX);
  const maxY = Math.max(PmaxY, LmaxY);

  const vp = new WebMercatorViewport({
    width: 400,
    height: 600,
    ...standardViewPort,
  });

  const { longitude, latitude, zoom } = vp.fitBounds(
    [
      [minY, minX],
      [maxY, maxX],
    ],
    {
      padding: 40,
    }
  );

  if (latitude && longitude && zoom) {
    standardViewPort.longitude = longitude;
    standardViewPort.latitude = latitude;
    standardViewPort.zoom = zoom;
  }

  return standardViewPort;
};

export const mapInicialState = {
  dragPan: true,
  dragRotate: true,
  scrollZoom: false,
  touchZoom: true,
  touchRotate: true,
  keyboard: true,
  boxZoom: true,
  doubleClickZoom: true,
};

export const dropIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

export const standartDropIconSize = 20;
