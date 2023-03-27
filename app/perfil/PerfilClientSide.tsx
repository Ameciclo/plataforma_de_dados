"use client";
import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHistogram from "highcharts/modules/histogram-bellcurve";
import HighchartsMore from "highcharts/highcharts-more";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsHistogram(Highcharts);
  HighchartsMore(Highcharts);
}

function PerfilClientSide({ data }) {
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState([
    { key: "gender", value: "Masculino", checked: true },
    { key: "gender", value: "Feminino", checked: true },
    { key: "gender", value: "Outro", checked: true },
    { key: "color_race", value: "Amarela", checked: false },
    { key: "color_race", value: "Branca", checked: false },
    { key: "color_race", value: "Indígena", checked: false },
    { key: "color_race", value: "Parda", checked: false },
    { key: "color_race", value: "Preta", checked: false },
  ]);
  const [dayData, setDayData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [needData, setNeedData] = useState([]);
  const [startData, setStartData] = useState([]);
  const [continueData, setContinueData] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [distanceOptions, setDistanceOptions] = useState({
    title: {
      text: "Quanto tempo você leva?",
    },

    subtitle: {
      text: "Histograma de agrupamento de distâncias em minutos",
    },

    xAxis: [
      {
        title: { text: "" },
        alignTicks: false,
      },
      {
        title: { text: "Distância em minutos" },
        alignTicks: false,
        opposite: false,
      },
    ],

    yAxis: [
      {
        title: { text: "" },
      },
      {
        title: { text: "Quantidade" },
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
        data: [],
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
  });
  const [collisionData, setCollisionData] = useState([]);

  useEffect(() => {
    Highcharts.charts.forEach((c) => {
      if (c !== undefined) {
        setTimeout(() => c.reflow(), 300);
      }
    });
  }, []);

  const toggleFilter = (f, i: number) => {
    setFilters((prevState) => {
      return prevState.map((item: any) => {
        return item.value === f.value
          ? { ...item, checked: !item.checked }
          : item;
      });
    });
  };

  const clearFilters = () => {
    setFilters((prevState) => {
      return prevState.map((i: any) => {
        return { ...i, checked: false };
      });
    });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const defaultFilters = [
        { key: "gender", value: "Masculino" },
        { key: "gender", value: "Feminino" },
        { key: "gender", value: "Outro" },
      ];
      const res = await fetch(
        `https://api.perfil.ameciclo.org/v1/cyclist-profile/summary/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(defaultFilters),
        }
      );
      const { data } = await res.json();
      return data;
    };

    fetchInitialData().then((data) => {
      setDayData(data.dayAggregate);
      setYearData(data.yearAggregate);
      setNeedData(data.needAggregate);
      setStartData(data.startAggregate);
      setContinueData(data.continueAggregate);
      setIssueData(data.issueAggregate);
      setDistanceOptions((prevState) => ({
        ...prevState,
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
            data: data.distances,
            visible: false,
            id: "s1",
            marker: {
              radius: 1.5,
            },
          },
        ],
      }));
      setCollisionData(data.collisionAggregate);
    });
  }, []);

  const applyFilters = async () => {
    const res = await fetch(
      `https://api.perfil.ameciclo.org/v1/cyclist-profile/summary/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(filters.filter((f) => f.checked)),
      }
    );
    const { data } = await res.json();
    setDayData(data.dayAggregate);
    setYearData(data.yearAggregate);
    setNeedData(data.needAggregate);
    setStartData(data.startAggregate);
    setContinueData(data.continueAggregate);
    setIssueData(data.issueAggregate);
    setCollisionData(data.collisionAggregate);
  };

  const options = [
    {
      title: "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte",
      series: dayData,
    },
    {
      title: "Há quanto tempo utiliza a bicicleta como meio de transporte",
      series: yearData,
    },
    {
      title: "O que faria você pedalar mais?",
      series: needData,
    },
    {
      title: "Qual foi a sua motivação para começar?",
      series: startData,
    },
    {
      title: "Qual foi a sua motivação para continuar a pedalar?",
      series: continueData,
    },
    {
      title: "Qual o seu maior problema ao pedalar?",
      series: issueData,
    },
    {
      title: "Já sofreu algum tipo de colisão?",
      series: collisionData,
    },
  ];

  return (
    <>
      <section className="container mx-auto shadow-md p-10">
        <h2 className="font-bold text-3xl mt-5">Selecione seus filtros</h2>
        <div className="border-gray-200 border p-8 grid grid-cols-1 sm:grid-cols-3">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-bold text-xl mt-5">Gênero</h3>
            {filters
              .filter((f) => f.key === "gender")
              .map((f: any, i) => {
                return (
                  <label key={f.value}>
                    <input
                      className="hidden"
                      type="checkbox"
                      onChange={() => toggleFilter(f, i)}
                      checked={f.checked}
                    />
                    <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                      {f.value}
                    </div>
                  </label>
                );
              })}
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-bold text-xl mt-5">Cor/Raça</h3>
            {filters
              .filter((f) => f.key === "color_race")
              .map((f: any, i) => {
                return (
                  <label key={f.value}>
                    <input
                      className="hidden"
                      type="checkbox"
                      onChange={() => toggleFilter(f, i)}
                      checked={f.checked}
                    />
                    <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                      {f.value}
                    </div>
                  </label>
                );
              })}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => applyFilters()}
            className="toggle-btn border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2 outline-none focus:outline-none"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={() => clearFilters()}
            className="toggle-btn border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2 outline-none focus:outline-none"
          >
            Limpar Filtros
          </button>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-10 my-10">
        {options.map(o => (
          <HorizontalBarChart title={o.title} data={o.series} />
        ))}
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={distanceOptions} />
        </div>
      </section>
    </>
  );
}

export default PerfilClientSide;
