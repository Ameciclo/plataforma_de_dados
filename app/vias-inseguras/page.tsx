"use client";

import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { NumberCards } from "../components/NumberCards";
import ViasInsegurasContent from "./useclient";
import {
  IntlNumber1Digit,
  IntlNumberNoDigit,
} from "../../utils";
import {
  SINISTROS_STREETS_SUMMARY_DATA,
} from "../../servers";

// Dados da página
const viasInseguras_page_data = {
  title: "Vias Inseguras",
  cover_image_url: "/images/covers/vias-inseguras.jpg",
};

export default function ViasInsegurasPage() {
  const [streets, setStreets] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const streetsRes = await fetch(SINISTROS_STREETS_SUMMARY_DATA, {
          cache: "no-cache",
        });
        const streetsData = await streetsRes.json();
        setStreets(streetsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    
    fetchData();
  }, []);

  if (streets.length === 0) {
    return <div className="container mx-auto p-8 text-center">Carregando dados...</div>;
  }

  return (
    <>
      <NavCover
        title={viasInseguras_page_data.title}
        src={viasInseguras_page_data.cover_image_url}
      />
      <Breadcrumb
        label="Vias Inseguras"
        slug="/vias-inseguras"
        routes={["/", "/vias-inseguras"]}
      />
      <StatisticsBox
        title="Vias Inseguras"
        subtitle="Dados da CTTU - Recife"
        boxes={[
          {
            title: "Total de Vias Analisadas",
            value: IntlNumberNoDigit(streets.length),
            unit: "",
          },
          {
            title: "Total de Sinistros",
            value: IntlNumberNoDigit(streets.reduce((sum, street) => sum + (street.totalSinistros || 0), 0)),
            unit: "",
          },
          {
            title: "Sinistros Fatais",
            value: IntlNumberNoDigit(streets.reduce((sum, street) => sum + (street.totalFatais || 0), 0)),
            unit: "",
          },
          {
            title: "Média de Sinistros por Via",
            value: IntlNumber1Digit(streets.reduce((sum, street) => sum + (street.totalSinistros || 0), 0) / streets.length),
            unit: "",
          },
        ]}
      />
      <ExplanationBoxes
        boxes={[
          {
            title: "O que é?",
            description:
              "Análise das vias com maior incidência de sinistros de trânsito na cidade.",
          },
          {
            title: "Que dados são esses?",
            description: "Dados de sinistros por via fornecidos pela CTTU (Companhia de Trânsito e Transporte Urbano).",
          },
          {
            title: "Como interpretar?",
            description: "As vias são classificadas pelo número total de sinistros registrados. Cores mais intensas no mapa indicam maior concentração de ocorrências.",
          },
        ]}
      />
      
      {/* Top 5 vias mais perigosas */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Vias Mais Perigosas
        </h2>
        <NumberCards
          cards={streets
            .sort((a, b) => b.totalSinistros - a.totalSinistros)
            .slice(0, 5)
            .map(street => ({
              id: street.streetId,
              title: street.name,
              value: street.totalSinistros,
              unit: "sinistros",
            }))}
          data={{
            title: "",
            filters: [],
          }}
          options={{
            type: "default",
          }}
        />
      </div>
      
      {/* Componente client-side com mapa e seleção por ano */}
      <ViasInsegurasContent streets={streets} />
    </>
  );
}