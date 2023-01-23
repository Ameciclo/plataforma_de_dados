import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";

import React, { useEffect, useState } from "react";

import CityCard from "../components/CityCard"
import IdecicloTable from "../components/IdecicloTable"
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";
import ideciclo_malha from "../public/malhacicloviariapermanente_mar2021.json"
import { server } from "../config";

//////////////////////
// INÍCIO DO RENDER //
///////////////////////

const Ideciclo = ({ideciclo, structures}) => {

  const page_data = {
    title: "Índice de Desenvolvimento Cicloviário",
    cover_image_url: "",
    Breadcrumb: {
      label:"IDECICLO",
      slug:"/ideciclo",
      routes:["/", "/ideciclo"],
    }  
  }

  ///////////////////
// CONFIGURAÇÕES //
///////////////////

let cidades = ideciclo
cidades.forEach((c) => c.reviews = c.reviews.sort((a,b) => a.year > b.year ? -1: 1))
cidades = cidades.filter((c) => c.reviews.length > 0)

function getTotalCityStates(input) {
  var arr = input, obj = {}, count = 0, st_arr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].state]) {
      obj[arr[i].state] = 1;
      count++
      st_arr.push(arr[i].state)
    } else if (obj[arr[i].state]) {
      obj[arr[i].state] += 1;
    }
  }
  return {states: st_arr, count: count}
}

