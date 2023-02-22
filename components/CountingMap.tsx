import React, { useState } from "react";
import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from "react-map-gl";

const CountingMap = ({cyclistCounts}) => {

    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
    c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
    C20.1,15.8,20.2,15.8,20.2,15.7z`;
    
    const SIZE = 20;

    const navControlStyle= {
        right: 10,
        top: 10
    };

    const [viewport, setViewport] = useState({
        latitude: -8.0584364,
        longitude: -34.945277,
        zoom: 10,
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
  
    return (          
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
                <FullscreenControl style={navControlStyle}/>
            </div>

            <div style={{
                position: 'absolute',
                top: 40,
                right: 0,
                padding: '10px',
                zIndex: 500
            }}>
                <NavigationControl style={navControlStyle}/>
            </div>

            {cyclistCounts.map((c) => (
                <Marker
                key={c._id}
                longitude={c.location.coordinates[1]}
                latitude={c.location.coordinates[0]}
                >
                <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                    cursor: "pointer",
                    fill: "#028083",
                    stroke: "none",
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                    }}
                >
                    <path d={ICON} />
                </svg>
                </Marker>
            ))}
            </ReactMapGL>
        </div>
        </section>
    )
}

export default CountingMap