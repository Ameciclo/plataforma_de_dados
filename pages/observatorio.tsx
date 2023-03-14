import Layout from "../components/OldLayout";
import ExplanationBox from "../components/ExplanationBox";
import StatisticsBox from "../components/StatisticsBox";
import StructureMap from "../components/StructureMap";
import NumberCards from "../components/NumberCards";
import Table from "../components/Table";
import {ColumnFilter, NumberRangeColumnFilter, SelectColumnFilter} from "../components/TableFilters";
//import EvalolutionGraph from 
import GridSession from "../components/GridSession";

import React, { useEffect, useState, useRef } from "react";
import utils from "../utils"
import data from "../pdc/observatorio-data.json"
//import calcs from "../pdc/calcs"
//const data = calcs()
//////
/// esses consts irão para o BD
//////

const documents = {
title: "Documentos e links importantes para o PDC.",
grids: [
  {title: "Plano Diretor Cicloviário da RMR - vol 1", icon: "", url: "https://drive.google.com/file/d/0BxR5Ri6g5X_ZaldIY2tZS1pYRUU/view?usp=share_link&resourcekey=0-qVT9rlnlNOAdE-cs1-fn9A", text: "Documento lançado em 2014, parte principal que contém o estudo."},
  {title: "Plano Diretor Cicloviário da RMR - vol 2", icon: "", url: "https://drive.google.com/file/d/0BxR5Ri6g5X_ZaVlpckJQVS1CTlU/view?usp=share_link&resourcekey=0-PjUIH1c2ObtbdTUGuLn28g", text: "Parte 2 do documento, apenas com os mapas."},
  {title: "Pasta do PDC", icon: "", url: "https://pdc.ameciclo.org", text: "Pasta em nosso drive com o plano, o processo de construção e a nossa ação civil-pública para a implantação."},
  {title: "Ciclomapa", icon: "", url: "https://ciclomapa.org.br/", text: "Mapa colaborativo que monitora as ciclovias de diversas cidades, inclusive a nossa."},
  //{title: "Ações de desaniversário", icon: "", url: "", text: "Compilado de nossas ações de desaniversário, quando comemoramos a infeliz não execução do PDC."},
  {title: "O que é o PDC?", icon: "", url: "https://www.youtube.com/watch?v=LEQlGK-FWnI", text: "Episódio de nosso podcast sobre o Plano Diretor Cicloviário."},
  ]
}

  const page_data = {
    title: "Observatório Cicloviário",
    cover_image_url: "/observatorio.png",
    ExplanationBoxData: {
      title_1: "O que é?",
      text_1: `O Observatório Cicloviário é uma central de monitoramento que acompanha a evolução da estrutura cicloviária da Região Metropolitana do Recife, comparando a estrutura projetada pelo Plano Diretor Cicloviário frente à estrutura executada.
      Para facilitar a demonstração dos dados, considera-se EXECUTADA o local onde havia previsão de estrutura e foi implatado algo lá, não necessariamente da mesma tipologia.`,
      title_2: "Por que o PDC?",
      text_2: `Em 4 de fevereiro de 2014 o Governo do Estado de Pernambuco, junto com as prefeituras da Região Metropolitana do Recife, lançou o Plano Diretor Cicloviário (PDC). 
      O Plano integra os diversos municípios da RMR com uma ampla rede cicloviária, priorizando as principais avenidas e pontos de conexão das cidades. Sua construção teve participação não só dos entes públicos, mas também da sociedade civil, como nós, da Ameciclo. 
      Com metas estipuladas em fases,  o PDC precisa ser concluído em 2024.`} 
  }

