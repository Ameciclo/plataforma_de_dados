"use client"
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Series } from "../../typings";
import { colors } from "../contagens/configuration"

interface HourlyCyclistsChartProps {
  series: Series[];
  hours: number[];
}

export function HourlyCyclistsChart({ series, hours }: HourlyCyclistsChartProps) {
  const options = {
    chart: {
      type: "line",
    },
    colors: colors,
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}h</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
    title: {
      text: "Fluxo horário de ciclistas",
    },
    xAxis: {
      type: "category",
      categories: hours,
      title: {
        text: "Hora",
      },
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
      scrollbar: {
        enabled: true,
      },
    },
    series,

    credits: {
      enabled: true,
    },
  };

  return (
    <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
      <div className="shadow-2xl rounded p-10 text-center overflow-x-scroll">
        <div style={{ minWidth: "500px" }}>
          <h2 className="text-gray-600 text-3xl">Quantidade de ciclistas por hora</h2>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </section>
  );
}
