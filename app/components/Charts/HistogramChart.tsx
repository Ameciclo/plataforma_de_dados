import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

function HistogramChart ({ title, subtitle = "", xAxisTitle = "", yAxisTitle = "Quantidade", series }) {
  const options = {
    title: {
      text: title,
    },

    subtitle: {
      text: subtitle,
    },

    xAxis: [
      {
        title: { text: xAxisTitle },
        alignTicks: false,
      },
      {
        title: { text: xAxisTitle},
        alignTicks: false,
        opposite: false,
      },
    ],

    yAxis: [
      {
        title: { text: "" },
      },
      {
        title: { text: yAxisTitle },
        opposite: false,
      },
    ],

    series: [
      {
        name: "Total",
        type: "histogram",
        xAxis: 1,
        yAxis: 1,
        baseSeries: "s1",
        zIndex: 2,
      },
      {
        name: "",
        type: "scatter",
        data: series,
        visible: false,
        id: "s1",
        marker: {
          radius: 1.5,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <div className="shadow-2xl rounded p-10 text-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default HistogramChart;
