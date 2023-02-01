import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";
import ExplanationBox from "../components/ExplanationBox";
import StatisticsBox from "../components/StatisticsBox";
import StructureMap from "../components/StructureMap";
import NumberCards from "../components/NumberCards";
import Table from "../components/Table";
import {ColumnFilter, NumberRangeColumnFilter, SelectColumnFilter} from "../components/TableFilters";
//import EvalolutionGraph from 
import GridSession from "../components/GridSession";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import calcs from "../pdc/calcs"
import utils from "../utils"


//////
/// esses consts irão para o BD
//////

const data = calcs()
const cities_datas = data.kms.municipios

const documents = {
title: "Documentos e links importantes para o PDC.",
grids: [
  {title: "Plano Diretor Cicloviário da RMR - vol 1", icon: "", url: "https://drive.google.com/file/d/0BxR5Ri6g5X_ZaldIY2tZS1pYRUU/view?usp=share_link&resourcekey=0-qVT9rlnlNOAdE-cs1-fn9A", text: "Documento lançado em 2014, parte principal que contém o estudo."},
  {title: "Plano Diretor Cicloviário da RMR - vol 2", icon: "", url: "https://drive.google.com/file/d/0BxR5Ri6g5X_ZaVlpckJQVS1CTlU/view?usp=share_link&resourcekey=0-PjUIH1c2ObtbdTUGuLn28g", text: "Parte 2 do documento, apenas com os mapas."},
  {title: "Pasta do PDC", icon: "", url: "https://pdc.ameciclo.org", text: "Pasta em nosso drive com o plano, o processo de construção e a nossa ação civil-pública para a implantação."},
  {title: "Ciclomapa", icon: "", url: "https://ciclomapa.org.br/", text: "Mapa colaborativo que monitora as ciclovias de diversas cidades, inclusive a nossa."},
  {title: "Ações de desaniversário", icon: "", url: "", text: "Compilado de nossas ações de desaniversário, quando comemoramos a infeliz não execução do PDC."},
  {title: "Oficina do PDC", icon: "", url: "", text: "Oficina que ministramos com ameciclistas para informar sobre o PDC e sua importância."},
  ]
}

  const page_data = {
    title: "Observatório Cicloviário",
    cover_image_url: "",
    ExplanationBoxData: {
      title_1: "O que é?",
      text_1: `O Observatório Cicloviário se propõe a monitorar o caminhar da estrutura
      cicloviária projetada, frente a estrutura executada. Em 4 de fevereiro de 2014
      o Governo do Estado, junto com as prefeituras da RMR, lançou o Plano Diretor
      Cicloviário (PDC). Desde então nós cobranos a execução dessa promessa e de outras
      que possam surgir.`,
      title_2: "Por que o PDC?",
      text_2: `O Plano Diretor Cicloviário integra os diversos municípios da RMR com uma
      rede cicloviária, priorizando as principais avenidas e pontos de conexões das cidades.
      Seu projeto teve participação não só dos entes públicos, mas também da sociedade civil,
      como nós, da Ameciclo. É melhor um plano na mão do que dois voando.`
    } 
  }

