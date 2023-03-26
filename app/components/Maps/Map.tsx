"use client";
import React, { useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  Popup,
  Marker,
} from "react-map-gl";
import { layersData, LayerType, pointData } from "../../../typings";

import {
  MAPBOXTOKEN,
  MAPBOXSTYLE,
  mapInicialState,
  inicialViewPort,
  dropIcon,
  standartDropIconSize,
} from "./MapConf";

export const Map = ({
  layerData,
  layersConf,
  pointsData,
}: {
  layerData?: layersData;
  layersConf?: LayerType[];
  pointsData?: pointData[];
}) => {
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
    <section className="container mx-auto my-10">
      <div className="bg-green-200 rounded shadow-2xl">
        <ReactMapGL
          {...viewport}
          {...settings}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          width="100%"
          height="500px"
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
              <MapMarker
                icon={dropIcon}
              />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </section>
  );
};

const MapMarker = ({ size = 20, icon, color = "#008888" }) => {
  return (
    <>
      <svg
        height={size}
        viewBox="0 0 24 24"
        style={{
          cursor: "pointer",
          fill: color,
          stroke: "none",
          transform: `translate(${-size / 2}px,${-size}px)`,
        }}
      >
        <path d={icon} />
      </svg>
    </>
  );
};

const MapCaptions = ({ captions }) => {
  return (
    <>
      <Popup
        longitude={-34.80277}
        latitude={-8.058436}
        anchor={"bottom-left"}
        closeButton={false}
      >
        <h3 style={{ fontWeight: "bold" }}>Legenda</h3>
        {captions.map((layer: any) => (
          <p style={{ color: layer.paint["line-color"] }}>{layer.id}</p>
        ))}
      </Popup>
    </>
  );
};

const MapCommands = ({ handleClick }) => {
  const controlStyle = { right: 10, top: 10 };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "10px",
          zIndex: 500,
        }}
      >
        <button onClick={handleClick}>
          <FullscreenControl style={controlStyle} />
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: 40,
          right: 0,
          padding: "10px",
          zIndex: 500,
        }}
      >
        <NavigationControl style={controlStyle} />
      </div>
    </>
  );
};
