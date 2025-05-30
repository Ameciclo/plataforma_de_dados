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
export function getYearlyChartData(citiesByYearData, selectedCity = null, showAllCities = false) {
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
  
  // Se showAllCities é true, mostrar todas as cidades da RMR
  if (showAllCities) {
    return citiesByYearData.cidades.map(city => ({
      name: city.nome,
      data: citiesByYearData.anos.map(ano => ({
        name: ano.toString(),
        y: city[ano.toString()] || 0
      }))
    }));
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

// Mapeamento de códigos de modo de transporte para nomes legíveis
export const modoTransporteLabels = {
  "V0": "Pedestres",
  "V1": "Ciclistas",
  "V2": "Motociclistas",
  "V4": "Ocupante de automóvel",
  "V7": "Ocupante de ônibus",
  "outros": "Outros veículos"
};

// Ícones para cada modo de transporte
export const modoTransporteIcons = {
  "V0": "pedestrian",
  "V1": "bicycle",
  "V2": "motorcycle",
  "V4": "car",
  "V7": "bus",
  "outros": "truck"
};

// Função para formatar os dados de mortes por modo de transporte
export function getModoTransporteCards(filtrosData) {
  if (!filtrosData || !filtrosData.resumo || !filtrosData.resumo.porModoTransporte) {
    console.log("Dados de modo de transporte inválidos:", filtrosData);
    return { cards: [], infoNaoIdentificados: { texto: "" } };
  }
  
  console.log("Dados brutos de modo de transporte:", filtrosData.resumo.porModoTransporte);
  
  // Extrair e processar os dados
  const dadosBrutos = {};
  let totalIdentificados = 0;
  let totalNaoIdentificados = 0;
  
  // Mapear os códigos CID para as categorias desejadas
  Object.entries(filtrosData.resumo.porModoTransporte).forEach(([modo, quantidade]) => {
    // Extrair o código do modo (V0, V1, etc.)
    const codigoCompleto = modo.trim();
    const codigoBase = codigoCompleto.substring(0, 2);
    
    if (codigoBase === "V9") {
      // Não identificados
      totalNaoIdentificados += quantidade;
    } else if (codigoBase === "V0") {
      // Pedestres
      dadosBrutos["V0"] = (dadosBrutos["V0"] || 0) + quantidade;
      totalIdentificados += quantidade;
    } else if (codigoBase === "V1") {
      // Ciclistas
      dadosBrutos["V1"] = (dadosBrutos["V1"] || 0) + quantidade;
      totalIdentificados += quantidade;
    } else if (codigoBase === "V2" || codigoBase === "V3") {
      // Motociclistas (inclui triciclos)
      dadosBrutos["V2"] = (dadosBrutos["V2"] || 0) + quantidade;
      totalIdentificados += quantidade;
    } else if (codigoBase === "V4") {
      // Ocupante de automóvel
      dadosBrutos["V4"] = (dadosBrutos["V4"] || 0) + quantidade;
      totalIdentificados += quantidade;
    } else if (codigoBase === "V7") {
      // Ocupante de ônibus
      dadosBrutos["V7"] = (dadosBrutos["V7"] || 0) + quantidade;
      totalIdentificados += quantidade;
    } else {
      // Outros veículos (V5, V6, V8)
      dadosBrutos["outros"] = (dadosBrutos["outros"] || 0) + quantidade;
      totalIdentificados += quantidade;
    }
  });
  
  console.log("Dados processados:", dadosBrutos, "Total identificados:", totalIdentificados);
  
  if (totalIdentificados === 0) {
    return { cards: [], infoNaoIdentificados: { texto: "Não há dados disponíveis para esta seleção." } };
  }
  
  // Criar cards para as categorias
  const cards = Object.entries(dadosBrutos)
    .filter(([_, quantidade]) => quantidade > 0) // Remover categorias com zero
    .map(([codigo, quantidade]) => ({
      label: modoTransporteLabels[codigo],
      icon: modoTransporteIcons[codigo],
      data: IntlPercentil(quantidade / totalIdentificados)
    }))
    .sort((a, b) => {
      // Extrair valores numéricos dos percentuais para ordenação
      const valueA = parseFloat(a.data.replace(',', '.').replace('%', ''));
      const valueB = parseFloat(b.data.replace(',', '.').replace('%', ''));
      return valueB - valueA;
    });
  
  // Calcular porcentagem de não identificados em relação ao total geral
  const totalGeral = totalIdentificados + totalNaoIdentificados;
  const porcentagemNaoIdentificados = totalNaoIdentificados / totalGeral;
  
  // Informação sobre não identificados
  const infoNaoIdentificados = {
    porcentagem: porcentagemNaoIdentificados,
    texto: totalNaoIdentificados > 0 
      ? `${IntlPercentil(porcentagemNaoIdentificados)} dos registros não possuem identificação do modo de transporte.`
      : ""
  };
  
  return { cards, infoNaoIdentificados };
}