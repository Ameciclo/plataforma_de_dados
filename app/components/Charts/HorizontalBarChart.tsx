import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

function HorizontalBarChart({title, yAxisTitle = "Quantidade", series}) {

const options = {
    chart: {
      type: "bar",
    },
    title: {
      text:
        title,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series: series,

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

export default HorizontalBarChart;
