import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import InfoCard from "../components/InfoCard";
import Select from "react-select";
import BarChart from "../components/BarChart";
import axios from "axios";

const Perfil = ({ cyclistProfiles }) => {
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  let dataDay = {},
    dataDays = [],
    obj2 = {},
    dataYears = [],
    filters = [
      { key: "gender", value: "Masculino" },
      { key: "gender", value: "Feminino" },
      { key: "gender", value: "Outro" },
    ];

  // [
  //  {
  //    "day": 1,
  //      "Masculino": 180,
  //      "Feminino": 200
  //  },
  // ]

  const count = cyclistProfiles.reduce(
    (acc, cur) => (cur.data.days_usage.total === 7 ? ++acc : acc),
    0
  );

  console.log(count);

  filters.map((f) => {
    cyclistProfiles.map((c) => {
      if (!dataDays.some((d) => d[c.data.days_usage.total])) {
        dataDays.push({ day: c.data.days_usage.total, [f.value]: 1 });
      } else {
        console.log("Já tem o dia");
      }
      if (!dataDay[c.data.days_usage.total]) {
        dataDay[c.data.days_usage.total] = {
          day: c.data.days_usage.total,
          masculino: 1,
          [f.value]: 1,
        };
      } else {
        dataDay[c.data.days_usage.total][f.value]++;
      }
    });
  });

  cyclistProfiles.forEach((c) => {
    if (!obj2[c.data.years_using]) {
      obj2[c.data.years_using] = {
        years: c.data.years_using,
        quantity: 1,
      };
    } else {
      obj2[c.data.years_using].quantity++;
    }
  });

  // dataDays = Object.values(dataDay);
  dataDays = [
    {
      day: 1,
      Masculino: 180,
      Feminino: 200,
    },
    {
      day: 2,
      Masculino: 88,
      Feminino: 66,
      Outro: 50,
    },
    {
      day: 3,
      Masculino: 37,
      Feminino: 250,
    },
    {
      day: 4,
      Masculino: 57,
      Feminino: 156,
      Outro: 50,
    },
    {
      day: 5,
      Masculino: 77,
      Feminino: 136,
      Outro: 70,
    },
    {
      day: 6,
      Masculino: 92,
      Feminino: 211,
      Outro: 50,
    },
    {
      day: 7,
      Masculino: 66,
      Feminino: 277,
      Outro: 101,
      Preto: 350,
      Branco: 288,
    },
  ];
  dataYears = Object.values(obj2);

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Perfil Ciclista</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
        style={{ height: "25vh" }}
      >
        <h1 className="text-4xl font-bold">Perfil Ciclista</h1>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb label="Perfil" slug="/perfil" routes={["/", "/perfil"]} />
        </div>
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
              A pesquisa foi organizada pela Transporte Ativo e pelo
              LABMOB-UFRJ, e contou com uma extensa rede de organizações
              colaboradoras que levaram a campo, entre setembro de 2017 e abril
              de 2018 mais de 140 pesquisadores para realizar 7.644entrevistas.
              Devido a abrangência e a complexidade da pesquisa, a sua
              concretização só foi possível através da participação e
              engajamento de todos envolvidos, fruto de um grande esforço de
              ação coletivae voluntária.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
              Os resultados sintéticos apresentados aqui revelam as principais
              tendências do deslocamento por bicicleta em várias cidades
              brasileiras.Cabe ressaltar que não é possível uma comparação
              direta com a primeira edição da pesquisa – realizada em 2015
              –poisagoraadotamos outro método de amostragem, mais refinado e que
              resultou, em muitos casos, em amostras com tamanhos distintos. Os
              dados coletados e analisados nesta pesquisa fornecem subsídios
              para que gestores públicos, urbanistas e todos os envolvidoscom o
              tema, formulem uma agenda mais precisa e robusta de políticas
              públicas e ações de promoção do transporte cicloviário.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto shadow-md p-10">
        <h2 className="font-bold text-3xl mt-5">Selecione seus filtros</h2>
        <div className="flex">
          <div className="border-gray-200 border p-8 grid grid-cols-3 max-w-xl">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="font-bold text-xl mt-5">Gênero</h3>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Masculino
                </div>
              </label>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Feminino
                </div>
              </label>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Outro
                </div>
              </label>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="font-bold text-xl mt-5">Cor/Raça</h3>
              <button className="rounded-3xl bg-transparent border w-32 flex items-center justify-center text-gray-800 h-10 focus:bg-ameciclo focus:text-white outline-none focus:outline-none">
                Amarelo
              </button>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Branco
                </div>
              </label>
              <button className="rounded-3xl bg-transparent border w-32 flex items-center justify-center text-gray-800 h-10 focus:bg-ameciclo focus:text-white outline-none focus:outline-none">
                Indígena
              </button>
              <button className="rounded-3xl bg-transparent border w-32 flex items-center justify-center text-gray-800 h-10 focus:bg-ameciclo focus:text-white outline-none focus:outline-none">
                Pardo
              </button>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Preto
                </div>
              </label>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="font-bold text-xl mt-5">Área</h3>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Área 1
                </div>
              </label>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Área 2
                </div>
              </label>
              <label>
                <input className="hidden" type="checkbox" />
                <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
                  Área 3
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-2 auto-rows-auto gap-10 my-10">
        <div
          className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
          style={{ height: "700px" }}
        >
          <h2 className="text-gray-600 text-3xl">
            Quantos dias da semana costuma utilizar a bicicleta como meio de
            transporte.
          </h2>
          <BarChart
            data={dataDays}
            keys={["Masculino", "Feminino", "Outro", "Preto", "Branco"]}
            index={"day"}
            groupMode="grouped"
          />
        </div>
        <div
          className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
          style={{ height: "700px" }}
        >
          <h2 className="text-gray-600 text-3xl">
            Há quanto tempo utiliza a bicicleta como meio de transporte.
          </h2>
          <BarChart
            data={dataYears}
            keys={["quantity"]}
            index={"years"}
            groupMode="grouped"
          />
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8000/v1/cyclist-profile/`);

  const cyclistProfiles = await res.json();

  return { props: { cyclistProfiles: cyclistProfiles.data } };
}

export default Perfil;
