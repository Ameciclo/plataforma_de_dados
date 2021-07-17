import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import Select from "react-select";
import Link from "next/link";
import { useTable } from "react-table";
import city_json from "../public/IDECICLO - IDECICLO - Cities and Reviews.json.json"
import CityCard from "../components/CityCard"
import IdecicloTable from "../components/IdecicloTable"

const Ideciclo = ({ cities, structures }) => {

  let cidades = city_json
  cidades.forEach((c) => c.city_reviews = c.city_reviews.sort((a,b) => a.year > b.year ? -1: 1))
  cidades = cidades.filter((c) => c.city_reviews.length > 0)

  const [selectedCity, setCity] = useState("Recife");

  const changeCity = (name) => {
    setCity(name)
    window.location.replace("#maisinfo")
  }

  const [cityData, setCityData] = useState(null);
  const [cityStructure, setCityStructure] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchCity = async (city) => {
      try {
        const res = await fetch(
          `https://api.ideciclo.ameciclo.org/api/v1/cities/${city}`
        );
        const data = await res.json();
        setIsSearching(false);
        setCityData(data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchStructures = async (city) => {
      try {
        const res = await fetch(
          `https://api.ideciclo.ameciclo.org/api/v1/structures/?city=${city}`
        );
        const data = await res.json();
        setIsSearching(false);
        setCityStructure(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCity(selectedCity);
    fetchStructures(selectedCity);
  }, [selectedCity]);

  const data = React.useMemo(() => cityStructure, [cityStructure]);

  return (
    <Layout>
      <Head>
        <title>Ideciclo | Plataforma de Dados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
        style={{ height: "25vh" }}
      >
        <h1 className="text-4xl font-bold">Índice de Desenvolvimento Cicloviário</h1>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb
            label="Ideciclo"
            slug="/ideciclo"
            routes={["/", "/ideciclo"]}
          />
        </div>
      </div>
      <div className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold">Ranking das cidades</h1>
        <section className="container mx-auto grid grid-cols-5 md:grid-cols-1 md:grid-cols-5 auto-rows-auto gap-10 my-10">
          {cidades.sort((a, b) => {
            if (a.city_reviews.length > 0 && b.city_reviews.length > 0) {
              return (a.city_reviews[0].ideciclo > b.city_reviews[0].ideciclo ? -1 : 1)
            } else {
              return -1
            }
          }).map((city) => (
              <CityCard data={city} selected={city.name==selectedCity} key={city.id} changeCity={changeCity}/>
            ))}
        </section>
        <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
              O Ideciclo é o resultado da análise de uma estrutura cicloviária,
              levando em consideração critérios relativos à cobertura da malha,
              velocidades máximas das vias, segurança e conforto de ciclistas. O
              índice pode ser utilizado para comparar quantitativa e
              qualitativamente, a situação de uma mesma malha ao longo do tempo
              e em diferentes cidades. A metodologia de cálculo inclui O
              Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
              com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
              BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
              Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
              que permitem avaliar diversas tipologias cicloviárias.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
              O Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
              com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
              BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
              Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
              que permitem avaliar diversas tipologias cicloviárias. A
              metodologia completa foi aplicada em 3 cidades da Região
              Metropolitana do Recife, possibilitando a comparação da capital
              com a metodologia de 2016 (o que revelou aumento aquém do
              projetado e desejável), obtendo consistência independente dos
              avaliadores.
            </p>
          </div>
        </div>
      </section>
      </div>
      <section id={'maisinfo'}>
      {cityData && (
          <div className="mx-auto text-center my-24">
              <h1 className="text-6xl font-bold">{selectedCity}</h1>
              <h3 className="text-4xl font-bold my-8">Estatísticas Gerais</h3>
              <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
              {cityData.currentReview && (
                <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{"IDECICLO 2021"}</h3>
                  <h3 className="text-5xl font-bold mt-2">
                    {cityData.currentReview}
                  </h3>
                </div>)}
                {cityData.previousReview && (
                <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{"IDECICLO 2018"}</h3>
                  <h3 className="text-5xl font-bold mt-2">
                    {cityData.previousReview}
                  </h3>
                </div>)}
                {cityData.extension && (
                  <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                    <h3>{"Extensão"}</h3>
                    <h3 className="text-5xl font-bold mt-2">
                      {cityData.extension.toFixed(1)}
                    </h3>
                  </div>
                )}
                <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{"Avaliações"}</h3>
                  <h3 className="text-5xl font-bold mt-2">
                    {cityData.reviewCount}
                  </h3>
                </div>
              </div>
            </div>
        )}
          </section>
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <h2 className="text-gray-600 text-3xl">Avaliações de cada via</h2>
        <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
        <IdecicloTable data={data}/>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://api.ideciclo.ameciclo.org/api/v1/cities/`);
  const res_structures = await fetch(
    "https://api.ideciclo.ameciclo.org/api/v1/structures/"
  );

  const structures = await res_structures.json();
  const cities = await res.json();

  return { props: { cities, structures } };
}

export default Ideciclo;
