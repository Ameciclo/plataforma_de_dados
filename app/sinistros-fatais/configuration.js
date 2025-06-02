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
  
  // Verificar se temos dados em porModoTransporte
  const temDadosModoTransporte = filtrosData.resumo.porModoTransporte && 
    Object.keys(filtrosData.resumo.porModoTransporte).length > 0;
  
  if (!temDadosModoTransporte) {
    console.log("Nenhum dado de modo de transporte encontrado");
    return { cards: [], infoNaoIdentificados: { texto: "" } };
  }
  
  // Extrair e processar os dados
  const dadosBrutos = {};
  let totalIdentificados = 0;
  let totalNaoIdentificados = 0;
  
  // Processar os dados de modo de transporte
  Object.entries(filtrosData.resumo.porModoTransporte).forEach(
    ([modo, quantidade]) => {
      // Mapear diretamente os nomes dos modos de transporte para os códigos
      if (modo === "Pedestre") {
        dadosBrutos["V0"] = (dadosBrutos["V0"] || 0) + quantidade;
        totalIdentificados += quantidade;
      } else if (modo === "Ciclista") {
        dadosBrutos["V1"] = (dadosBrutos["V1"] || 0) + quantidade;
        totalIdentificados += quantidade;
      } else if (modo === "Motociclista") {
        dadosBrutos["V2"] = (dadosBrutos["V2"] || 0) + quantidade;
        totalIdentificados += quantidade;
      } else if (modo === "Ocupante de automóvel" || modo === "Ocupante de caminhonete") {
        dadosBrutos["V4"] = (dadosBrutos["V4"] || 0) + quantidade;
        totalIdentificados += quantidade;
      } else if (modo === "Ocupante de ônibus") {
        dadosBrutos["V7"] = (dadosBrutos["V7"] || 0) + quantidade;
        totalIdentificados += quantidade;
      } else if (modo === "Não especificado") {
        totalNaoIdentificados += quantidade;
      } else {
        // Outros veículos (triciclo, veículo pesado, aquáticos, aéreos e outros)
        dadosBrutos["outros"] = (dadosBrutos["outros"] || 0) + quantidade;
        totalIdentificados += quantidade;
      }
    }
  );
  
  if (totalIdentificados === 0) {
    return {
      cards: [],
      infoNaoIdentificados: {
        texto: "Não há dados disponíveis para esta seleção.",
      },
    };
  }
  
  // Criar cards para as categorias
  const cards = Object.entries(dadosBrutos)
    .filter(([_, quantidade]) => quantidade > 0) // Remover categorias com zero
    .map(([codigo, quantidade]) => ({
      label: modoTransporteLabels[codigo],
      icon: modoTransporteIcons[codigo],
      data: quantidade.toString(),
      codigo: codigo, // Adicionar o código para ordenação personalizada
    }));

  // Adicionar card para não identificados, se houver
  if (totalNaoIdentificados > 0) {
    cards.push({
      label: "Não identificado",
      icon: "/icons/sinistros-fatais/outros.svg", // Usando o ícone de outros para não identificados
      data: totalNaoIdentificados.toString(),
      codigo: "nao_identificado",
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
      "nao_identificado": 7, // Não identificado
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
    texto:
      totalNaoIdentificados > 0
        ? `${IntlPercentil(
            porcentagemNaoIdentificados
          )} dos registros não possuem identificação do modo de transporte.`
        : "",
  };

  return { cards, infoNaoIdentificados };
}

// Mapeamento de modos de transporte para códigos CID
export const modoTransporteToCID = {
  "V0": ["Pedestre"],
  "V1": ["Ciclista"],
  "V2": ["Motociclista"],
  "V4": ["Ocupante de automóvel", "Ocupante de caminhonete"],
  "V7": ["Ocupante de ônibus"],
  "outros": ["Ocupante de triciclo", "Ocupante de veículo pesado", "Outros modos"]
};

// Função para obter o perfil socioeconômico por modo de transporte
export function getPerfilSocioeconomico(filtrosData, modoTransporte = null) {
  if (!filtrosData || !filtrosData.resumo) {
    return null;
  }

  // Se não tiver modo de transporte selecionado, retorna os dados gerais
  if (!modoTransporte) {
    return {
      titulo: "Perfil geral",
      sexo: filtrosData.resumo.porSexo || {},
      racaCor: filtrosData.resumo.porRacaCor || {},
      faixaEtaria: filtrosData.resumo.porFaixaEtaria || {}
    };
  }

  // Se o modo de transporte for "nao_identificado", retorna null (não temos dados)
  if (modoTransporte === "nao_identificado") {
    return null;
  }

  // Filtrar os dados detalhados para o modo de transporte selecionado
  const modosDesejados = modoTransporteToCID[modoTransporte] || [];
  
  if (!filtrosData.dados || !modosDesejados.length) {
    return null;
  }

  // Filtrar os dados pelo modo de transporte
  const dadosFiltrados = filtrosData.dados.filter(item => 
    modosDesejados.includes(item.modoTransporte?.descricao)
  );

  if (!dadosFiltrados.length) {
    return null;
  }

  // Processar dados por sexo
  const porSexo = {};
  dadosFiltrados.forEach(item => {
    const sexo = item.sexo?.descricao || "Não informado";
    porSexo[sexo] = (porSexo[sexo] || 0) + (item.total || 1);
  });

  // Processar dados por raça/cor
  const porRacaCor = {};
  dadosFiltrados.forEach(item => {
    const racaCor = item.racacor?.descricao || "Não informado";
    porRacaCor[racaCor] = (porRacaCor[racaCor] || 0) + (item.total || 1);
  });

  // Processar dados por faixa etária
  const porFaixaEtaria = {};
  dadosFiltrados.forEach(item => {
    const faixaEtaria = item.faixaEtaria || "Não informado";
    porFaixaEtaria[faixaEtaria] = (porFaixaEtaria[faixaEtaria] || 0) + (item.total || 1);
  });

  return {
    titulo: `Perfil de ${modoTransporteLabels[modoTransporte]}`,
    sexo: porSexo,
    racaCor: porRacaCor,
    faixaEtaria: porFaixaEtaria
  };
}