import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";
import StatisticsBox from "../components/StatisticsBox";
import ExplanationBox from "../components/ExplanationBox";
import NumberCards from "../components/NumberCards";
import IdecicloTable from "../components/IdecicloTable"

import React, { useEffect, useState } from "react";

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
    },
    ExplanationBox: {
      title_1: "O que é?",
      text_1: `O Ideciclo é o resultado da análise de uma estrutura cicloviária,
      levando em consideração critérios relativos à cobertura da malha,
      velocidades máximas das vias, segurança e conforto de ciclistas. O
      índice pode ser utilizado para comparar quantitativa e
      qualitativamente, a situação de uma mesma malha ao longo do tempo
      e em diferentes cidades. A metodologia de cálculo inclui O
      Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
      com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
      BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
      Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
      que permitem avaliar diversas tipologias cicloviárias.`,
      title_2: "Para que serve?",
      text_2: `O Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
      com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
      BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
      Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
      que permitem avaliar diversas tipologias cicloviárias. A
      metodologia completa foi aplicada em 3 cidades da Região
      Metropolitana do Recife, possibilitando a comparação da capital
      com a metodologia de 2016 (o que revelou aumento aquém do
      projetado e desejável), obtendo consistência independente dos
      avaliadores.`
    }
  }

/////////////////////////
// ESTATÍSTICAS GERAIS //
/////////////////////////
let cidades = ideciclo
cidades.forEach((c) => c.reviews = c.reviews.sort((a,b) => a.year > b.year ? -1: 1))
cidades = cidades.filter((c) => c.reviews.length > 0)
const GeneralStatistics = {
  title: "Estatísticas Gerais",
  subtitle: "",
  boxes: [
      {title: "Cidades avaliadas", value: cidades.length}, 
      {title: "Em quantos estados", value: getTotalCityStates(cidades).count},
      {title: "Extensão avaliada (km)", value: (""+(
                                      (cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.road),0) +
                                      cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.street),0) +
                                      cidades.reduce((acc, cur) => (acc + cur.reviews[0].city_network.cycle_length.local),0)
                                      )/(1000)).toFixed(1)).replace(".",",")}, 
        {title: "Vias avaliadas", value: (""+structures.length)}, 
  ]}

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

  const CityStatistics = {
    title: selectedCity.name,
    subtitle: "Estatísticas Gerais",
    boxes:   [
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

  const cards_city = (chosenCity)=> {
    return chosenCity.filter(f => f.reviews[0].ideciclo > 0).sort((a, b) => {
    if (a.reviews.length > 0 && b.reviews.length > 0) {
      return (a.reviews[0].ideciclo > b.reviews[0].ideciclo ? -1 : 1)
    } else {
      return -1
    }
    })}

  const CitiesRanking = {
    title: "Ranking das Cidades",
    filters: [
      { 
        title: "por estado:",
        value: cityState,
        name: "cityState",
        onChange: (e) => setCityState(e.target.value), 
        onBlur: (e) => e,
        items: [{value:"", label: "Todas"}].concat((getTotalCityStates(cidades).states).map((s) => ({value:s, label:s}))),
      },
      {
        title: "por população", 
        value: cityPop,
        name: "city_pop",
        onChange: (e) => setCityPop(e.target.value), 
        onBlur: (e) => e,
        items: [{value:"", label: "Todas"}, {value:"peq", label: "até 100 mil hab"}, {value:"med", label: "de 100 a 500 mil hab"}, {value:"grd", label: "acima de 500 mil hab"}]
      }
    ],
    data: []
  }

  return (
    <Layout>
      <SEO title={page_data.title + " | Ameciclo"} />
      <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
      <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/> 
      <StatisticsBox title={GeneralStatistics.title} subtitle={GeneralStatistics.subtitle} boxes={GeneralStatistics.boxes} />
      <ExplanationBox title_1={page_data.ExplanationBox.title_1} text_1={page_data.ExplanationBox.text_1} title_2={page_data.ExplanationBox.title_2} text_2={page_data.ExplanationBox.text_2}/>
      <NumberCards title={CitiesRanking.title} data={cards_city(filteredCity)} changeFunction={changeCity} selected={selectedCity.id} filters={CitiesRanking.filters} />
      {(filteredCityData.length > 0) && (
        <StatisticsBox title={CityStatistics.title} subtitle={CityStatistics.subtitle} boxes={CityStatistics.boxes} />
      )}   
      {(filteredCityData.length > 0) && (
        <IdecicloTable title={"Avaliações de cada via"} data={filteredCityData}/>
        )}
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