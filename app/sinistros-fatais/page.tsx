import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import SinistrosFataisClientSide from "./useclient";
import { DATASUS_SUMMARY_DATA, DATASUS_CITIES_BY_YEAR_DATA, OBSERVATORIO_SINISTROS_PAGE_DATA } from "../../servers";

// Função para buscar os dados da API
const fetchData = async () => {
  // Valores padrão para o caso de falha na API
  let pageData = {
    id: 4,
    title: "Observatório de Sinistros Fatais",
    coverImage: "/images/covers/sinistros-fatais.jpg",
    explanationBoxes: [],
    supportFiles: []
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
    const strapiRes = await fetch(OBSERVATORIO_SINISTROS_PAGE_DATA, {
      cache: "no-cache",
    });
    
    if (strapiRes.ok) {
      const strapiData = await strapiRes.json();
      console.log("Dados do Strapi recebidos");
      
      if (strapiData && strapiData.data && Array.isArray(strapiData.data) && strapiData.data.length > 0) {
        // Como estamos filtrando pelo título na URL, pegamos o primeiro item
        const platformData = strapiData.data[0];
        
        if (platformData) {
          // Verificar se há arquivos de suporte e processá-los corretamente
          const supportFiles = platformData.supportfiles?.map(file => {
            console.log("Processando arquivo:", file.title, "URL:", file.file?.url, "Cover:", file.cover?.url);
            return {
              title: file.title || "Documento",
              description: file.description || "",
              url: file.file?.url || "#",
              src: file.cover?.url || (
                file.type === "legislação" ? "/icons/legislation.svg" : 
                file.type === "relatório" ? "/icons/report.svg" : 
                "/icons/document.svg"
              )
            };
          }) || [];
          
          console.log(`Processados ${supportFiles.length} arquivos de suporte`);
          
          try {
            pageData = {
              id: platformData.id,
              title: platformData.title,
              coverImage: platformData.cover?.url || "/images/covers/sinistros-fatais.jpg",
              explanationBoxes: platformData.explanationbox?.map(box => ({
                title: box.title,
                description: box.text
              })) || [],
              supportFiles: supportFiles
            };
            
            // Verificar se os arquivos de suporte têm URLs válidas
            const validFiles = supportFiles.filter(file => file.url && file.url !== "#");
            console.log(`${validFiles.length} de ${supportFiles.length} arquivos têm URLs válidas`);
            
            // Log detalhado para depuração
            console.log({
              id: platformData.id,
              title: platformData.title,
              coverImageUrl: platformData.cover?.url,
              explanationBoxesCount: platformData.explanationbox?.length || 0,
              supportFilesCount: supportFiles.length
            });
          } catch (error) {
            console.error("Erro ao processar dados do Strapi:", error);
          }
          
          console.log("Cover URL:", platformData.cover?.url);
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