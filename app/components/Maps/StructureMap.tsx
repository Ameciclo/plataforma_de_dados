"use client";
import React, { useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  Popup,
} from "react-map-gl";
import { LayerType } from "../../../typings";
import {
  MAPBOXTOKEN,
  MAPBOXSTYLE,
  MAPLEGEND,
  navControlStyle,
  inicialViewPort,
} from "./MapConf";

export const StructureMap = ({ props }) => {
  const { map, layers } = props;
  const [viewport, setViewport] = useState(inicialViewPort);
  const [settings, setsettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: false,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    boxZoom: true,
    doubleClickZoom: true,
  });
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

  const legenda = MAPLEGEND;
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
              <FullscreenControl style={navControlStyle} />
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
            <NavigationControl style={navControlStyle} />
          </div>

          <Source id="malha" type="geojson" data={map}>
            {layers.map((layer: any) => (
              <Layer {...layer} />
            ))}
          </Source>
          <Popup
            longitude={-34.80277}
            latitude={-8.058436}
            anchor={"bottom-left"}
            closeButton={false}
          >
            <h3 style={{ fontWeight: "bold" }}>Legenda</h3>
            {layers.map((layer: any) => (
              <p style={{ color: layer.paint["line-color"] }}>{layer.id}</p>
            ))}
          </Popup>
        </ReactMapGL>
      </div>
    </section>
  );
};
