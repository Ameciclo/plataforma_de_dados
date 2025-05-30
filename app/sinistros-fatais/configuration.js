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
  "V3": "Ocupante de triciclo",
  "V4": "Ocupante de automóvel",
  "V5": "Ocupante de caminhonete",
  "V6": "Ocupante de veículo pesado",
  "V7": "Ocupante de ônibus",
  "V8": "Outros veículos",
  "V9": "Não identificado"
};

// Ícones para cada modo de transporte (usando os ícones existentes)
export const modoTransporteIcons = {
  "V0": "pedestrian",
  "V1": "bicycle",
  "V2": "motorcycle",
  "V3": "tricycle",
  "V4": "car",
  "V5": "pickup",
  "V6": "truck",
  "V7": "bus",
  "V8": "other_vehicle",
  "V9": "unknown"
};

// Categorias a serem exibidas (excluindo não identificados)
export const categoriasExibidas = ["V0", "V1", "V2", "V4", "V7", "V8"];

// Função para formatar os dados de mortes por modo de transporte
export function getModoTransporteCards(filtrosData) {
  if (!filtrosData || !filtrosData.resumo || !filtrosData.resumo.porModoTransporte) {
    console.log("Dados de modo de transporte inválidos:", filtrosData);
    return [];
  }
  
  const { porModoTransporte } = filtrosData.resumo;
  
  // Calcular total excluindo não identificados (V9)
  let totalIdentificados = 0;
  let totalNaoIdentificados = 0;
  
  Object.entries(porModoTransporte).forEach(([modo, quantidade]) => {
    const codigoModo = modo.split(' ')[0];
    if (codigoModo === "V9") {
      totalNaoIdentificados += quantidade;
    } else {
      totalIdentificados += quantidade;
    }
  });
  
  const totalGeral = totalIdentificados + totalNaoIdentificados;
  
  if (totalGeral === 0) {
    console.log("Total geral é zero, não há dados para mostrar");
    return [];
  }
  
  // Calcular porcentagem de não identificados
  const porcentagemNaoIdentificados = totalNaoIdentificados / totalGeral;
  
  // Agrupar categorias menores em "Outros veículos"
  const dadosAgrupados = {};
  
  Object.entries(porModoTransporte).forEach(([modo, quantidade]) => {
    const codigoModo = modo.split(' ')[0];
    
    // Pular não identificados
    if (codigoModo === "V9") return;
    
    // Agrupar categorias conforme solicitado
    if (categoriasExibidas.includes(codigoModo)) {
      dadosAgrupados[codigoModo] = (dadosAgrupados[codigoModo] || 0) + quantidade;
    } else if (codigoModo !== "V9") {
      // Adicionar a "Outros veículos" se não for não identificado
      dadosAgrupados["V8"] = (dadosAgrupados["V8"] || 0) + quantidade;
    }
  });
  
  // Criar cards para as categorias agrupadas
  const cards = Object.entries(dadosAgrupados).map(([codigo, quantidade]) => ({
    label: modoTransporteLabels[codigo],
    icon: "women", // Usando ícones existentes
    data: IntlPercentil(quantidade / totalIdentificados)
  })).sort((a, b) => {
    // Extrair valores numéricos dos percentuais para ordenação
    const valueA = parseFloat(a.data.replace(',', '.').replace('%', ''));
    const valueB = parseFloat(b.data.replace(',', '.').replace('%', ''));
    return valueB - valueA;
  });
  
  // Informação sobre não identificados
  const infoNaoIdentificados = {
    porcentagem: porcentagemNaoIdentificados,
    texto: `${IntlPercentil(porcentagemNaoIdentificados)} dos registros não possuem identificação do modo de transporte.`
  };
  
  return { cards, infoNaoIdentificados };
}