///////////////////////////
// CONFIGURAÇÕES DO MAPA //
///////////////////////////

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
////////////////////////////////
// MAIS CONFIGURAÇÕES DO MAPA //
////////////////////////////////

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

  ////////////////////////
  // FILTROS DE CIDADE //
  ////////////////////////

  function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
  function filterByName(jsonObject, name) {return jsonObject.filter(function(jsonObject) {return (jsonObject['name'] == name);})[0];}
  
  const [filteredCity, setFilteredCity] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);
  const [selectedCity, setCity] = useState(filterByName(cidades, "Recife"));
  const [cityState, setCityState] = useState("PE");
  const [cityPop, setCityPop] = useState("");

  const changeCity = (id) => {
    setCity(filterById(cidades, id))
    //window.location.replace("#maisinfo")
  }

  useEffect(() => {
    if (selectedCity) {
      let city_structures = structures.filter((s) => {
        return s.city_id === selectedCity.id
      })
      let segs = []
      city_structures.forEach(d => {
        segs.push(
          { id: d.id,
            cidade: d.city_id,
            logradouro: d.street,
            tipologia: d.typology,
            comprimento: d.reviews[d.reviews.length-1].length/1000,
            nota: d.reviews[d.reviews.length-1].rates.average,
            projeto: d.reviews[d.reviews.length-1].rates.project,
            manutencao: d.reviews[d.reviews.length-1].rates.maintenance_and_urbanity,
            seguranca: d.reviews[d.reviews.length-1].rates.safety,
          })
        })
      setFilteredCityData(segs)
    } else {
      setFilteredCityData([])
    }
    if (cityState || cityPop) {
      setFilteredCity(
        ideciclo.filter((c) => {
          let city_size = "med"
          if (c.population < 100000) city_size = "peq"
          if (c.population > 500000) city_size = "grd"
          if (cityState !== "" && cityPop !== "") {
            return (
              c.state === cityState && city_size === cityPop
            );
          } else {
            return (
              c.state === cityState || city_size === cityPop
            );
          }
        })
      );
    } else {
      setFilteredCity(ideciclo);
    }
  }, [selectedCity, cityState, cityPop]);

  return (
    <Layout>
      <SEO title={page_data.title + " | Ameciclo"} />
      <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
      <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/>

      <section className="mx-auto container">
        <div className="mx-auto text-center my-24">
          <h1 className="text-6xl font-bold">Estatísticas Gerais</h1>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
            {[
              {title: "Cidades avaliadas", value: cidades.length}, 
              {title: "Em quantos estados", value: getTotalCityStates(cidades).count},
              {title: "Extensão avaliada (km)", value: (""+(
                                              (cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.road),0) +
                                              cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.street),0) +
                                              cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.local),0)
                                              )/(1000)).toFixed(1)).replace(".",",")}, 
                {title: "Vias avaliadas", value: (""+structures.length)}, 
              ].map((m) => (
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>{m.title}</h3>
                <h3 className="text-5xl font-bold mt-2">
                  {m.value}
                </h3>
             </div>
            ))}
          </div>
        </div>
        </section>
      <div className="mx-auto text-center my-24">
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
      <section className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold pb-5">Ranking das cidades</h1>
          <div className="inline-block relative w-64 px-4">
            <label htmlFor="docType">por estado:</label>
            <select
              value={cityState}
              name="cityState"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setCityState(e.target.value)}
              onBlur={(e) => e}
            >
            <option value="">Todos</option>
            {(getTotalCityStates(cidades).states).map((s) => <option value={s}>{s}</option>)}
            </select>
          </div>

          <div className="inline-block relative w-64 px-4">
            <label htmlFor="docType">por população:</label>
            <select
              value={cityPop}
              name="city_pop"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setCityPop(e.target.value)}
              onBlur={(e) => e}
            >
            <option value="">Todas</option>
            <option value="peq">até 100 mil hab</option>
            <option value="med">de 100 a 500 mil hab</option>
            <option value="grd">acima de 500 mil hab</option>
            </select>
          </div>

        <section className="container mx-auto grid grid-cols-6 md:grid-cols-1 md:grid-cols-6 auto-rows-auto gap-10 my-10">
          {filteredCity.filter(f => f.reviews[0].ideciclo > 0).sort((a, b) => {
            if (a.reviews.length > 0 && b.reviews.length > 0) {
              return (a.reviews[0].ideciclo > b.reviews[0].ideciclo ? -1 : 1)
            } else {
              return -1
            }
          }).map((city, index) => (
              <CityCard data={city} selected={city.id==selectedCity.id} key={city.id} changeCity={changeCity} position={index}/>
            ))}
        </section>
        {(filteredCityData.length > 0) && (
        <section>
            <div className="mx-auto text-center my-24">
                <h1 className="text-6xl font-bold">{selectedCity.name}</h1>
                <h3 className="text-4xl font-bold my-8">Estatísticas Gerais</h3>
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
                {[
                selectedCity.reviews.length > 0 && 
                ({title: "IDECICLO " + selectedCity.reviews[0].year, value: (""+selectedCity.reviews[0].ideciclo.toFixed(3)).replace(".",",")}),
                selectedCity.reviews.length > 1 && 
                ({title: "IDECICLO " + selectedCity.reviews[1].year, value: (""+selectedCity.reviews[1].ideciclo.toFixed(3)).replace(".",",")}  ),
                selectedCity.reviews.length  && 
                ({title: "Extensão avaliada (km)", value: (""+((selectedCity.reviews[0].city_network.cycle_length.road + 
                                                              selectedCity.reviews[0].city_network.cycle_length.street + 
                                                              selectedCity.reviews[0].city_network.cycle_length.local)/(1000)).toFixed(1)).replace(".",",")}), 
                {title: "Vias avaliadas", value: (""+((selectedCity.reviews[0].city_network.cycle_structures.road + 
                                                              selectedCity.reviews[0].city_network.cycle_structures.street + 
                                                              selectedCity.reviews[0].city_network.cycle_structures.local)))}
                  ].filter(e => e)
                  .map((m) => (
                  <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                    <h3>{m.title}</h3>
                    <h3 className="text-5xl font-bold mt-2">
                      {m.value}
                    </h3>
                  </div>
                 ))}
                </div>
              </div>
          </section>)}
          </div>
      </section>
      {/*(selectedCity.name === "Recife" ) && (
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
          </section>)*/}
      {(filteredCityData.length > 0) && (
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <h2 className="text-gray-600 text-3xl">Avaliações de cada via</h2>
        <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
        <IdecicloTable data={filteredCityData}/>
        </div>
      </section>)}
    </Layout>
  );
};


export async function getServerSideProps() {
  const idecicloRes = await fetch(
    `${server}/reviews`
  );

  const res = await fetch(
    `${server}/structures`
  );

  const structures = await res.json();
  const ideciclo = await idecicloRes.json();

  return { props: { ideciclo: ideciclo, structures: structures } };
}


export default Ideciclo