const Observatorio = ({ }) => {

  const ciclos = data.map

  const BreadcrumbConf = {
      label:"Observatório",
      slug:"/observatorio",
      routes:["/", "/observatorio"],
    }

  const statistics = {
    title: "Execução Cicloviária RMR",
    subtitle: "",
    boxes: [
        {title: "km de estruturas cicloviárias", value: (data.kms.pdc_feito + data.kms.out_pdc).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1})},
        {title: "km projetados no PDC", value: data.kms.pdc_total.toLocaleString('pt-BR', { minimumFractionDigits: 1,   maximumFractionDigits: 1})},
        {title: "km executados do PDC", value: data.kms.pdc_feito.toLocaleString('pt-BR', { minimumFractionDigits: 1,  maximumFractionDigits: 1})},
        {title: "completado do pdc", value: (data.kms.pdc_feito/data.kms.pdc_total).toLocaleString('pt-BR', { style:'percent',  minimumFractionDigits: 1, maximumFractionDigits: 1})}
    ]
  } 
      
  const PDCLayer = {
      id: 'PDC_undone',
      type: 'line',
      paint: {
        'line-color': "#000000",
        'line-opacity':0.5, 
        'line-width': 2,
      },
      filter: ['==', 'STATUS', 'Projeto'] }

  const PDCDoneLayer = {
          id: 'PDCDoneLayer',
          type: 'line',
          paint: {
            'line-color': "#008080",
            'line-width': 3,
          },
          filter: ['==', 'STATUS', 'Realizada']
        }

  const NotPDC = {
      id: 'NotPDC',
      type: 'line',
      paint: {
        'line-color': "#E02F31",
        'line-width': 1.5,
        'line-opacity':.8, 
//          'line-dasharray': [2,.5],
      },
      filter: ['==', 'STATUS', 'NotPDC']
    }
  const layers = [PDCLayer, PDCDoneLayer, NotPDC]
  
  const cities = data.kms.municipios.map((m, index) => (
    { id: index, 
      name: m.name, 
      km_projected: m.pdc_total, 
      km_completed: m.pdc_feito,
      km_ciclos: m.out_pdc+m.pdc_feito,
      percentil: m.pdc_feito/m.pdc_total,
      ways: m.vias
    })).sort((a,b) => b.percentil >= a.percentil ? 1 : -1)

  const numcards = (data) =>{
    return data.map((d)=>(
        {
            id: d.id,
            label: d.name,
            value: d.percentil*100
        }
    ))
  }


  function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
  function filterByName(jsonObject, name) {return jsonObject.filter(function(jsonObject) {return (jsonObject['name'] == name);})[0];}
  const [filteredCityData, setFilteredCityData] = useState([]);
  const [selectedCity, setCity] = useState(filterByName(cities, "Recife"));
  const changeCity = (id) => {setCity(filterById(cities, id))}
  
  console.log(selectedCity)
  const CityStatistics = {
    title: selectedCity.name,
    subtitle: "Estatísticas Gerais",
    boxes:   [
      {title: "km de estruturas cicloviárias", value: selectedCity.km_ciclos.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1})},
      {title: "km projetados no PDC", value: selectedCity.km_projected.toLocaleString('pt-BR', { minimumFractionDigits: 1,   maximumFractionDigits: 1})},
      {title: "km executados do PDC", value: selectedCity.km_completed.toLocaleString('pt-BR', { minimumFractionDigits: 1,  maximumFractionDigits: 1})},
      {title: "completado do pdc", value: selectedCity.percentil.toLocaleString('pt-BR', { style:'percent',  minimumFractionDigits: 1, maximumFractionDigits: 1})}
    ].filter(e => e)
  }
/**
  useEffect(() => {
    if (selectedCity) {
      const city_structures = cities_datas[selectedCity]
      let segs = utils.group_by(city_structures, "PDC")
      setFilteredCityData(segs)
    } else {
      setFilteredCityData([])
    }
  }, [selectedCity]);

 */
  const columns = React.useMemo(
    () => [
      {
        Header: "Estrutura",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Tipologia prevista",
        accessor: "pdc_tipos",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Extensão prevista (km)",
        accessor: "pdc_kms",
        Cell:  ({ value }) => (value ? <span>{(""+(value).toFixed(2)).replace(".",",")}</span> : <span>{"N/A"}</span> ),
        Filter: false,
      }, 
      {
        Header: "Tipologia executada",
        accessor: "ciclo_tipos",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Extensão executada (km)",
        accessor: "ciclo_kms",
        Cell: ({ value }) =>  (value ? <span>{(""+(value).toFixed(2)).replace(".",",")}</span> : <span>{"N/A"}</span>) ,
        Filter: false,
      }, 
    ],
    []
  );


  return (
    <Layout>
        <SEO title={page_data.title + " | Ameciclo"} />
        <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
        <Breadcrumb label={BreadcrumbConf.label} slug={BreadcrumbConf.slug} routes={BreadcrumbConf.routes}/>
        <StatisticsBox title={statistics.title} subtitle={statistics.subtitle} boxes={statistics.boxes} />
        <ExplanationBox title_1={page_data.ExplanationBoxData.title_1} text_1={page_data.ExplanationBoxData.text_1} title_2={page_data.ExplanationBoxData.title_2} text_2={page_data.ExplanationBoxData.text_2}/>
        <StructureMap map={ciclos} layers={layers}/>
        <NumberCards title={"Estrutura nas cidades"} data={numcards(cities)} changeFunction={changeCity} selected={selectedCity.id} maxDigs={1} /> 
        <StatisticsBox title={CityStatistics.title} subtitle={CityStatistics.subtitle} boxes={CityStatistics.boxes} />
        <Table title={"Estruturas do PDC para " + selectedCity.name} data={selectedCity.ways} columns={columns}/>
        {/** <EvolutionGraph e /> evolução de implantação */}
        <GridSession title={documents.title} grids={documents.grids} />
    </Layout>
  );
};

export default Observatorio;
