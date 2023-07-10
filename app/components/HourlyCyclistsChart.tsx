"use client"
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Series, CountEditionSession } from "../../typings";

export function HourlyCyclistsChart({ sessions }: { sessions: { [key: string]: CountEditionSession } }) {
  const series: Series[] = [];
  const hours: number[] = [];
  const totalCyclists: number[] = [];
  const characteristicsMap = new Map([
    ["total_cyclists", { name: "Total" }],
    ["women", { name: "Mulheres" }],
    ["child", { name: "Crianças e Adolescentes" }],
    ["ride", { name: "Carona" }],
    ["helmet", { name: "Capacete" }],
    ["service", { name: "Serviço" }],
    ["cargo", { name: "Cargueira" }],
    ["shared_bike", { name: "Compartilhada" }],
    ["sidewalk", { name: "Calçada" }],
    ["wrong_way", { name: "Contramão" }],
  ]);

  Object.values(sessions).forEach((session: CountEditionSession) => {
    const { start_time, total_cyclists, characteristics } = session;
    const hour = parseInt(start_time.split(":")[0]);
    hours.push(hour);
    totalCyclists.push(total_cyclists);

    Object.entries(characteristics).forEach(([key, value]) => {
      if (characteristicsMap.has(key)) {
        const characteristic = characteristicsMap.get(key);
        const seriesIndex = series.findIndex((s) => s.name === characteristic?.name);
        if (seriesIndex !== -1) {
          series[seriesIndex].data.push(value);
        } else {
          series.push({
            name: characteristic?.name ?? "",
            data: [value],
            visible: false,
          });
        }
      }
    });
  });

  series.push({
    name: "Total de Ciclistas",
    data: totalCyclists,
    visible: true,
  });


  const options = {
    chart: {
      type: "line",
    },
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
