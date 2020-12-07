import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import ContagensTable from "../components/ContagensTable";
import ReactMapGL, { Marker } from "react-map-gl";
import Breadcrumb from "../components/Breadcrumb";
import InfoCard from "../components/InfoCard";
import { HourlyBarChart } from "../components/HourlyBarChart";

const keytemp = [ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]

const datatemp = [{
    "country": "AD",
    "hot dog": 200,
    "hot dogColor": "hsl(9, 70%, 50%)",
    "burger": 23,
    "burgerColor": "hsl(69, 70%, 50%)",
    "sandwich": 16,
    "sandwichColor": "hsl(52, 70%, 50%)",
    "kebab": 35,
    "kebabColor": "hsl(49, 70%, 50%)",
    "fries": 38,
    "friesColor": "hsl(56, 70%, 50%)",
    "donut": 175,
    "donutColor": "hsl(203, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 84,
    "hot dogColor": "hsl(302, 70%, 50%)",
    "burger": 153,
    "burgerColor": "hsl(213, 70%, 50%)",
    "sandwich": 159,
    "sandwichColor": "hsl(131, 70%, 50%)",
    "kebab": 83,
    "kebabColor": "hsl(120, 70%, 50%)",
    "fries": 185,
    "friesColor": "hsl(145, 70%, 50%)",
    "donut": 26,
    "donutColor": "hsl(156, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 115,
    "hot dogColor": "hsl(261, 70%, 50%)",
    "burger": 118,
    "burgerColor": "hsl(219, 70%, 50%)",
    "sandwich": 69,
    "sandwichColor": "hsl(277, 70%, 50%)",
    "kebab": 187,
    "kebabColor": "hsl(331, 70%, 50%)",
    "fries": 80,
    "friesColor": "hsl(353, 70%, 50%)",
    "donut": 27,
    "donutColor": "hsl(105, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 88,
    "hot dogColor": "hsl(51, 70%, 50%)",
    "burger": 149,
    "burgerColor": "hsl(166, 70%, 50%)",
    "sandwich": 114,
    "sandwichColor": "hsl(320, 70%, 50%)",
    "kebab": 191,
    "kebabColor": "hsl(16, 70%, 50%)",
    "fries": 8,
    "friesColor": "hsl(357, 70%, 50%)",
    "donut": 45,
    "donutColor": "hsl(346, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 116,
    "hot dogColor": "hsl(214, 70%, 50%)",
    "burger": 140,
    "burgerColor": "hsl(143, 70%, 50%)",
    "sandwich": 89,
    "sandwichColor": "hsl(234, 70%, 50%)",
    "kebab": 120,
    "kebabColor": "hsl(225, 70%, 50%)",
    "fries": 159,
    "friesColor": "hsl(88, 70%, 50%)",
    "donut": 156,
    "donutColor": "hsl(156, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 52,
    "hot dogColor": "hsl(357, 70%, 50%)",
    "burger": 199,
    "burgerColor": "hsl(156, 70%, 50%)",
    "sandwich": 88,
    "sandwichColor": "hsl(105, 70%, 50%)",
    "kebab": 95,
    "kebabColor": "hsl(31, 70%, 50%)",
    "fries": 97,
    "friesColor": "hsl(131, 70%, 50%)",
    "donut": 170,
    "donutColor": "hsl(104, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 70,
    "hot dogColor": "hsl(86, 70%, 50%)",
    "burger": 32,
    "burgerColor": "hsl(281, 70%, 50%)",
    "sandwich": 86,
    "sandwichColor": "hsl(206, 70%, 50%)",
    "kebab": 81,
    "kebabColor": "hsl(130, 70%, 50%)",
    "fries": 21,
    "friesColor": "hsl(294, 70%, 50%)",
    "donut": 61,
    "donutColor": "hsl(129, 70%, 50%)"
  }]

const Contagens = ({ cyclistCounts, globalSummary }) => {
  function groupBy(xs, f) {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  }

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const SIZE = 20;

  let countsGroupedByLocation = groupBy(cyclistCounts, (count) => count.name);
  let countsGroupedArray = Object.entries(countsGroupedByLocation);


  const [viewport, setViewport] = useState({
    latitude: -8.0584364,
    longitude: -34.945277,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

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
          <Breadcrumb
            label="Perfil"
            slug="/perfil"
            routes={["/", "/perfil"]}
          />
        </div>
      </div>
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold">Estatísticas Gerais</h1>
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Pessoas entrevistadas"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].totalAmount}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Cor/raça predominante"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].numberOfCounts}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Renda predominante"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {countsGroupedArray.length}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Faixa etária predominante"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].MaximumValue}
            </h3>
          </div>
        </div>
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        {/*<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-10 my-10">*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].totalAmount}*/}
        {/*    label={"N.º de ciclistas contados"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].numberOfCounts}*/}
        {/*    label={"Contagens Realizadas"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={countsGroupedArray.length}*/}
        {/*    label={"Pontos Monitorados"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].MaximumValue}*/}
        {/*    label={"N.º máximo contado"}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
            A  pesquisa  foi  organizada  pela Transporte  Ativo e  pelo LABMOB-UFRJ,  
            e  contou  com  uma  extensa  rede  de  organizações colaboradoras  que  
            levaram  a  campo,  entre  setembro  de  2017  e  abril  de  2018  mais de  
            140 pesquisadores  para  realizar 7.644entrevistas.  Devido  a  abrangência  
            e  a  complexidade  da  pesquisa,  a  sua  concretização  só  foi  possível  
            através  da participação e engajamento de todos envolvidos, fruto de um grande 
            esforço de ação coletivae voluntária.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
            Os resultados sintéticos apresentados aqui revelam as principais tendências  
            do  deslocamento por  bicicleta em várias cidades brasileiras.Cabe ressaltar 
            que não é possível uma comparação direta com a primeira edição da pesquisa –  
            realizada  em  2015 –poisagoraadotamos  outro  método  de  amostragem,  mais  
            refinado  e  que resultou, em muitos casos, em amostras com tamanhos distintos. 
            Os dados coletados  e analisados  nesta  pesquisa fornecem subsídios para que  
            gestores públicos,  urbanistas e todos os envolvidoscom o tema, 
            formulem uma agenda mais precisa e robusta de políticas públicas e ações de 
            promoção do transporte cicloviário.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">

          <div
            className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
            style={{ height: "700px" }}
          >
          <h1 className="text-6xl font-bold">Perfil Ciclistas</h1>
            <h2 className="text-gray-600 text-3xl">
              Quantidade de ciclistas por hora
            </h2>
            <HourlyBarChart data={datatemp} keys={keytemp} indexBy="country"/>
          </div>
        </section>

      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        
        <h2 className="text-gray-600 text-3xl">
              Compare com outras cidades
        </h2>
        
        <ContagensTable data={cyclistCounts} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const globalSummaryRes = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/`
  );

  const res = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count`
  );

  const cyclistCounts = await res.json();
  const globalSummary = await globalSummaryRes.json();

  return { props: { cyclistCounts, globalSummary } };
}

export default Contagens;
