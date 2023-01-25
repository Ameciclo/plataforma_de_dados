import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";
import ExplanationBox from "../components/ExplanationBox";
import StatisticsBox from "../components/StatisticsBox";
import NumberCards from "../components/NumberCards";
import Maps from "../components/Maps";
//import EvalolutionGraph from 
//import ObservatorioTable from
import GridSession from "../components/GridSession";

import React, { useEffect, useState } from "react";


const Observatorio = ({ }) => {

  const page_data = {
    title: "Observatório Cicloviário",
    cover_image_url: "",
    Breadcrumb: {
      label:"Observatório",
      slug:"/observatorio",
      routes:["/", "/observatorio"],
    },
    ExplanationBox: {
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



  const statistics = {
    title: "Execução Cicloviária RMR",
    subtitle: "",
    boxes: [
        {title: "km projetados", value: "600"},
        {title: "km executados", value: "200"},
        {title: "completado", value: "18%"},
        {title: "cidade mais avançada", value: "Recife"}
    ]

  }

  const cities = [
    {id: 0, name: "Recife", km_projected: 250, km_completed: 70.3623, percentil: 0.2},
    {id: 1, name: "Jaboatão", km_projected: 250, km_completed: 54.21, percentil: 0.2},
    {id: 2, name: "Olinda", km_projected: 250, km_completed: 10.2, percentil: 0.2},
    {id: 3, name: "Paulista", km_projected: 250, km_completed: 70, percentil: 0.2},
    {id: 4, name: "Cabo de Santo Agostinho", km_projected: 250, km_completed: 70, percentil: 0.2},
    {id: 5, name: "Itamaracá", km_projected: 250, km_completed: 70, percentil: 0.2}
  ]

  const documents = {
    title: "Documentos e links importantes para o PDC.",
    grids: [
      {title: "Plano Diretor Cicloviário da RMR - vol 1", icon: "", url: "https://drive.google.com/uc?export=download&id=14D_Ly5GlX9toMKIy79Lsg4TcTQwI1vJP", text: "Planilha que faz as contagens de fluxos e características de ciclistas"},
      {title: "Plano Diretor Cicloviário da RMR - vol 2", icon: "", url: "https://drive.google.com/uc?export=download&id=1hEP6Dlqf6677LpCdnSyldAzoGTTrmGNT", text: "Planilha com os dados qualitativos para auxiliar na contagem."},
      {title: "Ciclomapa", icon: "", url: "https://docs.google.com/spreadsheets/d/1KZUXJ_GkcEnu-ZBgEKkIMq2yRNCI0nRK7dlz2O9QqVs/edit#gid=2030770011", text: "Planilha para compilar todos os dados e chegar às conclusões."},
      {title: "Ações de desaniversário", icon: "", url: "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing", text: "Relatório modelo para cada contagem de ciclistas."},
      {title: "Ações de desaniversário", icon: "", url: "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing", text: "Relatório modelo para cada contagem de ciclistas."},
      {title: "Ações de desaniversário", icon: "", url: "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing", text: "Relatório modelo para cada contagem de ciclistas."},
     ]
  }

  const numcards = (data) =>{
    return data.map((d)=>(
        {
            id: d.id,
            label: d.name,
            value: d.km_completed
        }
    ))
  }

    function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
    function filterByName(jsonObject, name) {return jsonObject.filter(function(jsonObject) {return (jsonObject['name'] == name);})[0];}
    const [selectedCity, setCity] = useState(filterByName(cities, "Recife"));
    const changeCity = (id) => {setCity(filterById(cities, id))}

  return (
    <Layout>
        <SEO title={page_data.title + " | Ameciclo"} />
        <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
        <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/>
        <StatisticsBox title={statistics.title} subtitle={statistics.subtitle} boxes={statistics.boxes} />
        <ExplanationBox title_1={page_data.ExplanationBox.title_1} text_1={page_data.ExplanationBox.text_1} title_2={page_data.ExplanationBox.title_2} text_2={page_data.ExplanationBox.text_2}/>
        <NumberCards title={"Estrutura nas cidades"} data={numcards(cities)} changeFunction={changeCity} selected={selectedCity.id} /> 
        <Maps />
        {/** <EvolutionGraph e /> evolução de implantação */}
        {/** <ObservatorioTable /> tabela de estruturas executadas, km e tipologia projetada e km e tipologia executados*/}
        <GridSession title={documents.title} grids={documents.grids} />
    </Layout>
  );
};

export default Observatorio;
