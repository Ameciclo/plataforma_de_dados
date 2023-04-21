"use client";
import React, { useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  Marker,
  LayerProps,
  Popup,
} from "react-map-gl";
import { layersData, pointData } from "../../../typings";
import {
  MAPBOXTOKEN,
  MAPBOXSTYLE,
  mapInicialState,
  getInicialViewPort,
  dropIcon,
} from "./MapConf";
import { MapControlPanel } from "./MapControlPanel";
import { CountingPopUp, MapCommands, MapMarker } from "./MapsExtras";

export const Map = ({
  layerData,
  layersConf,
  pointsData,
  width = "100%",
  height = "500px",
  controlPanel = [],
}: {
  layerData?: layersData;
  layersConf?: LayerProps[];
  pointsData?: pointData[];
  width?: string;
  height?: string;
  controlPanel?: any[];
}) => {
  const inicialViewPort = getInicialViewPort(pointsData, layerData);

  const [selectedPoint, setSelectedPoint] = useState<pointData | undefined>(
    undefined
  );

  const [viewport, setViewport] = useState(inicialViewPort);
  const [settings, setsettings] = useState({ ...mapInicialState });

  const handleClick = () => {
    setsettings({
      dragPan: true,
      dragRotate: true,
      scrollZoom: settings.scrollZoom ? false : true,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      boxZoom: true,
      doubleClickZoom: true,
    });
  };

  const [markerVisibility, setMarkerVisibility] = useState(
    pointsData?.reduce((obj, marker) => ({ ...obj, [marker.key]: true }), {})
  );

  const handleMarkerToggle = (key: string) => {
    setMarkerVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="container mx-auto">
      <div className="relative bg-green-200 rounded shadow-2xl">
        <ReactMapGL
          {...viewport}
          {...settings}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          width={width}
          height={height}
          mapStyle={MAPBOXSTYLE}
          mapboxApiAccessToken={MAPBOXTOKEN}
        >
          <MapCommands handleClick={handleClick} />
          {layerData && (
            <Source id="layersMap" type="geojson" data={layerData}>
              {layersConf?.map((layer: any) => (
                <Layer {...layer} />
              ))}
            </Source>
          )}
          {pointsData?.map(
            (point) =>
              markerVisibility[point.key] == true && (
                <Marker {...point} onClick={() => setSelectedPoint(point)}>
                  <MapMarker
                    icon={dropIcon}
                    size={point.size ? point.size : 15}
                    color={point.color ? point.color : "#008080"}
                  />
                </Marker>
              )
          )}
          {selectedPoint !== undefined && (
            <CountingPopUp
              selectedPoint={selectedPoint}
              setSelectedPoint={setSelectedPoint}
            />
          )}
          {controlPanel.length > 0 && (
            <MapControlPanel
              controlPanel={controlPanel}
              markerVisibility={markerVisibility}
              pointsData={pointsData}
              handleMarkerToggle={handleMarkerToggle}
            />
          )}
        </ReactMapGL>
      </div>
    </section>
  );
};
``;
