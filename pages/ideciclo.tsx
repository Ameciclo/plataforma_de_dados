import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import city_json from "../public/IDECICLO - IDECICLO - Cities and Reviews.json.json"
import streets_json from "../public/IDECICLO - Recife - 2021 - structures.json"
import CityCard from "../components/CityCard"
import IdecicloTable from "../components/IdecicloTable"
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";
import ideciclo_malha from "../public/malhacicloviariapermanente_mar2021.json"

const malha = {
  'type': 'geojson',
  'data': ideciclo_malha
}

const layers = {
  ciclovia: {
    id: 'ciclovias',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
    },
    filter: ['==', 'Tipo', 'Ciclovia']
  },
  ciclofaixa: {
    id: 'ciclofaixas',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
      'line-dasharray': [2,.5],
    },
    filter: ['==', 'Tipo', 'Ciclofaixa']
  },
  ciclorrota: {
    id: 'ciclorrota',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 2,
      'line-dasharray': [1,2.5],
    },
    filter: ['==', 'Tipo', 'Ciclorrota']
  },
};
  const navControlStyle= {
    right: 10,
    top: 10
  };

const Ideciclo = () => {

    const [viewport, setViewport] = useState({
      latitude: -8.0584364,
      longitude: -34.945277,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });
  
    const [settings, setsettings] = useState({
      dragPan: true,
      dragRotate: true,
      scrollZoom: false,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      boxZoom: true,
      doubleClickZoom: true
    });
  
  function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
  function filterByName(jsonObject, name) {return jsonObject.filter(function(jsonObject) {return (jsonObject['name'] == name);})[0];}

  let cidades = city_json
  cidades.forEach((c) => c.city_reviews = c.city_reviews.sort((a,b) => a.year > b.year ? -1: 1))
  cidades = cidades.filter((c) => c.city_reviews.length > 0)

  const [selectedCity, setCity] = useState(filterByName(cidades, "Recife"));

  const changeCity = (id) => {
    setCity(filterById(cidades, id))
    window.location.replace("#maisinfo")
  }

  const street_data = streets_json

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
      <section className="mx-auto container">
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
              <CityCard data={city} selected={city.id==selectedCity.id} key={city.id} changeCity={changeCity}/>
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
            <div className="mx-auto text-center my-24">
                <h1 className="text-6xl font-bold">{selectedCity.name}</h1>
                <h3 className="text-4xl font-bold my-8">Estatísticas Gerais</h3>
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
                {selectedCity.city_reviews.length > 0 && (
                  <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                    <h3>{"IDECICLO " + selectedCity.city_reviews[0].year}</h3>
                    <h3 className="text-5xl font-bold mt-2">
                      {(""+selectedCity.city_reviews[0].ideciclo.toFixed(3)).replace(".",",")}
                    </h3>
                  </div>)}
                  {selectedCity.city_reviews.length > 1 && (
                  <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                    <h3>{"IDECICLO " + selectedCity.city_reviews[1].year}</h3>
                    <h3 className="text-5xl font-bold mt-2">
                      {(""+selectedCity.city_reviews[1].ideciclo.toFixed(3)).replace(".",",")}
                    </h3>
                  </div>)}
                  {selectedCity.city_reviews.length  && (
                    <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                      <h3>{"Extensão(km)"}</h3>
                      <h3 className="text-5xl font-bold mt-2">
                        {(""+((selectedCity.city_reviews[0].city_network.cycle_length.road + 
                        selectedCity.city_reviews[0].city_network.cycle_length.street + 
                        selectedCity.city_reviews[0].city_network.cycle_length.local)/(1000)).toFixed(1)).replace(".",",")}
                      </h3>
                    </div>
                  )}
                  <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                    <h3>{"Estruturas avaliadas"}</h3>
                    <h3 className="text-5xl font-bold mt-2">
                      {streets_json.length}
                    </h3>
                  </div>
                </div>
              </div>
          </section>
      </section>
      <section className="container mx-auto my-10">
        <div className="bg-green-200 rounded shadow-2xl">
          <ReactMapGL
            {...viewport}
            {...settings}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            width="100%"
            height="500px"
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxApiAccessToken={
              "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"
            }
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <FullscreenControl  style={navControlStyle}/>
            </div>

            <div style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <NavigationControl  style={navControlStyle}/>
            </div>
            <Source id="malha" type={malha.type} data={malha.data}>
                <Layer {...layers.ciclovia} />
                <Layer {...layers.ciclofaixa} />
                <Layer {...layers.ciclorrota} />
            </Source>
          </ReactMapGL>
        </div>
      </section>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <h2 className="text-gray-600 text-3xl">Avaliações de cada via</h2>
        <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
        <IdecicloTable data={street_data}/>
        </div>
      </section>
    </Layout>
  );
};

export default Ideciclo