import {Layout} from "../../components/OLD/OldLayout";
import {ExplanationBox} from "../components/ExplanationBox";

import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHistogram from "highcharts/modules/histogram-bellcurve";
import HighchartsMore from "highcharts/highcharts-more";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsHistogram(Highcharts);
  HighchartsMore(Highcharts);
}
/*
//////
/// esses consts irão para o BD
//////
  const page_data = {
    title: "Pesquisa Perfil Ciclista",
    cover_image_url: "/pesquisaperfil.png",
    ExplanationBoxData: {
      title_1: "O que é?",
      text_1: `A pesquisa foi organizada pela Transporte Ativo e pelo
      LABMOB-UFRJ, e contou com uma extensa rede de organizações
      colaboradoras que levaram a campo, entre setembro de 2017 e abril
      de 2018 mais de 140 pesquisadores para realizar 7.644entrevistas.
      Devido a abrangência e a complexidade da pesquisa, a sua
      concretização só foi possível através da participação e
      engajamento de todos envolvidos, fruto de um grande esforço de
      ação coletivae voluntária.`,
      title_2: "Para que serve?",
      text_2: `Os resultados sintéticos apresentados aqui revelam as principais
      tendências do deslocamento por bicicleta em várias cidades
      brasileiras.Cabe ressaltar que não é possível uma comparação
      direta com a primeira edição da pesquisa – realizada em 2015
      –poisagoraadotamos outro método de amostragem, mais refinado e que
      resultou, em muitos casos, em amostras com tamanhos distintos. Os
      dados coletados e analisados nesta pesquisa fornecem subsídios
      para que gestores públicos, urbanistas e todos os envolvidoscom o
      tema, formulem uma agenda mais precisa e robusta de políticas
      públicas e ações de promoção do transporte cicloviário.`
      },
  }    

const Perfil = () => {
  
  const BreadcrumbConf = {
      label:"Perfil Ciclista",
      slug:"/perfil",
      routes:["/", "/perfil"],
    }


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
      return prevState.map((item : any) => {
        return item.value === f.value
          ? { ...item, checked: !item.checked }
          : item;
      });
    });
  };

  const clearFilters = () => {
    setFilters((prevState) => {
      return prevState.map((i : any) => {
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

  const dayOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text:
        "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: dayData,

    credits: {
      enabled: false,
    },
  };

  const yearOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Há quanto tempo utiliza a bicicleta como meio de transporte",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: yearData,

    credits: {
      enabled: false,
    },
  };

  const needOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "O que faria você pedalar mais?",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: needData,

    credits: {
      enabled: false,
    },
  };

  const startOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Qual foi a sua motivação para começar?",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: startData,

    credits: {
      enabled: false,
    },
  };

  const continueOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Qual foi a sua motivação para continuar a pedalar?",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: continueData,

    credits: {
      enabled: false,
    },
  };

  const issueOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Qual o seu maior problema ao pedalar?",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: issueData,

    credits: {
      enabled: false,
    },
  };

  const collisionOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Já sofreu algum tipo de colisão?",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: collisionData,

    credits: {
      enabled: false,
    },
  };

  return (
    <Layout pageTitle={page_data.title} coverUrl={page_data.cover_image_url} breadcrumbConf={BreadcrumbConf}>
      <ExplanationBox
        props={[
          {
            title: page_data.ExplanationBoxData.title_1,
            description: page_data.ExplanationBoxData.text_1,
          },
          {
            title: page_data.ExplanationBoxData.title_2,
            description: page_data.ExplanationBoxData.text_2,
          },
        ]}
      />      <section className="container mx-auto shadow-md p-10">
        <h2 className="font-bold text-3xl mt-5">Selecione seus filtros</h2>
        <div className="border-gray-200 border p-8 grid grid-cols-1 sm:grid-cols-3">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-bold text-xl mt-5">Gênero</h3>
            {filters
              .filter((f) => f.key === "gender")
              .map((f : any, i) => {
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
              .map((f : any, i) => {
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
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={dayOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={yearOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={needOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={startOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={continueOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={issueOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={collisionOptions} />
        </div>
        <div className="shadow-2xl rounded p-10 text-center">
          <HighchartsReact highcharts={Highcharts} options={distanceOptions} />
        </div>
      </section>
    </Layout>
  );
};

export default Perfil;
 */          {/*<div className="flex flex-col items-center space-y-4">*/}
          {/*  <h3 className="font-bold text-xl mt-5">Área</h3>*/}
          {/*  <label>*/}
          {/*    <input className="hidden" type="checkbox" />*/}
          {/*    <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">*/}
          {/*      Área 1*/}
          {/*    </div>*/}
          {/*  </label>*/}
          {/*  <label>*/}
          {/*    <input className="hidden" type="checkbox" />*/}
          {/*    <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">*/}
          {/*      Área 2*/}
          {/*    </div>*/}
          {/*  </label>*/}
          {/*  <label>*/}
          {/*    <input className="hidden" type="checkbox" />*/}
          {/*    <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">*/}
          {/*      Área 3*/}
          {/*    </div>*/}
          {/*  </label>*/}
          {/*</div>*/}