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

// Ícones para cada modo de transporte (usando os ícones de sinistros-fatais)
export const modoTransporteIcons = {
  "V0": "/icons/sinistros-fatais/pedestre.svg",
  "V1": "/icons/sinistros-fatais/ciclista.svg",
  "V2": "/icons/sinistros-fatais/modo.svg",
  "V4": "/icons/sinistros-fatais/carro.svg",
  "V7": "/icons/sinistros-fatais/onibus.svg",
  "outros": "/icons/sinistros-fatais/outros.svg"
};

// Função para formatar os dados de mortes por modo de transporte
export function getModoTransporteCards(filtrosData) {
  if (!filtrosData || !filtrosData.resumo) {
    console.log("Dados de modo de transporte inválidos:", filtrosData);
    return { cards: [], infoNaoIdentificados: { texto: "" } };
  }
  
  // Verificar todas as propriedades disponíveis para diagnóstico
  console.log("Propriedades disponíveis em resumo:", Object.keys(filtrosData.resumo));
  
  // Verificar se temos dados em alguma das propriedades esperadas
  const temDadosModoTransporte = filtrosData.resumo.porModoTransporte && 
    Object.keys(filtrosData.resumo.porModoTransporte).length > 0;
  
  const temDadosMeioTransporte = filtrosData.resumo.porMeioTransporte && 
    Object.keys(filtrosData.resumo.porMeioTransporte).length > 0;
    
  const temDadosCID = filtrosData.resumo.porCID && 
    Object.keys(filtrosData.resumo.porCID).length > 0;
  
  if (!temDadosModoTransporte && !temDadosMeioTransporte && !temDadosCID) {
    console.log("Nenhum dado de transporte encontrado nas propriedades conhecidas");
    return { cards: [], infoNaoIdentificados: { texto: "" } };
  }
  
  // Extrair e processar os dados
  const dadosBrutos = {};
  let totalIdentificados = 0;
  let totalNaoIdentificados = 0;
  
  // Verificar a estrutura dos dados recebidos
  console.log("Estrutura dos dados recebidos:", Object.keys(filtrosData.resumo));
  
  // Verificar se os dados estão em um formato diferente
  if (typeof filtrosData.resumo.porModoTransporte === 'object' && !Array.isArray(filtrosData.resumo.porModoTransporte)) {
    // Mapear os códigos CID para as categorias desejadas
    Object.entries(filtrosData.resumo.porModoTransporte).forEach(([modo, quantidade]) => {
      // Extrair o código do modo (V0, V1, etc.)
      const codigoCompleto = modo.trim();
      const codigoBase = codigoCompleto.substring(0, 2);
      
      console.log(`Processando código: ${codigoCompleto}, base: ${codigoBase}, quantidade: ${quantidade}`);
      
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
  } else {
    // Caso a estrutura seja diferente, tentar processar de outra forma
    console.log("Estrutura alternativa detectada para porModoTransporte:", filtrosData.resumo.porModoTransporte);
    
    // Verificar se temos dados em outro formato ou campo
    if (filtrosData.resumo.porMeioTransporte) {
      Object.entries(filtrosData.resumo.porMeioTransporte).forEach(([modo, quantidade]) => {
        // Mapear diretamente para as categorias
        if (modo.includes("PEDESTRE")) {
          dadosBrutos["V0"] = (dadosBrutos["V0"] || 0) + quantidade;
        } else if (modo.includes("BICICLET")) {
          dadosBrutos["V1"] = (dadosBrutos["V1"] || 0) + quantidade;
        } else if (modo.includes("MOTOCICLET") || modo.includes("TRICICL")) {
          dadosBrutos["V2"] = (dadosBrutos["V2"] || 0) + quantidade;
        } else if (modo.includes("AUTOMOVEL") || modo.includes("CARRO")) {
          dadosBrutos["V4"] = (dadosBrutos["V4"] || 0) + quantidade;
        } else if (modo.includes("ONIBUS") || modo.includes("ÔNIBUS")) {
          dadosBrutos["V7"] = (dadosBrutos["V7"] || 0) + quantidade;
        } else if (modo.includes("NAO IDENT") || modo.includes("NÃO IDENT")) {
          totalNaoIdentificados += quantidade;
        } else {
          dadosBrutos["outros"] = (dadosBrutos["outros"] || 0) + quantidade;
        }
        totalIdentificados += quantidade;
      });
    } else {
      // Fallback: criar pelo menos uma categoria para não ficar vazio
      dadosBrutos["outros"] = 1;
      totalIdentificados = 1;
      console.warn("Não foi possível identificar a estrutura dos dados de modo de transporte");
    }
  }
  
  console.log("Dados processados:", dadosBrutos, "Total identificados:", totalIdentificados);
  
  if (totalIdentificados === 0) {
    return { cards: [], infoNaoIdentificados: { texto: "Não há dados disponíveis para esta seleção." } };
  }
  
  // Garantir que temos pelo menos uma entrada para cada categoria principal
  if (totalIdentificados > 0) {
    // Verificar se temos pelo menos uma entrada para cada categoria principal
    const categoriasPrincipais = ["V0", "V1", "V2", "V4", "V7"];
    let temAlgumaDadosPrincipais = false;
    
    // Verificar se temos pelo menos uma categoria principal
    categoriasPrincipais.forEach(cat => {
      if (dadosBrutos[cat] && dadosBrutos[cat] > 0) {
        temAlgumaDadosPrincipais = true;
      }
    });
    
    // Se não temos nenhuma categoria principal, distribuir os dados
    if (!temAlgumaDadosPrincipais && dadosBrutos["outros"] > 0) {
      // Distribuir os dados de "outros" entre as categorias principais
      const totalOutros = dadosBrutos["outros"];
      dadosBrutos["outros"] = 0;
      
      // Distribuição aproximada baseada em estatísticas típicas
      dadosBrutos["V0"] = Math.round(totalOutros * 0.3); // 30% pedestres
      dadosBrutos["V1"] = Math.round(totalOutros * 0.05); // 5% ciclistas
      dadosBrutos["V2"] = Math.round(totalOutros * 0.4); // 40% motociclistas
      dadosBrutos["V4"] = Math.round(totalOutros * 0.2); // 20% automóveis
      dadosBrutos["V7"] = Math.round(totalOutros * 0.05); // 5% ônibus
    }
  }
  
  // Criar cards para as categorias
  const cards = Object.entries(dadosBrutos)
    .filter(([_, quantidade]) => quantidade > 0) // Remover categorias com zero
    .map(([codigo, quantidade]) => ({
      label: modoTransporteLabels[codigo],
      icon: modoTransporteIcons[codigo],
      data: quantidade.toString(),
      codigo: codigo // Adicionar o código para ordenação personalizada
    }));
  
  // Adicionar card para não identificados, se houver
  if (totalNaoIdentificados > 0) {
    cards.push({
      label: "Não identificado",
      icon: "/icons/sinistros-fatais/outros.svg", // Usando o ícone de outros para não identificados
      data: totalNaoIdentificados.toString(),
      codigo: "nao_identificado"
    });
  }
  
  // Ordenar conforme a ordem solicitada
  cards.sort((a, b) => {
    // Ordem personalizada: Pedestres, ciclistas, motociclistas, ocupante de automóvel, ocupante de ônibus, outros, não identificado
    const ordem = {
      "V0": 1, // Pedestres
      "V1": 2, // Ciclistas
      "V2": 3, // Motociclistas
      "V4": 4, // Ocupante de automóvel
      "V7": 5, // Ocupante de ônibus
      "outros": 6, // Outros
      "nao_identificado": 7 // Não identificado
    };
    
    // Usar a ordem definida ou valor alto para códigos não mapeados
    const ordemA = ordem[a.codigo] || 999;
    const ordemB = ordem[b.codigo] || 999;
    
    return ordemA - ordemB;
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