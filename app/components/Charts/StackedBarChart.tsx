import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";

interface StackedBarChartProps {
  title: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  categories: string[];
  series: Highcharts.SeriesOptionsType[];
}

function StackedBarChart({
  title,
  xAxisTitle = "Ano",
  yAxisTitle = "Quantidade",
  categories,
  series,
}: StackedBarChartProps): React.ReactElement {
  const [isPercentage, setIsPercentage] = useState<boolean>(false);
  
  const getOptions = (): Highcharts.Options => {
    return {
      chart: {
        type: "column",
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: categories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: isPercentage ? "Percentual (%)" : yAxisTitle,
        },
        labels: {
          format: isPercentage ? '{value}%' : '{value}'
        },
        stackLabels: {
          enabled: true,
          format: isPercentage ? '{total}%' : '{total}',
          style: {
            fontWeight: "bold",
            color: "gray",
          },
        },
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        backgroundColor: "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false,
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: isPercentage 
          ? "{series.name}: {point.percentage:.1f}%<br/>Total: {point.stackTotal}%"
          : "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: isPercentage ? "percent" : "normal",
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: series,
      credits: {
        enabled: false,
      },
    };
  };

  return (
    <div className="shadow-2xl rounded p-6 pt-4 text-center">
      <div className="mb-4 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              !isPercentage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setIsPercentage(false)}
          >
            Valores Absolutos
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              isPercentage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setIsPercentage(true)}
          >
            Percentual
          </button>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    </div>
  );
}

export default StackedBarChart;