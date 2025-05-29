// app/sinistros-fatais/configuration.js
import { IntlNumber, IntlPercentil } from "../../utils";

/**
 * Configuração para o Observatório de Sinistros Fatais
 */

// Função para formatar os dados de estatísticas gerais
export function getGeneralStatistics(summaryData, tipoLocal = "ocorrencia") {
  const data = tipoLocal === "ocorrencia" 
    ? summaryData.porLocalOcorrencia 
    : summaryData.porLocalResidencia;
  
  return [
    {
      title: `Mortes no último ano (${data.ultimoAno})`,
      value: data.totalUltimoAno,
      unit: ""
    },
    {
      title: "Variação em relação ao ano anterior",
      value: IntlPercentil(data.crescimentoRelacaoAnoAnterior / 100),
      unit: ""
    },
    {
      title: "Mortes nos últimos 5 anos",
      value: data.dadosPorAno
        .slice(-5)
        .reduce((sum, item) => sum + item.total, 0),
      unit: ""
    },
    {
      title: `Ano mais violento: ${data.anoMaisViolento.ano}`,
      value: data.anoMaisViolento.total,
      unit: "mortes"
    }
  ];
}

// Função para formatar os dados de cidades por ano
export function getCityCardsByYear(citiesByYearData, selectedYear, tipoLocal = "ocorrencia") {
  if (!citiesByYearData || !selectedYear) return [];
  
  // Criar cards ordenados do maior para o menor número de mortes
  return citiesByYearData.cidades
    .map(city => ({
      id: city.id,
      label: city.nome,
      value: city[selectedYear.toString()] || 0,
      unit: "mortes"
    }))
    .sort((a, b) => b.value - a.value); // Ordenar do maior para o menor
}

// Função para formatar os dados do gráfico de evolução anual
export function getYearlyChartData(citiesByYearData, selectedCity = null) {
  if (!citiesByYearData || !citiesByYearData.anos) return [];
  
  // Se uma cidade está selecionada, mostrar apenas dados dessa cidade
  if (selectedCity) {
    const cityData = citiesByYearData.cidades.find(c => c.id === selectedCity);
    if (!cityData) return [];
    
    return [{
      name: cityData.nome,
      data: citiesByYearData.anos.map(ano => ({
        name: ano.toString(),
        y: cityData[ano.toString()] || 0
      }))
    }];
  }
  
  // Caso contrário, somar todas as cidades da RMR por ano
  return [{
    name: "RMR",
    data: citiesByYearData.anos.map(ano => {
      const total = citiesByYearData.cidades.reduce(
        (sum, city) => sum + (city[ano.toString()] || 0), 
        0
      );
      return {
        name: ano.toString(),
        y: total
      };
    })
  }];
}

// Configuração para os filtros avançados (a ser implementado posteriormente)
export const filterOptions = {
  sexo: [
    { value: "", label: "Todos" },
    { value: "1", label: "Masculino" },
    { value: "2", label: "Feminino" }
  ],
  racacor: [
    { value: "", label: "Todas" },
    { value: "1", label: "Branca" },
    { value: "2", label: "Preta" },
    { value: "4", label: "Parda" }
  ],
  modoTransporte: [
    { value: "", label: "Todos" },
    { value: "V0", label: "Pedestre" },
    { value: "V1", label: "Ciclista" },
    { value: "V2", label: "Motociclista" },
    { value: "V4", label: "Ocupante de automóvel" }
  ],
  faixaEtaria: [
    { value: "", label: "Todas" },
    { value: "0-19", label: "0 a 19 anos" },
    { value: "20-29", label: "20 a 29 anos" },
    { value: "30-39", label: "30 a 39 anos" },
    { value: "40-59", label: "40 a 59 anos" },
    { value: "60+", label: "60 anos ou mais" }
  ]
};