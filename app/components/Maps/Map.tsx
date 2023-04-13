"use client";
import Link from "next/link";
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
  let inicialViewPort = getInicialViewPort(pointsData, layerData);
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
          {/* <MapCaptions captions={layers} /> */}
          {layerData && (
            <Source id="layersMap" type="geojson" data={layerData}>
              {layersConf?.map((layer: any) => (
                <Layer {...layer} />
              ))}
            </Source>
          )}
          {pointsData?.map((point) => (
            <Marker
              {...point}
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                //e.originalEvent.stopPropagation();
                setSelectedPoint(point);
              }}
            >
              <MapMarker icon={dropIcon} size={point.size ? point.size : 15} />
            </Marker>
          ))}
          {selectedPoint !== undefined && (
            <ControlPanel
              selectedPoint={selectedPoint}
              setSelectedPoint={setSelectedPoint}
            />
          )}
        </ReactMapGL>
      </div>
    </section>
  );
};

function PointPopup({ selectedPoint, setSelectedPoint }) {
  console.log(selectedPoint);
  return (
    <>
      <Popup
        onClose={() => setSelectedPoint(undefined)}
        longitude={Number(selectedPoint.longitude)}
        latitude={Number(selectedPoint.latitude)}
        anchor={"top"}
        altitude={1}
        offsetLeft={0}
        offsetTop={0}
        dynamicPosition={false}
        className={
          "flex flex-auto flex-row min-w-[200] justify-center p-10 tracking-widest aspect-video w-screen"
        }
      >
        <div className="text-center">
          <h2 className="font-bold">{selectedPoint.popup.name}</h2>
          <p>
            {selectedPoint.popup.total} ciclistas em {selectedPoint.popup.date}
          </p>
          <Link href={selectedPoint.popup.url}>
            <button className="bg-ameciclo text-white p-2">Ver mais</button>
          </Link>
        </div>
      </Popup>
    </>
  );
}

function ControlPanel({ selectedPoint, setSelectedPoint }) {
  return (
    <div className="absolute top-0 left-0 max-w-sm bg-white shadow-md p-6 m-10 text-sm text-gray-600 uppercase">
      <button className="absolute top-0 right-0 hover:text-red-500" onClick={(e) => setSelectedPoint(undefined)}>X</button>
      <div className="text-center">
        <h2 className="font-bold">{selectedPoint.popup.name}</h2>
        <p className="py-2">
          {selectedPoint.popup.total} ciclistas em {selectedPoint.popup.date}
        </p>
        <Link href={selectedPoint.popup.url}>
          <button className="bg-ameciclo text-white p-2">Ver mais</button>
        </Link>
      </div>
    </div>
  );
}
