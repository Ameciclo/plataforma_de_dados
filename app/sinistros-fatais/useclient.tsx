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
import {
  SelectionFilterMenu,
  FilterBaseType,
  FilterDeathLocationType,
} from "../components/SelectionFilterMenu";
import { IntlNumberNoDigit, IntlPercentil } from "../../utils";
import {
  getGeneralStatistics,
  getCityCardsByYear,
  getYearlyChartData,
  getModoTransporteCards,
  getPerfilSocioeconomico,
} from "./configuration";
import { CollisionMatrix } from "../components/CollisionMatrix";
import { CardsSession } from "../components/CardsSession";
import {
  DATASUS_CITIES_BY_YEAR_DATA,
  DATASUS_FILTROS_DATA,
  DATASUS_MATRIX_DATA,
  DATASUS_CAUSAS_SECUNDARIAS_DATA,
} from "../../servers";
import {
  DeathLocationFilter,
  DeathLocationType,
} from "../components/DeathLocationFilter";
import { CausasSecundarias } from "../components/CausasSecundarias";

// Função auxiliar para combinar dados de diferentes locais de ocorrência
const combineLocationData = (cities1, cities2) => {
  const combinedCities = [...cities1];

  cities2.forEach((city2) => {
    const existingCityIndex = combinedCities.findIndex(
      (city1) => city1.id === city2.id
    );

    if (existingCityIndex !== -1) {
      // Cidade já existe, somar os valores por ano
      const existingCity = combinedCities[existingCityIndex];
      let total = 0;

      // Somar os valores para cada ano
      Object.keys(city2).forEach((key) => {
        if (key !== "id" && key !== "nome" && key !== "total") {
          existingCity[key] = (existingCity[key] || 0) + (city2[key] || 0);
          total += city2[key] || 0;
        }
      });

      // Atualizar o total
      existingCity.total = (existingCity.total || 0) + total;
    } else {
      // Cidade não existe, adicionar à lista
      combinedCities.push(city2);
    }
  });

  return combinedCities;
};

