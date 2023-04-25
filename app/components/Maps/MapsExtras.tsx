import React from 'react'
import { FullscreenControl, NavigationControl, Popup } from 'react-map-gl';

export const MapMarker = ({ size = 20, icon, color = "#008888" }) => {
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
  
  export const MapCaptions = ({ captions }) => {
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
  
  export const MapCommands = ({ handleClick }) => {
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
  