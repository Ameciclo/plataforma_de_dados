"use client";
import React, { useState, useEffect } from "react";
import { NumberCards } from "../components/NumberCards";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { InfoCards } from "../components/InfoCards";
import LineChart from "../components/Charts/LineChart";
import { YearSelector } from "../components/YearSelector";
import { LocalTypeSelector } from "../components/LocalTypeSelector";
import { IntlNumberNoDigit, IntlPercentil } from "../../utils";
import {
  getGeneralStatistics,
  getCityCardsByYear,
  getYearlyChartData,
  getModoTransporteCards,
} from "./configuration";
import {
  DATASUS_CITIES_BY_YEAR_DATA,
  DATASUS_FILTROS_DATA,
} from "../../servers";

export default function SinistrosFataisClientSide({
  summaryData,
  citiesByYearData: initialCitiesByYearData,
  pageData,
}) {
  const [tipoLocal, setTipoLocal] = useState("ocorrencia");
  const [selectedYear, setSelectedYear] = useState(2023); // Pré-selecionar 2023
  const [selectedCity, setSelectedCity] = useState(null); // Mostrar RMR por padrão no gráfico
  const [selectedCardCity, setSelectedCardCity] = useState(2611606); // ID do Recife para os cards
  const [citiesByYearData, setCitiesByYearData] = useState(
    initialCitiesByYearData
  );
  const [showAllCities, setShowAllCities] = useState(false);
  const [modoTransporteData, setModoTransporteData] = useState(null);
  const [isLoadingModoTransporte, setIsLoadingModoTransporte] = useState(false);

  // Determinar o último ano disponível nos dados
  useEffect(() => {
    if (
      citiesByYearData &&
      citiesByYearData.anos &&
      citiesByYearData.anos.length > 0
    ) {
      // Verificar se 2023 está disponível, caso contrário usar o último ano
      if (citiesByYearData.anos.includes(2023)) {
        setSelectedYear(2023);
      } else {
        setSelectedYear(
          citiesByYearData.anos[citiesByYearData.anos.length - 1]
        );
      }
    }
  }, [citiesByYearData]);

  // Buscar dados quando o tipo de local mudar
  useEffect(() => {
    const fetchCitiesByYearData = async () => {
      try {
        const response = await fetch(
          `${DATASUS_CITIES_BY_YEAR_DATA}?tipo=${tipoLocal}`
        );
        const data = await response.json();
        setCitiesByYearData(data);
      } catch (error) {
        console.error("Erro ao buscar dados por tipo de local:", error);
      }
    };

    fetchCitiesByYearData();
  }, [tipoLocal]);

  // Buscar dados de modo de transporte quando a cidade, tipo de local ou ano mudar
  useEffect(() => {
    const fetchModoTransporteData = async () => {
      if (!selectedCardCity || !selectedYear) return;

      setIsLoadingModoTransporte(true);
      try {
        const url = `${DATASUS_FILTROS_DATA}?municipio=${selectedCardCity}&tipoLocal=${tipoLocal}&anoInicio=${selectedYear}&anoFim=${selectedYear}`;
        const response = await fetch(url);
        const data = await response.json();

        // Verificar se os dados são válidos
        if (
          data &&
          data.resumo &&
          ((data.resumo.porModoTransporte &&
            Object.keys(data.resumo.porModoTransporte).length > 0) ||
            (data.resumo.porMeioTransporte &&
              Object.keys(data.resumo.porMeioTransporte).length > 0) ||
            (data.resumo.porCID && Object.keys(data.resumo.porCID).length > 0))
        ) {
          setModoTransporteData(data);
          console.log(data);
        } else {
          // Se não há dados válidos, definir como null para não mostrar a seção
          setModoTransporteData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de modo de transporte:", error);
        setModoTransporteData(null);
      } finally {
        setIsLoadingModoTransporte(false);
      }
    };

    fetchModoTransporteData();
  }, [selectedCardCity, tipoLocal, selectedYear]);

  // Alternar entre local de ocorrência e residência
  const handleTipoLocalChange = (tipo) => {
    setTipoLocal(tipo);
  };

  // Selecionar cidade
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setSelectedCardCity(cityId);
    setShowAllCities(false);
  };

  // Selecionar ano
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Alternar entre mostrar todas as cidades ou apenas RMR
  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
  };

  // Caixas de explicação padrão caso não venham do Strapi
  const defaultExplanationBoxes = [
    {
      title: "O que são esses dados?",
      description:
        "Dados de mortalidade no trânsito extraídos do Sistema de Informações sobre Mortalidade (SIM) do DATASUS, considerando os códigos CID-10 de V01 a V89 (acidentes de transporte terrestre).",
    },
    {
      title: "Local de Ocorrência vs. Residência",
      description:
        "Local de Ocorrência indica onde o sinistro aconteceu, enquanto Local de Residência mostra onde a vítima morava. Essa distinção é importante para análises de políticas públicas e planejamento urbano.",
    },
  ];

  // Obter o nome da cidade selecionada
  const selectedCityName = selectedCardCity
    ? citiesByYearData?.cidades?.find((c) => c.id === selectedCardCity)?.nome ||
      "Cidade selecionada"
    : "RMR";

  // Processar dados de modo de transporte
  const modoTransporteProcessado = modoTransporteData
    ? getModoTransporteCards(modoTransporteData)
    : null;

  return (
    <>
      {/* Estatísticas gerais */}
      <StatisticsBox
        title="Mortes no Trânsito"
        subtitle={`Dados do DATASUS - RMR (por ${
          tipoLocal === "ocorrencia"
            ? "Local de Ocorrência"
            : "Local de Residência"
        })`}
        boxes={getGeneralStatistics(summaryData, tipoLocal)}
      />

      {/* Seletor de tipo de local (movido para depois das estatísticas) */}
      <LocalTypeSelector
        selectedType={tipoLocal}
        onChange={handleTipoLocalChange}
      />

      {/* Caixas de explicação */}
      <ExplanationBoxes
        boxes={
          pageData.explanationBoxes && pageData.explanationBoxes.length > 0
            ? pageData.explanationBoxes
            : defaultExplanationBoxes
        }
      />

      {/* Gráfico de mortes por ano */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Evolução das Mortes no Trânsito
        </h2>

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
          title={`Mortes por Ano na RMR (${
            tipoLocal === "ocorrencia"
              ? "Local de Ocorrência"
              : "Local de Residência"
          })`}
          xAxisTitle="Ano"
          yAxisTitle="Número de Mortes"
          series={getYearlyChartData(
            citiesByYearData,
            selectedCity,
            showAllCities
          )}
        />
      </div>

      {/* Seletor de ano e cards de cidades */}
      <div className="mx-auto container my-12">
        {/* Cards de cidades */}
        <NumberCards
          cards={getCityCardsByYear(citiesByYearData, selectedYear, tipoLocal)}
          data={{
            title: `Mortes por Cidade em ${selectedYear || ""} (${
              tipoLocal === "ocorrencia"
                ? "Local de Ocorrência"
                : "Local de Residência"
            })`,
            filters: [],
          }}
          selected={selectedCardCity}
          options={{
            type: "default",
            changeFunction: (cityId) => {
              setSelectedCardCity(cityId);
              setSelectedCity(cityId);
              setShowAllCities(false);
            },
            onClickFnc: () => {},
          }}
        />
      </div>
      {/* Timeline/Seletor de ano */}
      {citiesByYearData && citiesByYearData.anos && (
        <YearSelector
          years={citiesByYearData.anos}
          selectedYear={selectedYear}
          onChange={handleYearChange}
        />
      )}
      {/* Mortes por modo de transporte - só exibe se houver dados */}
      {selectedCardCity &&
        selectedYear &&
        modoTransporteData &&
        modoTransporteProcessado &&
        modoTransporteProcessado.cards.length > 0 && (
          <div className="mx-auto container my-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Mortes por Modo de Transporte em {selectedCityName} -{" "}
              {selectedYear}
              <div className="text-xl font-normal mt-2">
                (
                {tipoLocal === "ocorrencia"
                  ? "Local de Ocorrência"
                  : "Local de Residência"}
                )
              </div>
            </h2>

            <InfoCards cards={modoTransporteProcessado.cards} />
            {modoTransporteProcessado.infoNaoIdentificados &&
              modoTransporteProcessado.infoNaoIdentificados.texto && (
                <div className="text-center text-gray-600 mt-4">
                  {modoTransporteProcessado.infoNaoIdentificados.texto}
                </div>
              )}
          </div>
        )}

      {/* Exibe mensagem de carregamento apenas durante o carregamento */}
      {selectedCardCity && selectedYear && isLoadingModoTransporte && (
        <div className="mx-auto container my-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            Mortes por Modo de Transporte em {selectedCityName} - {selectedYear}
          </h2>
          <div className="text-center py-8">Carregando dados...</div>
        </div>
      )}
    </>
  );
}
