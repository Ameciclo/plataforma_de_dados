"use client";
import React, { useState, useEffect } from "react";
import { NumberCards } from "../components/NumberCards";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { InfoCards } from "../components/InfoCards";
import { SelectableInfoCards } from "../components/SelectableInfoCards";
import LineChart from "../components/Charts/LineChart";
import { YearSelector } from "../components/YearSelector";
import { LocalTypeSelector } from "../components/LocalTypeSelector";
import { IntlNumberNoDigit, IntlPercentil } from "../../utils";
import {
  getGeneralStatistics,
  getCityCardsByYear,
  getYearlyChartData,
  getModoTransporteCards,
  getPerfilSocioeconomico,
} from "./configuration";
import { CardsSession } from "../components/CardsSession";
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

  // Estado para o modo de transporte selecionado
  const [selectedModoTransporte, setSelectedModoTransporte] = useState(null);

  // Estado para o modo de transporte do seletor
  const [seletorModoTransporte, setSeletorModoTransporte] = useState(null);

  // Obter perfil socioeconômico (usando o seletor ou o card selecionado)
  const modoTransporteAtivo = seletorModoTransporte || selectedModoTransporte;
  const perfilSocioeconomico = modoTransporteData
    ? getPerfilSocioeconomico(modoTransporteData, modoTransporteAtivo)
    : null;

  // Função para alternar a seleção do modo de transporte nos cards
  const handleModoTransporteClick = (codigo) => {
    // Limpar o seletor quando um card é clicado
    setSeletorModoTransporte(null);

    if (selectedModoTransporte === codigo) {
      setSelectedModoTransporte(null); // Desselecionar se já estiver selecionado
    } else {
      setSelectedModoTransporte(codigo); // Selecionar o novo modo
    }
  };

  // Função para mudar o modo de transporte pelo seletor
  const handleSeletorModoTransporteChange = (e) => {
    const valor = e.target.value;
    // Limpar a seleção do card quando o seletor é usado
    setSelectedModoTransporte(null);
    setSeletorModoTransporte(valor === "todos" ? null : valor);
  };

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
        <h2 className="text-3xl font-bold text-center mb-4">
          Mortes por Cidade
        </h2>
        <h3 className="text-xl text-center mb-8">
          {selectedYear} ({tipoLocal === "ocorrencia" ? "Local de Ocorrência" : "Local de Residência"})
        </h3>
        
        {/* Cards de cidades */}
        <NumberCards
          cards={getCityCardsByYear(citiesByYearData, selectedYear, tipoLocal)}
          data={{
            title: "",
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
      {/* Mortes por modo de transporte */}
      {modoTransporteData &&
        modoTransporteProcessado &&
        modoTransporteProcessado.cards.length > 0 && (
          <div className="mx-auto container my-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Mortes por Modo de Transporte
            </h2>
            <h3 className="text-xl text-center mb-8">
              {selectedCityName} - {selectedYear} (
              {tipoLocal === "ocorrencia"
                ? "Local de Ocorrência"
                : "Local de Residência"
              })
            </h3>

            <SelectableInfoCards
              cards={modoTransporteProcessado.cards}
              selected={selectedModoTransporte}
              options={{
                changeFunction: handleModoTransporteClick
              }}
            />
            
            <div className="text-center text-sm text-gray-600 mt-2">
              Clique em um modo de transporte para ver seu perfil específico
            </div>

            {modoTransporteProcessado.infoNaoIdentificados.texto && (
              <p className="text-center text-gray-600 mt-4">
                {modoTransporteProcessado.infoNaoIdentificados.texto}
              </p>
            )}

            {/* Perfil socioeconômico */}
            {perfilSocioeconomico && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-4">
                  {perfilSocioeconomico.titulo}
                </h2>
                <h3 className="text-xl text-center mb-8">
                  {selectedCityName} - {selectedYear} (
                  {tipoLocal === "ocorrencia"
                    ? "Local de Ocorrência"
                    : "Local de Residência"
                  })
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Sexo */}
                  {perfilSocioeconomico.sexo.total > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-3 text-center">
                        Sexo
                      </h4>

                      {/* Gráfico de barras 100% para sexo */}
                      <div className="flex h-8 mb-3 rounded-md overflow-hidden">
                        {perfilSocioeconomico.sexo.grafico.series[0].data.map(
                          (item, index) => (
                            <div
                              key={item.name}
                              className="h-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: [
                                  "#1f77b4",
                                  "#ff7f0e",
                                  "#2ca02c",
                                ][index % 3],
                                minWidth: item.percentage > 3 ? "auto" : "0",
                              }}
                              title={`${item.name}: ${
                                item.y
                              } (${item.percentage.toFixed(1)}%)`}
                            >
                              {item.percentage > 10
                                ? `${item.percentage.toFixed(0)}%`
                                : ""}
                            </div>
                          )
                        )}
                      </div>

                      {/* Legenda */}
                      <div className="grid grid-cols-1 gap-2">
                        {perfilSocioeconomico.sexo.grafico.series[0].data.map(
                          (item, index) => (
                            <div key={item.name} className="flex items-center">
                              <div
                                className="w-4 h-4 mr-2"
                                style={{
                                  backgroundColor: [
                                    "#1f77b4",
                                    "#ff7f0e",
                                    "#2ca02c",
                                  ][index % 3],
                                }}
                              ></div>
                              <div className="text-sm flex-1">{item.name}</div>
                              <div className="text-sm font-semibold">
                                {item.y} ({item.percentage.toFixed(1)}%)
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Raça/Cor */}
                  {perfilSocioeconomico.racaCor.total > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-3 text-center">
                        Raça/Cor
                      </h4>

                      {/* Gráfico de barras 100% para raça/cor */}
                      <div className="flex h-8 mb-3 rounded-md overflow-hidden">
                        {perfilSocioeconomico.racaCor.grafico.series[0].data.map(
                          (item, index) => (
                            <div
                              key={item.name}
                              className="h-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: [
                                  "#1f77b4",
                                  "#ff7f0e",
                                  "#2ca02c",
                                  "#d62728",
                                  "#9467bd",
                                  "#8c564b",
                                ][index % 6],
                                minWidth: item.percentage > 3 ? "auto" : "0",
                              }}
                              title={`${item.name}: ${
                                item.y
                              } (${item.percentage.toFixed(1)}%)`}
                            >
                              {item.percentage > 10
                                ? `${item.percentage.toFixed(0)}%`
                                : ""}
                            </div>
                          )
                        )}
                      </div>

                      {/* Legenda */}
                      <div className="grid grid-cols-1 gap-2">
                        {perfilSocioeconomico.racaCor.grafico.series[0].data.map(
                          (item, index) => (
                            <div key={item.name} className="flex items-center">
                              <div
                                className="w-4 h-4 mr-2"
                                style={{
                                  backgroundColor: [
                                    "#1f77b4",
                                    "#ff7f0e",
                                    "#2ca02c",
                                    "#d62728",
                                    "#9467bd",
                                    "#8c564b",
                                  ][index % 6],
                                }}
                              ></div>
                              <div className="text-sm flex-1">{item.name}</div>
                              <div className="text-sm font-semibold">
                                {item.y} ({item.percentage.toFixed(1)}%)
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Faixa Etária */}
                  {perfilSocioeconomico.faixaEtaria.total > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-3 text-center">
                        Faixa Etária
                      </h4>

                      {/* Gráfico de barras 100% para faixa etária */}
                      <div className="flex h-8 mb-3 rounded-md overflow-hidden">
                        {perfilSocioeconomico.faixaEtaria.grafico.series[0].data.map(
                          (item, index) => (
                            <div
                              key={item.name}
                              className="h-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: [
                                  "#1f77b4",
                                  "#aec7e8",
                                  "#ff7f0e",
                                  "#ffbb78",
                                  "#2ca02c",
                                  "#98df8a",
                                  "#d62728",
                                  "#ff9896",
                                  "#9467bd",
                                  "#c5b0d5",
                                  "#8c564b",
                                ][index % 11],
                                minWidth: item.percentage > 3 ? "auto" : "0",
                              }}
                              title={`${item.name}: ${
                                item.y
                              } (${item.percentage.toFixed(1)}%)`}
                            >
                              {item.percentage > 10
                                ? `${item.percentage.toFixed(0)}%`
                                : ""}
                            </div>
                          )
                        )}
                      </div>

                      {/* Legenda */}
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                        {perfilSocioeconomico.faixaEtaria.grafico.series[0].data.map(
                          (item, index) => (
                            <div key={item.name} className="flex items-center">
                              <div
                                className="w-4 h-4 mr-2"
                                style={{
                                  backgroundColor: [
                                    "#1f77b4",
                                    "#aec7e8",
                                    "#ff7f0e",
                                    "#ffbb78",
                                    "#2ca02c",
                                    "#98df8a",
                                    "#d62728",
                                    "#ff9896",
                                    "#9467bd",
                                    "#c5b0d5",
                                    "#8c564b",
                                  ][index % 11],
                                }}
                              ></div>
                              <div className="text-sm flex-1">{item.name}</div>
                              <div className="text-sm font-semibold">
                                {item.y} ({item.percentage.toFixed(1)}%)
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      {/* Seção de Documentos */}
      {pageData.supportFiles && pageData.supportFiles.length > 0 && (
        <CardsSession
          title="Documentação sobre à segurança viária"
          cards={pageData.supportFiles.map((file) => ({
            title: file.title || file.name,
            description: file.description || "",
            url: file.url,
            target: "_blank",
          }))}
        />
      )}
    </>
  );
}