const Observatorio = ({ }) => {
  const ciclos = data.map

  const BreadcrumbConf = {
      label:"Observatório",
      slug:"/observatorio",
      routes:["/", "/observatorio"],
    }

  const statistics = {
    title: "Execução Cicloviária",
    subtitle: "da Região Metropolitana do Recife",
    boxes: [
        {title: "estrutura cicloviárias", unit: "km", value: (data.kms.pdc_feito + data.kms.out_pdc).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1})},
        {title: "projetada no plano cicloviário", unit: "km", value: data.kms.pdc_total.toLocaleString('pt-BR', { minimumFractionDigits: 1,   maximumFractionDigits: 1})},
        {title: "implantados no plano cicloviário", unit: "km", value: data.kms.pdc_feito.toLocaleString('pt-BR', { minimumFractionDigits: 1,  maximumFractionDigits: 1})},
        {title: "cobertos do plano cicloviário", value: (data.kms.pdc_feito/data.kms.pdc_total).toLocaleString('pt-BR', { style:'percent',  minimumFractionDigits: 1, maximumFractionDigits: 1})}
    ]
  } 
      
  const PDCLayer = {
      id: 'Não executado no PDC',
      type: 'line',
      paint: {
        'line-color': "#000000",
        'line-opacity':0.5, 
        'line-width': 2,
      },
      filter: ['==', 'STATUS', 'Projeto'] }

  const PDCDoneLayer = {
          id: 'Executados dentro do PDC',
          type: 'line',
          paint: {
            'line-color': "#008080",
            'line-width': 3,
          },
          filter: ['==', 'STATUS', 'Realizada']
        }

  const NotPDC = {
      id: 'Executados fora do PDC',
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
  
  const cities = data.kms.municipios.map((m : any, index) => (
    { id: index, 
      name: m.name, 
      km_projected: m.pdc_total, 
      km_completed: m.pdc_feito,
      km_ciclos: m.out_pdc+m.pdc_feito,
      percentil: (m.pdc_feito/m.pdc_total)*100,
      ways: m.vias
    }))

  const numcards = (data, order) =>{
    const units = {
     "percentil":"%",
      "km_completed":"km",
      "km_projected":"km", 
      "km_ciclos":"km"      
    }
    return data.map((d : any)=>(
        {
            id: d.id,
            label: d.name,
            unit: units[order],
            value: d[order]
        }
    )).sort((a : any, b: any) => b.value >= a.value ? 1 : -1)
  }

  const [selectedCity, setCity] = useState(utils.filterByName(cities, "Recife"));
  const [city_sort, sortCity] = useState("km_completed");

  const changeCity = (id) => {setCity(utils.filterById(cities, id))}

  const sort_cities =  [
      { 
        title: "Ordene as cidades: ",
        value: city_sort,
        name: "city-sort",
        onChange: (e) => sortCity(e.target.value), 
        onBlur: (e) => e,
        items: [
          {value:"percentil", label: "cobertos do plano cicloviário"}, 
          {value:"km_completed", label: "implantados no plano cicloviário"}, 
          {value:"km_projected", label: "projetada no plano cicloviário"}, 
          {value:"km_ciclos", label: "estrutura cicloviárias"}]
      }]

  const CityStatistics = {
    title: selectedCity.name,
    subtitle: "Estatísticas Gerais",
    boxes:   [
      {title: "estrutura cicloviárias", unit: "km",value: selectedCity.km_ciclos.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1})},
      {title: "projetada no plano cicloviário", unit: "km", value: selectedCity.km_projected.toLocaleString('pt-BR', { minimumFractionDigits: 1,   maximumFractionDigits: 1})},
      {title: "implantados no plano cicloviário", unit: "km", value: selectedCity.km_completed.toLocaleString('pt-BR', { minimumFractionDigits: 1,  maximumFractionDigits: 1})},
      {title: "cobertos do plano cicloviário", value: (selectedCity.percentil/100).toLocaleString('pt-BR', { style:'percent',  minimumFractionDigits: 1, maximumFractionDigits: 1})}
    ].filter(e => e)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "(COD) Nome da Via",
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
  const ref = useRef(null)
  const handleClick = () => ref.current?.scrollIntoView({behavior: 'smooth', block: "center"})
 
  //const uri = utils.exportToJsonFile(calcs(), "PDC")
    //   <Link href={uri} target={"_blank "}>BAIXAR</Link>

  return (
    <Layout pageTitle={page_data.title} coverUrl={page_data.cover_image_url} breadcrumbConf={BreadcrumbConf}>
        <StatisticsBox title={statistics.title} subtitle={statistics.subtitle} boxes={statistics.boxes} />
        <ExplanationBox title_1={page_data.ExplanationBoxData.title_1} text_1={page_data.ExplanationBoxData.text_1} title_2={page_data.ExplanationBoxData.title_2} text_2={page_data.ExplanationBoxData.text_2}/>
        <StructureMap map={ciclos} layers={layers}/>
        <NumberCards title={"Estrutura nas cidades"} data={numcards(cities, city_sort)} changeFunction={changeCity} onClickFnc={handleClick} selected={selectedCity.id} maxDigs={1} filters={sort_cities}/> 
        <div ref={ref}>
          <StatisticsBox  title={CityStatistics.title} subtitle={CityStatistics.subtitle} boxes={CityStatistics.boxes} />
        </div>
        <Table title={"Estruturas do PDC para " + selectedCity.name} data={selectedCity.ways} columns={columns}/>
        {/** <EvolutionGraph e /> evolução de implantação */}
        <GridSession title={documents.title} grids={documents.grids} />
    </Layout>
  );
};

export default Observatorio;
