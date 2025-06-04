"use client";

import React, { useState, useEffect } from "react";
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
  PLATAFORMAS_PAGE_DATA
} from "../../servers";

export default function ViasInsegurasPage() {
  const [streets, setStreets] = useState([]);
  const [pageData, setPageData] = useState({
    title: "Vias Inseguras",
    coverImage: "/images/covers/vias-inseguras.jpg",
    explanationBoxes: [
      {
        title: "O que é?",
        description: "Análise das vias com maior incidência de sinistros de trânsito na cidade."
      },
      {
        title: "Que dados são esses?",
        description: "Dados de sinistros por via fornecidos pela CTTU (Companhia de Trânsito e Transporte Urbano)."
      },
      {
        title: "Como interpretar?",
        description: "As vias são classificadas pelo número total de sinistros registrados. Cores mais intensas no mapa indicam maior concentração de ocorrências."
      }
    ],
    supportFiles: []
  });
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar dados do Strapi
        const strapiRes = await fetch(PLATAFORMAS_PAGE_DATA, {
          cache: "no-cache",
        });
        
        if (strapiRes.ok) {
          const strapiData = await strapiRes.json();
          
          if (strapiData && strapiData.data && Array.isArray(strapiData.data)) {
            // Encontrar os dados da plataforma de vias inseguras
            const platformData = strapiData.data.find(item => 
              item.attributes && item.attributes.title === "Observatório de Vias Inseguras"
            );
            
            if (platformData) {
              setPageData({
                title: platformData.attributes.title,
                coverImage: platformData.attributes.cover?.data?.attributes?.url || "/images/covers/vias-inseguras.jpg",
                explanationBoxes: platformData.attributes.explanationbox?.map(box => ({
                  title: box.title,
                  description: box.text
                })) || pageData.explanationBoxes,
                supportFiles: platformData.attributes.supportfiles?.map(file => ({
                  title: file.title,
                  description: file.description || "",
                  url: file.url || "#",
                  src: file.type === "legislação" ? "/icons/legislation.svg" : 
                       file.type === "relatório" ? "/icons/report.svg" : 
                       "/icons/document.svg"
                })) || []
              });
            }
          }
        }

        // Buscar dados das ruas
        const streetsRes = await fetch(SINISTROS_STREETS_SUMMARY_DATA, {
          cache: "no-cache",
        });
        
        if (streetsRes.ok) {
          const streetsData = await streetsRes.json();
          setStreets(streetsData);
        }
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
        title={pageData.title}
        src={pageData.coverImage}
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
        boxes={pageData.explanationBoxes}
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
      <ViasInsegurasContent streets={streets} supportFiles={pageData.supportFiles} />
    </>
  );
}