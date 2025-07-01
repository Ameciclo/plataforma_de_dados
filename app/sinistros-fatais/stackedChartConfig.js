// Função para gerar dados para o gráfico empilhado por modo de transporte
export function getStackedTransportModeData(citiesByYearData, selectedCity, tipoLocal = "ocorrencia") {
  console.log("getStackedTransportModeData - Entrada:", {
    hasCitiesByYearData: !!citiesByYearData,
    hasAnos: !!citiesByYearData?.years,
    anos: citiesByYearData?.years,
    selectedCity,
    tipoLocal,
    transportModes: citiesByYearData?.transportModes
  });
  
  // Se não temos dados, retornar estrutura vazia
  if (!citiesByYearData?.years) {
    return {
      categories: [],
      series: []
    };
  }
  
  // Filtrar anos a partir de 2015
  const anosDisponiveis = [...citiesByYearData.years].filter(ano => ano >= 2015).sort();
  
  if (anosDisponiveis.length === 0) {
    return {
      categories: [],
      series: []
    };
  }
  
  // Mapear os modos de transporte para as séries
  const modoTransporteCores = {
    "Pedestre": "#1f77b4", // Pedestres - azul
    "Ciclista": "#ff7f0e", // Ciclistas - laranja
    "Motociclista": "#2ca02c", // Motociclistas - verde
    "Ocupante de veículo": "#d62728", // Ocupante de veículo - vermelho
    "Outros": "#8c564b", // Outros - marrom
  };
  
  // Mapeamento para agrupar categorias
  const categoriasAgrupadas = {
    "Pedestre": ["Pedestre"],
    "Ciclista": ["Ciclista"],
    "Motociclista": ["Motociclista"],
    "Ocupante de veículo": ["Ocupante de automóvel", "Ocupante de caminhonete", "Ocupante de ônibus", "Ocupante de veículo pesado", "Ocupante de triciclo"],
    "Outros": ["Outros modos", "Não especificado"]
  };
  
  // Encontrar a cidade selecionada nos dados
  const cidadeSelecionada = selectedCity 
    ? citiesByYearData.cities.find(cidade => cidade.id === selectedCity)
    : null;
  
  // Se não encontrou a cidade e uma cidade foi selecionada, retornar vazio
  if (!cidadeSelecionada && selectedCity) {
    return {
      categories: [],
      series: []
    };
  }
  
  // Usar todas as cidades se nenhuma cidade específica foi selecionada
  const cidades = selectedCity ? [cidadeSelecionada] : citiesByYearData.cities;
  
  // Inicializar séries para as categorias agrupadas
  const seriesMap = {};
  Object.keys(categoriasAgrupadas).forEach(categoria => {
    seriesMap[categoria] = {
      name: categoria,
      type: 'column',
      data: Array(anosDisponiveis.length).fill(0),
      color: modoTransporteCores[categoria]
    };
  });
  
  // Para cada cidade, processar os dados por modo de transporte e ano
  cidades.forEach(cidade => {
    if (!cidade.transportModes) return;
    
    // Para cada modo de transporte
    Object.entries(cidade.transportModes).forEach(([modo, dadosModo]) => {
      // Encontrar a categoria agrupada para este modo
      let categoriaAgrupada = null;
      for (const [categoria, modos] of Object.entries(categoriasAgrupadas)) {
        if (modos.includes(modo)) {
          categoriaAgrupada = categoria;
          break;
        }
      }
      
      // Se não encontrou uma categoria, usar "Outros"
      if (!categoriaAgrupada) {
        categoriaAgrupada = "Outros";
      }
      
      // Para cada ano disponível
      anosDisponiveis.forEach((ano, anoIndex) => {
        // Adicionar o valor ao ano correspondente na categoria agrupada
        seriesMap[categoriaAgrupada].data[anoIndex] += dadosModo[ano.toString()] || 0;
      });
    });
  });
  
  // Converter o mapa de séries para um array e remover séries vazias
  const series = Object.values(seriesMap)
    .filter(serie => serie.data.some(valor => valor > 0));
  
  // Ordenar as séries conforme a ordem desejada
  series.sort((a, b) => {
    const ordem = {
      "Pedestre": 1,
      "Ciclista": 2,
      "Motociclista": 3,
      "Ocupante de veículo": 4,
      "Outros": 5
    };
    
    return (ordem[a.name] || 999) - (ordem[b.name] || 999);
  });
  
  console.log("Séries geradas:", series);
  
  return {
    categories: anosDisponiveis.map(ano => ano.toString()),
    series
  };
}