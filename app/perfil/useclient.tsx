"use client";
import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHistogram from "highcharts/modules/histogram-bellcurve";
import HighchartsMore from "highcharts/highcharts-more";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import { getFiltersKeys, getHistogramData, getInicialFilters } from "./configuration";
import { PERFIL_DATA } from "../../servers";
import HistogramChart from "../components/Charts/HistogramChart";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsHistogram(Highcharts);
  HighchartsMore(Highcharts);
}

async function fetchWithFilters(filters) {
  const res = await fetch(PERFIL_DATA, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filters.filter((f) => f.checked)),
  });
  const { data } = await res.json();
  return data;
}

function PerfilClientSide() {
  const [filters, setFilters] = useState(getInicialFilters());

  const [dayData, setDayData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [needData, setNeedData] = useState([]);
  const [startData, setStartData] = useState([]);
  const [continueData, setContinueData] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [collisionData, setCollisionData] = useState([]);
  const [distanceOptions, setDistanceOptions] = useState(getHistogramData([]));

  useEffect(() => {
    Highcharts.charts.forEach((c) => {
      if (c !== undefined) {
        setTimeout(() => c.reflow(), 300);
      }
    });
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      return await fetchWithFilters(getInicialFilters());
    };
    applyFilters()
    fetchInitialData().then((data) => {
      setDayData(data.dayAggregate);
      setYearData(data.yearAggregate);
      setNeedData(data.needAggregate);
      setStartData(data.startAggregate);
      setContinueData(data.continueAggregate);
      setIssueData(data.issueAggregate);
      setCollisionData(data.collisionAggregate);
      setDistanceOptions(() => getHistogramData(data.distances));
    });
  }, []);

  const applyFilters = async () => {
    const data: any = await fetchWithFilters(filters);
    setDayData(data.dayAggregate);
    setYearData(data.yearAggregate);
    setNeedData(data.needAggregate);
    setStartData(data.startAggregate);
    setContinueData(data.continueAggregate);
    setIssueData(data.issueAggregate);
    setCollisionData(data.collisionAggregate);
  };

  const clearFilters = () => {
    setFilters((prevState) => {
      return prevState.map((i: any) => {
        return { ...i, checked: false };
      });
    });
  };

  const toggleFilter = (f, i: number) => {
    setFilters((prevState) => {
      return prevState.map((item: any) => {
        return item.value === f.value
          ? { ...item, checked: !item.checked }
          : item;
      });
    });
  };

  const options = [
    {
      title:
        "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte",
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
        <div className="border-gray-200 border p-8 flex flex-col">
          {getFiltersKeys().map((key) => (
            <div className="flex flex-wrap items-center space-y-4">
              <h3 className="font-bold text-xl mt-5">{key.title}</h3>
              <p>{"   "}</p>
              {filters
                .filter((f) => f.key === key.key)
                .map((f, i) => (
                  <ToogleButton
                    value={f.value}
                    checked={f.checked}
                    onChange={() => toggleFilter(f, i)}
                  />
                ))}
            </div>
          ))}
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
        {options.map((option) => (
          <HorizontalBarChart {...option} />
        ))}
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={distanceOptions} />
        </div>
      </section>
    </>
  );
}

export default PerfilClientSide;

function ToogleButton({ value, onChange, checked }) {
  return (
    <label key={value}>
      <input
        className="hidden bg-white text-gray-600"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <div
        className={` hover:bg-ameciclo hover:text-white toggle-btn rounded-3xl flex border switch w-32 h-10 items-center justify-center ${
          checked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
        } outline-none focus:outline-none`}
      >
        {value}
      </div>
    </label>
  );
}
