import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import SinistrosFataisClientSide from "./useclient";
import { DATASUS_SUMMARY_DATA, DATASUS_CITIES_BY_YEAR_DATA, PLATAFORMAS_PAGE_DATA } from "../../servers";

// Função para buscar os dados da API
const fetchData = async () => {
  // Valores padrão para o caso de falha na API
  let pageData = {
    id: 4,
    title: "Observatório de Sinistros Fatais",
    coverImage: "/images/covers/sinistros-fatais.jpg",
    explanationBoxes: []
  };
  
  let summary = { 
    porLocalOcorrencia: {
      totalSinistrosUltimos10Anos: 0,
      totalUltimoAno: 0,
      ultimoAno: 2022,
      crescimentoRelacaoAnoAnterior: 0,
      anoMaisViolento: { ano: 2019, total: 0 },
      dadosPorAno: []
    },
    porLocalResidencia: {
      totalSinistrosUltimos10Anos: 0,
      totalUltimoAno: 0,
      ultimoAno: 2022,
      crescimentoRelacaoAnoAnterior: 0,
      anoMaisViolento: { ano: 2019, total: 0 },
      dadosPorAno: []
    }
  };
  
  let citiesByYear = {
    tipo: "Local de Ocorrência",
    anos: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    cidades: []
  };

  try {
    // Buscar dados do Strapi
    const strapiRes = await fetch(PLATAFORMAS_PAGE_DATA, {
      cache: "no-cache",
    });
    
    if (strapiRes.ok) {
      const strapiData = await strapiRes.json();
      
      if (strapiData && strapiData.data && Array.isArray(strapiData.data)) {
        // Encontrar os dados da plataforma de sinistros fatais
        const platformData = strapiData.data.find(item => item.title === "Observatório de Sinistros Fatais");
        
        if (platformData) {
          pageData = {
            id: platformData.id,
            title: platformData.title,
            coverImage: platformData.cover?.url || "/images/covers/sinistros-fatais.jpg",
            explanationBoxes: platformData.explanationbox?.map(box => ({
              title: box.title,
              description: box.text
            })) || []
          };
        }
      }
    }

    // Buscar resumo geral
    const summaryRes = await fetch(DATASUS_SUMMARY_DATA, {
      cache: "no-cache",
    });
    
    if (summaryRes.ok) {
      summary = await summaryRes.json();
    }

    // Buscar dados por cidade e ano (local de ocorrência por padrão)
    const citiesByYearRes = await fetch(DATASUS_CITIES_BY_YEAR_DATA, {
      cache: "no-cache",
    });
    
    if (citiesByYearRes.ok) {
      citiesByYear = await citiesByYearRes.json();
    }

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }

  return { summary, citiesByYear, pageData };
};

export default async function SinistrosFataisPage() {
  const { summary, citiesByYear, pageData } = await fetchData();
  console.log("PAGE", pageData);
  return (
    <>
      <NavCover
        title={pageData.title}
        src={pageData.coverImage}
      />
      <Breadcrumb
        label="Observatório de Sinistros Fatais"
        slug="/sinistros-fatais"
        routes={["/", "/sinistros-fatais"]}
      />
      <SinistrosFataisClientSide 
        summaryData={summary} 
        citiesByYearData={citiesByYear}
        pageData={pageData}
      />
    </>
  );
}