"use-client";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


type Series = {
  name: string | undefined;
  data: number[];
};

export function HourlyCyclists({ title, cyclistCount }) {
  const keyMap = new Map([
      ["child", { name: "Crianças" }],
      ["women", { name: "Mulheres" }],
      ["men", { name: "Homens" }],
    ]),
    hourlyBarKeysOriginal: string[] = ["men", "women", "child"],
    series: Series[] = [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  hourlyBarKeysOriginal.forEach((hk) => {
    const keymapname = keyMap.get(hk)?.name;
    series.push({
      name: keymapname,
      data: Object.values(cyclistCount.data.qualitative[hk].count_per_hour),
    });
  });

  const options = {
    chart: {
      type: "column",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}:00h</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
    title: {
      text: title,
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
          <h2 className="text-gray-600 text-3xl">
            Quantidade de ciclistas por hora
          </h2>
          {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
        </div>
      </div>
    </section>
  );
}
