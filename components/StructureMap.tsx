import React, { useState } from "react";
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";

const MAPBOXTOKEN = "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"

const StructureMap = ({ map, layers = [] }) => {
  
  const MAPBOXSTYLE = "mapbox://styles/mapbox/light-v10"

    const navControlStyle= {
      right: 10,
      top: 10,
    };

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

  const handleClick = () => {
    setsettings({
      dragPan: true,
      dragRotate: true,
      scrollZoom: settings.scrollZoom ? false : true,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      boxZoom: true,
      doubleClickZoom: true
    })
  } 
  
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

            <div style={{position: 'absolute', top: 0, right: 0, padding: '10px', zIndex: 500 }}>
              <button onClick={handleClick}>
              <FullscreenControl  style={navControlStyle}/>
              </button>
            </div>

            <div style={{position: 'absolute', top: 40, right: 0, padding: '10px', zIndex: 500 }}>
              <NavigationControl  style={navControlStyle}/>
            </div>

            <Source id="malha" type='geojson' data={map}>
              {layers.map(layer => <Layer {...layer} />)}
            </Source>
          </ReactMapGL>
        </div>
      </section>
    );
  };
  
  export default StructureMap;
     