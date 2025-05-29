import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import SinistrosFataisClientSide from "./useclient";
import { DATASUS_SUMMARY_DATA, DATASUS_CITIES_BY_YEAR_DATA } from "../../servers";

// Dados da página
const sinistros_fatais_page_data = {
  title: "Observatório de Sinistros Fatais",
  cover_image_url: "/images/covers/sinistros-fatais.jpg"
};

// Função para buscar os dados da API
const fetchData = async () => {
  try {
    // Buscar resumo geral
    const summaryRes = await fetch(DATASUS_SUMMARY_DATA, {
      cache: "no-cache",
    });
    const summary = await summaryRes.json();

    // Buscar dados por cidade e ano (local de ocorrência por padrão)
    const citiesByYearRes = await fetch(DATASUS_CITIES_BY_YEAR_DATA, {
      cache: "no-cache",
    });
    const citiesByYear = await citiesByYearRes.json();

    return { summary, citiesByYear };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return { 
      summary: { 
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
      },
      citiesByYear: {
        tipo: "Local de Ocorrência",
        anos: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        cidades: []
      }
    };
  }
};

export default async function SinistrosFataisPage() {
  const { summary, citiesByYear } = await fetchData();

  return (
    <>
      <NavCover
        title={sinistros_fatais_page_data.title}
        src={sinistros_fatais_page_data.cover_image_url}
      />
      <Breadcrumb
        label="Observatório de Sinistros Fatais"
        slug="/sinistros-fatais"
        routes={["/", "/sinistros-fatais"]}
      />
      <SinistrosFataisClientSide 
        summaryData={summary} 
        citiesByYearData={citiesByYear} 
      />
    </>
  );
}