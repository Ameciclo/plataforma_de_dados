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

import MAP_STYLE from "../../public/temp_folder/ideciclo_mapstyle";
import RADAR_STYLE from "../../public/temp_folder/ideciclo_radarstyle";
import rates_organization from "../../public/temp_folder/ideciclo_rates";
import map from "../../public/malhacicloviariapermanente_mar2021.json";
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

function get_map_data(structure: any) {
  // TRABALHA O MAPA
  const geoJsonMap: geoJsonMap = {
    type: "FeatureCollection",
    name: structure.street,
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [],
  };

  structure.reviews[structure.reviews.length - 1].segments.forEach(
    (seg: any) => {
      geoJsonMap.features.push(
        map.features.filter((m: any) => m.properties.idunido == seg.geo_id)[0]
      );
    }
  );

  if (geoJsonMap.features[0] == undefined) {
    geoJsonMap.features = map.features;
  }

  return geoJsonMap;
}

export function StructureMap() {

    const [minLng, minLat, maxLng, maxLat] = bbox(info.map);

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
    //  setViewport(getViewport(info.map, viewport))
  
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
        <Source id="malha" type="geojson" data={info.map}>
          <Layer {...MAP_STYLE.layers.ciclovia} />
          <Layer {...MAP_STYLE.layers.ciclofaixa} />
          <Layer {...MAP_STYLE.layers.ciclorrota} />
        </Source>
      </ReactMapGL>
    </>
  );
}

export function StructureRadar() {
  return (
    <div className="flex flex-col justify-center w-full p-6 pt-12 text-center tracking-widest">
      <HighchartsReact
        highcharts={Highcharts}
        options={RADAR_STYLE(info.series, info.categories)}
      />
    </div>
  );
}