export default function SinistrosFataisClientSide({
  summaryData,
  citiesByYearData: initialCitiesByYearData,
  pageData,
}) {
  const [tipoLocal, setTipoLocal] = useState("ocorrencia");
  const [selectedYear, setSelectedYear] = useState(2023); // Ano inicial
  const [selectedEndYear, setSelectedEndYear] = useState(null); // Ano final
  const [selectedCity, setSelectedCity] = useState(2611606); // Mostrar Recife por padrão no gráfico
  const [selectedCardCity, setSelectedCardCity] = useState(2611606); // ID do Recife para os cards
  const [citiesByYearData, setCitiesByYearData] = useState(
    initialCitiesByYearData
  );
  const [showAllCities, setShowAllCities] = useState(false);
  const [modoTransporteData, setModoTransporteData] = useState(null);
  const [isLoadingModoTransporte, setIsLoadingModoTransporte] = useState(false);
  const [collisionMatrixData, setCollisionMatrixData] = useState(null);
  const [isLoadingMatrix, setIsLoadingMatrix] = useState(false);
  const [causasSecundariasData, setCausasSecundariasData] = useState(null);
  const [isLoadingCausasSecundarias, setIsLoadingCausasSecundarias] = useState(
    false
  );
  const [deathLocation, setDeathLocation] = useState<DeathLocationType>("all"); // Local de ocorrência do óbito

  // Determinar o último ano disponível nos dados apenas na primeira carga
  useEffect(() => {
    if (
      citiesByYearData &&
      citiesByYearData.anos &&
      citiesByYearData.anos.length > 0 &&
      !selectedYear // Apenas se não houver ano selecionado
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
  }, [citiesByYearData, selectedYear]);

  // Buscar dados quando o tipo de local ou local de ocorrência do óbito mudar
  useEffect(() => {
    const fetchCitiesByYearData = async () => {
      try {
        // Construir parâmetros para a API
        let url = `${DATASUS_CITIES_BY_YEAR_DATA}?tipo=${tipoLocal}`;

        // Adicionar filtro de local de ocorrência do óbito
        if (deathLocation !== "all") {
          if (deathLocation === "health") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=1,2`;
          } else if (deathLocation === "other") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=3,5,9`;
          } else {
            // Para "public" (código 4), fazer uma única chamada
            url += `&localOcorrenciaObito=4`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();
        setCitiesByYearData(data);
      } catch (error) {
        console.error("Erro ao buscar dados por tipo de local:", error);
      }
    };

    fetchCitiesByYearData();
  }, [tipoLocal, deathLocation]);

  // Buscar dados de modo de transporte quando a cidade, tipo de local, ano ou local de ocorrência do óbito mudar
  useEffect(() => {
    const fetchModoTransporteData = async () => {
      if (!selectedCardCity || !selectedYear) return;

      setIsLoadingModoTransporte(true);
      try {
        // Usar o ano final se estiver definido, caso contrário usar o ano inicial
        const anoFim = selectedEndYear || selectedYear;

        // Construir URL base
        let url = `${DATASUS_FILTROS_DATA}?municipio=${selectedCardCity}&tipoLocal=${tipoLocal}&anoInicio=${selectedYear}&anoFim=${anoFim}`;

        // Adicionar filtro de local de ocorrência do óbito
        if (deathLocation !== "all") {
          if (deathLocation === "health") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=1,2`;
          } else if (deathLocation === "other") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=3,5,9`;
          } else {
            // Para "public" (código 4), fazer uma única chamada
            url += `&localOcorrenciaObito=4`;
          }
        }

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
            (data.resumo.porCID &&
              Object.keys(data.resumo.porCID).length > 0))
        ) {
          setModoTransporteData(data);
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
  }, [selectedCardCity, tipoLocal, selectedYear, selectedEndYear, deathLocation]);

  // Estado para o modo de transporte selecionado
  const [selectedModoTransporte, setSelectedModoTransporte] = useState(null);

  // Estado para o modo de transporte do seletor
  const [seletorModoTransporte, setSeletorModoTransporte] = useState(null);

  // Obter perfil socioeconômico (usando o seletor ou o card selecionado)
  const modoTransporteAtivo = seletorModoTransporte || selectedModoTransporte;

  // Buscar dados das causas secundárias quando a cidade, tipo de local, ano ou local de ocorrência do óbito mudar
  useEffect(() => {
    const fetchCausasSecundariasData = async () => {
      if (!selectedYear) return;

      setIsLoadingCausasSecundarias(true);
      try {
        // Usar o ano final se estiver definido, caso contrário usar o ano inicial
        const anoFim = selectedEndYear || selectedYear;

        // Construir a URL base com os parâmetros
        let url = `${DATASUS_CAUSAS_SECUNDARIAS_DATA}?startYear=${selectedYear}&endYear=${anoFim}&tipoLocal=${tipoLocal}`;

        // Adicionar cityId se uma cidade específica estiver selecionada
        if (selectedCardCity) {
          url += `&cityId=${selectedCardCity}`;
        }

        // Adicionar filtro de modo de transporte se estiver selecionado
        if (modoTransporteAtivo) {
          url += `&modoTransporte=${modoTransporteAtivo}`;
        }

        // Adicionar filtro de local de ocorrência do óbito
        if (deathLocation !== "all") {
          if (deathLocation === "health") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=1,2`;
          } else if (deathLocation === "other") {
            // Usar valores separados por vírgula
            url += `&localOcorrenciaObito=3,5,9`;
          } else {
            // Para "public" (código 4), fazer uma única chamada
            url += `&localOcorrenciaObito=4`;
          }
        }

        // Fazer a chamada à API
        const response = await fetch(url);
        const data = await response.json();
        setCausasSecundariasData(data);
      } catch (error) {
        console.error("Erro ao buscar dados de causas secundárias:", error);
        setCausasSecundariasData(null);
      } finally {
        setIsLoadingCausasSecundarias(false);
      }
    };

    fetchCausasSecundariasData();
  }, [
    selectedCardCity,
    tipoLocal,
    selectedYear,
    selectedEndYear,
    modoTransporteAtivo,
    deathLocation,
  ]);

  // Buscar dados da matriz de colisão quando a cidade, tipo de local, ano ou local de ocorrência do óbito mudar
  useEffect(() => {
    const fetchCollisionMatrixData = async () => {
      if (!selectedYear) return;

      setIsLoadingMatrix(true);
      try {
        // Usar o ano final se estiver definido, caso contrário usar o ano inicial
        const anoFim = selectedEndYear || selectedYear;

        // Construir a URL base com os parâmetros
        let baseUrl = `${DATASUS_MATRIX_DATA}?startYear=${selectedYear}&endYear=${anoFim}`;

        // Adicionar cityId se uma cidade específica estiver selecionada
        if (selectedCardCity) {
          baseUrl += `&cityId=${selectedCardCity}`;
        }

        // Adicionar parâmetro de tipo de local
        baseUrl += `&byResidence=${tipoLocal === "residencia"}`;

        // Função para combinar matrizes
        const combineMatrices = (matrix1, matrix2) => {
          if (!matrix1) return matrix2;
          if (!matrix2) return matrix1;
          
          const result = { ...matrix1 };
          
          Object.keys(matrix2).forEach(mode => {
            if (!result[mode]) {
              result[mode] = { ...matrix2[mode] };
            } else {
              Object.keys(matrix2[mode]).forEach(counterpart => {
                result[mode][counterpart] = (result[mode][counterpart] || 0) + (matrix2[mode][counterpart] || 0);
              });
            }
          });
          
          return result;
        };

        // Adicionar filtro de local de ocorrência do óbito
        if (deathLocation !== "all") {
          if (deathLocation === "health") {
            // Usar valores separados por vírgula
            baseUrl += `&deathLocation=1,2`;
          } else if (deathLocation === "other") {
            // Usar valores separados por vírgula
            baseUrl += `&deathLocation=3,5,9`;
          } else {
            // Para "public" (código 4), fazer uma única chamada
            baseUrl += `&deathLocation=4`;
          }
        }

        // Para "all" ou "public", fazer uma única chamada
        const response = await fetch(baseUrl);
        const data = await response.json();

        // Verificar se os dados são válidos
        if (data && data.matrix) {
          setCollisionMatrixData(data);
        } else {
          setCollisionMatrixData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da matriz de colisão:", error);
        setCollisionMatrixData(null);
      } finally {
        setIsLoadingMatrix(false);
      }
    };

    fetchCollisionMatrixData();
  }, [selectedCardCity, tipoLocal, selectedYear, selectedEndYear, deathLocation]);

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

  // Selecionar ano ou intervalo de anos
  const handleYearChange = (year, endYear = null) => {
    // Garantir que pelo menos um ano esteja selecionado
    if (year !== null) {
      setSelectedYear(year);
      setSelectedEndYear(endYear);
    }
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

  // Formatar o texto do período selecionado
  const getPeriodoText = () => {
    if (!selectedYear) return "";
    if (!selectedEndYear) return selectedYear.toString();
    return `${selectedYear} a ${selectedEndYear}`;
  };
  
  // Obter texto completo dos filtros para subtítulos
  const getFullFilterText = () => {
    const baseType = tipoLocal === "ocorrencia" 
      ? "Local de ocorrência da morte" 
      : "Local de residência da pessoa morta";
    
    const deathLocText = (() => {
      switch(deathLocation) {
        case "all": return "Todos os locais";
        case "health": return "Hospital/Estabelecimento de saúde";
        case "public": return "Via pública";
        case "other": return "Outros locais e ignorados";
        default: return "Todos os locais";
      }
    })();
    
    return `${selectedCityName} - ${getPeriodoText()} - ${baseType} - ${deathLocText}`;
  };
  
  // Verificar se o filtro de local de ocorrência do óbito está sendo aplicado corretamente na API
  useEffect(() => {
    console.log(`Filtro aplicado: Base=${tipoLocal}, Local=${deathLocation}, Ano=${selectedYear}-${selectedEndYear || selectedYear}, Cidade=${selectedCityName}`);
  }, [tipoLocal, deathLocation, selectedYear, selectedEndYear, selectedCityName]);

  return (
    <>
      {/* Estatísticas gerais */}
      <StatisticsBox
        title="Mortes no Trânsito"
        subtitle={`Dados do DATASUS - RMR (por ${
          tipoLocal === "ocorrencia"
            ? "Local de ocorrência da morte"
            : "Local de residência da pessoa morta"
        })`}
        boxes={getGeneralStatistics(summaryData, tipoLocal)}
      />

      {/* Caixas de explicação */}
      <ExplanationBoxes
        boxes={
          pageData.explanationBoxes && pageData.explanationBoxes.length > 0
            ? pageData.explanationBoxes
            : defaultExplanationBoxes
        }
      />

      {/* Seletor de ano e cards de cidades */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Mortes por Cidade
        </h2>
        <h3 className="text-xl text-center mb-8">
          {getFullFilterText()}
        </h3>

        {/* Cards de cidades */}
        <NumberCards
          cards={getCityCardsByYear(
            citiesByYearData,
            selectedYear,
            tipoLocal,
            selectedEndYear
          )}
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

      {/* Gráfico de mortes por ano */}
      <div className="mx-auto container my-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Evolução das Mortes no Trânsito
        </h2>

        <LineChart
          title={`Mortes por Ano na RMR (${
            tipoLocal === "ocorrencia"
              ? "Local de ocorrência da morte"
              : "Local de residência da pessoa morta"
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

      {/* Matriz de Colisão */}
      <CollisionMatrix
        data={collisionMatrixData}
        isLoading={isLoadingMatrix}
        title="Matriz de Colisão"
        subtitle={getFullFilterText()}
      />
  
     <div className="m-8 p-6 bg-gray-50 rounded-lg shadow-lg border">
        {/* Mortes por modo de transporte */}
        {modoTransporteData &&
          modoTransporteProcessado &&
          modoTransporteProcessado.cards.length > 0 && (
            <div className="mx-auto container my-12">
              <h2 className="text-3xl font-bold text-center mb-4">
                Mortes por Modo de Transporte
              </h2>
              <h3 className="text-xl text-center mb-8">
                {getFullFilterText()}
              </h3>

              <SelectableInfoCards
                cards={modoTransporteProcessado.cards}
                selected={selectedModoTransporte}
                options={{
                  changeFunction: handleModoTransporteClick,
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
                <div className="mt-8 p-6">
                  <h2 className="text-3xl font-bold text-center mb-4">
                    {perfilSocioeconomico.titulo}
                  </h2>
                  <h3 className="text-xl text-center mb-8">
                    {getFullFilterText()}
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
                              <div
                                key={item.name}
                                className="flex items-center"
                              >
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
                                <div className="text-sm flex-1">
                                  {item.name}
                                </div>
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
                              <div
                                key={item.name}
                                className="flex items-center"
                              >
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
                                <div className="text-sm flex-1">
                                  {item.name}
                                </div>
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
                              <div
                                key={item.name}
                                className="flex items-center"
                              >
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
                                <div className="text-sm flex-1">
                                  {item.name}
                                </div>
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

              {/* Causas Secundárias */}
              <CausasSecundarias
                data={causasSecundariasData}
                isLoading={isLoadingCausasSecundarias}
                title="Causas Secundárias"
                subtitle={getFullFilterText()}
                cidDescriptions={require("../../public/CID10CAT.json")}
              />
            </div>
          )}
      </div>
      {/* Seção de Documentos */}
      {pageData.supportFiles && pageData.supportFiles.length > 0 && (
        <CardsSession
          title="Documentação sobre segurança viária"
          cards={pageData.supportFiles.map((file) => ({
            title: file.title || file.name,
            description: file.description || "",
            url: file.url,
            target: "_blank",
          }))}
        />
      )}

      {/* Menu de filtros fixo na parte inferior */}
      <div className="pb-16">
        {/* Espaço para evitar que o conteúdo fique escondido atrás do menu fixo */}
      </div>
      <SelectionFilterMenu
        baseType={tipoLocal as FilterBaseType}
        onBaseTypeChange={handleTipoLocalChange}
        deathLocation={deathLocation as FilterDeathLocationType}
        onDeathLocationChange={setDeathLocation}
        selectedYear={selectedYear}
        selectedEndYear={selectedEndYear}
        availableYears={citiesByYearData?.anos || []}
        onYearChange={handleYearChange}
        selectedCity={selectedCardCity}
        selectedCityName={selectedCityName}
        citiesList={citiesByYearData?.cidades || []}
        onCityChange={handleCityChange}
      />
    </>
  );
}
