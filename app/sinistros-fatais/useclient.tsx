"use client";
import React, { useState, useEffect } from "react";
import { NumberCards } from "../components/NumberCards";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import LineChart from "../components/Charts/LineChart";
import { YearSelector } from "../components/YearSelector";
import { LocalTypeSelector } from "../components/LocalTypeSelector";
import { IntlNumberNoDigit, IntlPercentil } from "../../utils";
import { getGeneralStatistics, getCityCardsByYear, getYearlyChartData } from "./configuration";
import { DATASUS_CITIES_BY_YEAR_DATA } from "../../servers";

export default function SinistrosFataisClientSide({ summaryData, citiesByYearData: initialCitiesByYearData, pageData }) {
  const [tipoLocal, setTipoLocal] = useState("ocorrencia");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citiesByYearData, setCitiesByYearData] = useState(initialCitiesByYearData);
  const [showAllCities, setShowAllCities] = useState(false);
  
  // Determinar o último ano disponível nos dados
  useEffect(() => {
    if (citiesByYearData && citiesByYearData.anos && citiesByYearData.anos.length > 0) {
      setSelectedYear(citiesByYearData.anos[citiesByYearData.anos.length - 1]);
    }
  }, [citiesByYearData]);

  // Buscar dados quando o tipo de local mudar
  useEffect(() => {
    const fetchCitiesByYearData = async () => {
      try {
        const response = await fetch(`${DATASUS_CITIES_BY_YEAR_DATA}?tipo=${tipoLocal}`);
        const data = await response.json();
        setCitiesByYearData(data);
      } catch (error) {
        console.error("Erro ao buscar dados por tipo de local:", error);
      }
    };

    fetchCitiesByYearData();
  }, [tipoLocal]);

  // Alternar entre local de ocorrência e residência
  const handleTipoLocalChange = (tipo) => {
    setTipoLocal(tipo);
  };

  // Selecionar cidade
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId === selectedCity ? null : cityId);
    setShowAllCities(false);
  };

  // Selecionar ano
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Alternar entre mostrar todas as cidades ou apenas RMR
  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
    setSelectedCity(null);
  };

  // Caixas de explicação padrão caso não venham do Strapi
  const defaultExplanationBoxes = [
    {
      title: "O que são esses dados?",
      description: "Dados de mortalidade no trânsito extraídos do Sistema de Informações sobre Mortalidade (SIM) do DATASUS, considerando os códigos CID-10 de V01 a V89 (acidentes de transporte terrestre)."
    },
    {
      title: "Local de Ocorrência vs. Residência",
      description: "Local de Ocorrência indica onde o sinistro aconteceu, enquanto Local de Residência mostra onde a vítima morava. Essa distinção é importante para análises de políticas públicas e planejamento urbano."
    }
  ];

  return (
    <>
      {/* Seletor de tipo de local */}
      <LocalTypeSelector 
        selectedType={tipoLocal} 
        onChange={handleTipoLocalChange} 
      />

      {/* Estatísticas gerais */}
      <StatisticsBox
        title="Mortes no Trânsito"
        subtitle={`Dados do DATASUS - RMR (por ${tipoLocal === "ocorrencia" ? "Local de Ocorrência" : "Local de Residência"})`}
        boxes={getGeneralStatistics(summaryData, tipoLocal)}
      />

      {/* Caixas de explicação */}
      <ExplanationBoxes
        boxes={pageData.explanationBoxes && pageData.explanationBoxes.length > 0 
          ? pageData.explanationBoxes 
          : defaultExplanationBoxes}
      />

      {/* Gráfico de mortes por ano */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-4">Evolução das Mortes no Trânsito</h2>
        
        {/* Botão para alternar entre mostrar todas as cidades ou apenas RMR */}
        <div className="flex justify-center mb-4">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              !showAllCities && !selectedCity
                ? "bg-ameciclo text-white" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => {
              setShowAllCities(false);
              setSelectedCity(null);
            }}
          >
            Mostrar RMR
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ml-4 ${
              showAllCities 
                ? "bg-ameciclo text-white" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={toggleShowAllCities}
          >
            Mostrar Todas as Cidades
          </button>
        </div>
        
        <LineChart 
          title={`Mortes por Ano na RMR (${tipoLocal === "ocorrencia" ? "Local de Ocorrência" : "Local de Residência"})`}
          xAxisTitle="Ano"
          yAxisTitle="Número de Mortes"
          series={getYearlyChartData(citiesByYearData, selectedCity, showAllCities)}
        />
      </div>

      {/* Seletor de ano e cards de cidades */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-4">Mortes por Cidade</h2>
        
        {/* Timeline/Seletor de ano */}
        {citiesByYearData && citiesByYearData.anos && (
          <YearSelector 
            years={citiesByYearData.anos} 
            selectedYear={selectedYear} 
            onChange={handleYearChange} 
          />
        )}
        
        {/* Cards de cidades */}
        <NumberCards
          cards={getCityCardsByYear(citiesByYearData, selectedYear, tipoLocal)}
          data={{
            title: `Mortes por Cidade em ${selectedYear || ""} (${tipoLocal === "ocorrencia" ? "Local de Ocorrência" : "Local de Residência"})`,
            filters: []
          }}
          selected={selectedCity}
          options={{
            type: "default",
            changeFunction: handleCityChange,
            onClickFnc: () => {}
          }}
        />
      </div>
    </>
  );
}