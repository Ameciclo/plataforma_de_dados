import { ResponsiveChord } from "@nivo/chord";
import React from "react";

const FlowChart = ({ data, keys }) => {
  return (
    <>
      <ResponsiveChord
        matrix={data}
        keys={keys}
        margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.02}
        arcOpacity={1}
        arcBorderWidth={1}
        arcBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
        ribbonOpacity={0.5}
        ribbonBorderWidth={1}
        BorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
        enableLabel={true}
        label="id"
        labelOffset={12}
        labelRotation={-90}
        labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
        colors={{ scheme: "nivo" }}
        isInteractive={true}
        arcHoverOpacity={1}
        arcHoverOthersOpacity={0.25}
        ribbonHoverOpacity={0.75}
        ribbonHoverOthersOpacity={0.25}
        animate={true}
        motionStiffness={90}
        motionDamping={7}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
            itemsSpacing: 0,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            symbolSize: 12,
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

export default FlowChart;
