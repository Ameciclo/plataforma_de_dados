import React from "react";
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";
import ideciclo_malha from "../public/malhacicloviariapermanente_mar2021.json"

/**
 * 
 * 
///////////////////////////
// CONFIGURAÇÕES DO MAPA //
///////////////////////////

const malha = {
  'type': 'geojson',
  'data': ideciclo_malha
}

const layers = {
  ciclovia: {
    id: 'ciclovias',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
    },
    filter: ['==', 'Tipo', 'Ciclovia']
  },
  ciclofaixa: {
    id: 'ciclofaixas',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
      'line-dasharray': [2,.5],
    },
    filter: ['==', 'Tipo', 'Ciclofaixa']
  },
  ciclorrota: {
    id: 'ciclorrota',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 2,
      'line-dasharray': [1,2.5],
    },
    filter: ['==', 'Tipo', 'Ciclorrota']
  },
};
  const navControlStyle= {
    right: 10,
    top: 10
  };
////////////////////////////////
// MAIS CONFIGURAÇÕES DO MAPA //
////////////////////////////////

    const [viewport, setViewport] = useState({
      latitude: -8.0584364,
      longitude: -34.945277,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });
  
    const [settings, setsettings] = useState({
      dragPan: true,
      dragRotate: true,
      scrollZoom: false,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      boxZoom: true,
      doubleClickZoom: true
    });
 */


const StructureMap = ({ title, data }) => {
  return ( 
    <></>
    );
  };
  
  export default StructureMap;
/*(selectedCity.name === "Recife" ) && (
      <section className="container mx-auto my-10">
        <div className="bg-green-200 rounded shadow-2xl">
          <ReactMapGL
            {...viewport}
            {...settings}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            width="100%"
            height="500px"
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxApiAccessToken={
              "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"
            }
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <FullscreenControl  style={navControlStyle}/>
            </div>

            <div style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <NavigationControl  style={navControlStyle}/>
            </div>
            <Source id="malha" type={malha.type} data={malha.data}>
                <Layer {...layers.ciclovia} />
                <Layer {...layers.ciclofaixa} />
                <Layer {...layers.ciclorrota} />
            </Source>
          </ReactMapGL>
        </div>
          </section>)*/