import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabel={(item) => `${item.value}%`}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        tooltip={({ datum }) => {
          return (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                zIndex: 10,
                top: "0px",
                left: "0px",
              }}
            >
              <div
                style={{
                  background: "white",
                  color: "inherit",
                  fontSize: "inherit",
                  borderRadius: "2px",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
                  padding: "5px 9px",
                }}
              >
                <div
                  style={{
                    whiteSpace: "pre",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "12px",
                      height: "12px",
                      background: `${datum.color}`,
                      marginRight: "7px",
                    }}
                  />
                  <span>
                    {datum.id}: <strong>{datum.value}%</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default PieChart;
