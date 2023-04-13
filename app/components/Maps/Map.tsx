"use client";
import React, { useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  Marker,
  LayerProps,
} from "react-map-gl";
import { layersData, pointData } from "../../../typings";
import {
  MAPBOXTOKEN,
  MAPBOXSTYLE,
  mapInicialState,
  getInicialViewPort,
  dropIcon,
  standartDropIconSize,
} from "./MapConf";
import { MapCommands, MapMarker } from "./MapsExtras";

export const Map = ({
  layerData,
  layersConf,
  pointsData,
  width = "100%",
  height = "500px",
}: {
  layerData?: layersData;
  layersConf?: LayerProps[];
  pointsData?: pointData[];
  width?: string;
  height?: string;
}) => {

  let inicialViewPort = getInicialViewPort(pointsData, layerData)

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

  return (
    <section className="container mx-auto">
      <div className="bg-green-200 rounded shadow-2xl">
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
          {/* <MapCaptions captions={layers} /> */}
          {layerData && (
            <Source id="layersMap" type="geojson" data={layerData}>
              {layersConf?.map((layer: any) => (
                <Layer {...layer} />
              ))}
            </Source>
          )}
          {pointsData?.map((p) => (
            <Marker {...p}>
              <MapMarker icon={dropIcon} color={p.color ? p.color : "#008888"}/>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </section>
  );
};