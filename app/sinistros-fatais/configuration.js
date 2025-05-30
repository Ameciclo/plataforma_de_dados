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
  "V3": "Ocupantes de triciclo",
  "V4": "Ocupantes de automóvel",
  "V5": "Ocupantes de caminhonete",
  "V6": "Ocupantes de veículo pesado",
  "V7": "Ocupantes de ônibus",
  "V8": "Outros modos",
  "V9": "Não especificado"
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

// Função para formatar os dados de mortes por modo de transporte
export function getModoTransporteCards(filtrosData) {
  if (!filtrosData || !filtrosData.resumo || !filtrosData.resumo.porModoTransporte) {
    console.log("Dados de modo de transporte inválidos:", filtrosData);
    return [];
  }
  
  const { porModoTransporte } = filtrosData.resumo;
  const totalGeral = filtrosData.totalGeral || 0;
  
  if (totalGeral === 0) {
    console.log("Total geral é zero, não há dados para mostrar");
    return [];
  }
  
  console.log("Processando dados de modo de transporte:", porModoTransporte);
  
  // Usar ícones existentes do contagens para evitar criar novos
  return Object.entries(porModoTransporte).map(([modo, quantidade]) => {
    // Extrair o código do modo (V0, V1, etc.)
    const codigoModo = modo.split(' ')[0];
    const label = modoTransporteLabels[codigoModo] || modo;
    
    return {
      label: label,
      icon: "women", // Usando ícones existentes
      data: IntlPercentil(quantidade / totalGeral)
    };
  });
}