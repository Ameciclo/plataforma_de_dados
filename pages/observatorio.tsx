import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";
import ExplanationBox from "../components/ExplanationBox";

import React, { useState, useEffect } from "react";
import { DocumentCard } from "../components/DocumentCard";

const Observatorio = ({ documents }) => {

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

  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [docType, setDocType] = useState("");

  useEffect(() => {
    if (docType) {
      setFilteredDocuments(
        documents.filter((documents) => {
          return documents.type === docType;
        })
      );
    } else {
      setFilteredDocuments(documents);
    }
  }, [docType, documents]);

  return (
    <Layout>
      <SEO title={page_data.title + " | Ameciclo"} />
      <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
      <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/>
      <ExplanationBox title_1={page_data.ExplanationBox.title_1} text_1={page_data.ExplanationBox.text_1} title_2={page_data.ExplanationBox.title_2} text_2={page_data.ExplanationBox.text_2}/>

    </Layout>
  );
};



export default Observatorio;
