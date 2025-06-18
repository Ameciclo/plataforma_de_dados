import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

function LineChart({title, xAxisTitle = "Ano", yAxisTitle = "Quantidade", series}) {
  const options = {
    chart: {
      type: "line",
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
    plotOptions: {
      line: {
        marker: {
          enabled: true
        }
      }
    },
    series: series,
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="shadow-2xl rounded p-6 pt-4 text-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default LineChart;