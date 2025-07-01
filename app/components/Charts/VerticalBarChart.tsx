import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

function VerticalBarChart({title, xAxisTitle = "Ano", yAxisTitle = "Quantidade", series}) {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    xAxis: {
      type: "category",
      title: {
        text: xAxisTitle
      }
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

export default VerticalBarChart;