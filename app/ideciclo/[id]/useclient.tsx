"use client";
import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  LinearInterpolator,
  WebMercatorViewport,
} from "react-map-gl";

import MAP_STYLE from "./ideciclo_mapstyle";
import RADAR_STYLE from "./ideciclo_radarstyle";
import map from "../../../public/dbs/malhacicloviariapermanente_mar2021.json";
import bbox from "@turf/bbox";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

type geoJsonMap = {
  type: string;
  name: any;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: any[];
};

export function StructureMap({data}) {

    const [minLng, minLat, maxLng, maxLat] = bbox(data);

    const vp = new WebMercatorViewport({
      width: 400,
      height: 600,
      longitude: -48,
      latitude: -10,
      zoom: 1,
      pitch: 30,
      bearing: 15,
    });
  
    const { longitude, latitude, zoom } = vp.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
      }
    );
  
    const [viewport, setViewport] = useState({
      latitude: latitude,
      longitude: longitude,
      zoom: zoom,
      bearing: 0,
      pitch: 0,
    });
    //  var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
    //  setViewport(getViewport(data, viewport))
  
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

    return (
    <>
      <ReactMapGL
        {...viewport}
        {...settings}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"
        }
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
          <FullscreenControl style={MAP_STYLE.navControlStyle} />
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
          <NavigationControl style={MAP_STYLE.navControlStyle} />
        </div>
        <Source id="malha" type="geojson" data={data}>
          <Layer {...MAP_STYLE.layers.ciclovia} />
          <Layer {...MAP_STYLE.layers.ciclofaixa} />
          <Layer {...MAP_STYLE.layers.ciclorrota} />
        </Source>
      </ReactMapGL>
    </>
  );
}

export function StructureRadar({series, categories}) {
  return (
    <div className="flex flex-col justify-center w-full p-6 pt-12 text-center tracking-widest">
      <HighchartsReact
        highcharts={Highcharts}
        options={RADAR_STYLE(series, categories)}
      />
    </div>
  );
}
