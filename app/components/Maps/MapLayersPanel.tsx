import React from "react";

export const MapLayersPanel = ({ layersConf }) => {
  return (
    <div className="absolute bottom-0 right-0 bg-white border rounded p-4 m-2 shadow-md">
      <h3 className="font-bold mb-2">Legenda</h3>
      {layersConf.map((control) => {
        const color = control.paint["line-color"];
        return (
          <div
            className="flex items-center mb-1 uppercase font-bold"
            key={control.id}
          >
            <span className="ml-2 text-sm font-bold" style={{ color: color }}>
              {control.id}
            </span>
          </div>
        );
      })}
    </div>
  );
};
