import Link from "next/link";
import React from "react";
import { FullscreenControl, NavigationControl, Popup } from "react-map-gl";

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


function PointPopup({ selectedPoint, setSelectedPoint }) {
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
 
export function CountingPopUp({ selectedPoint, setSelectedPoint }) {
  return (
    <div className="absolute top-0 left-0 max-w-sm bg-white shadow-md p-6 m-10 text-sm text-gray-600 uppercase">
      <button
        className="absolute top-0 right-0 hover:text-red-500"
        onClick={(e) => setSelectedPoint(undefined)}
      >
        X
      </button>
      <div className="text-center">
        <h2 className="font-bold">{selectedPoint.popup.name}</h2>
        <p className="py-2">
          {selectedPoint.popup.total} ciclistas em {selectedPoint.popup.date}
        </p>
        {selectedPoint.popup.obs != "" && (
          <p className="py-2 text-sm text-gray-700">
            {selectedPoint.popup.obs}
          </p>
        )}
        {selectedPoint.popup.url != "" && (
          <Link href={selectedPoint.popup.url}>
            <button className="bg-ameciclo text-white p-2">Ver mais</button>
          </Link>
        )}
      </div>
    </div>
  );
}
