import React from "react";

export const MapControlPanel = ({
  controlPanel,
  markerVisibility,
  pointsData,
  handleMarkerToggle,
}) => {
  return (
    <div className="absolute bottom-0 right-0 bg-white border rounded p-4 mb-2 shadow">
      <h3 className="font-bold mb-2">Legenda</h3>
      {controlPanel.map((control) => {
        const filteredPoints = pointsData.filter(
          (marker) => marker.type === control.type
        );
        const checked =
          filteredPoints.length > 0 &&
          filteredPoints.every(
            (point) => markerVisibility[point.key] === true
          );
        return (
          <div className="flex items-center mb-1 uppercase font-bold" key={control.type}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                filteredPoints.forEach((point) =>
                  handleMarkerToggle(point.key)
                );
              }}
            />
            <span
              className="ml-2 text-sm font-medium"
              style={{ color: control.color }}
            >
              {control.type}
            </span>
          </div>
        );
      })}
    </div>
  );
};
