import descriptions from "../../../public/dbs/ideciclo_rates_descriptions.json";
import map from "../../../public/dbs/malhacicloviariapermanente_mar2021.json";
import {
  IntlDateStr,
  Intlnumber,
  IntlNumberMax1Digit,
  IntlNumberMin1Max3Digits,
} from "../../../utils";

export function getStructureMap(structure) {
  // TRABALHA O MAPA
  const geoJsonMap = {
    type: "FeatureCollection",
    name: structure.street,
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [],
  };

  structure.reviews[structure.reviews.length - 1].segments.forEach((seg) => {
    geoJsonMap.features.push(
      map.features.filter((m) => m.properties.idunido == seg.geo_id)[0]
    );
  });

  if (geoJsonMap.features[0] == undefined) {
    geoJsonMap.features = map.features;
  }

  return geoJsonMap;
}

export function structureStatistics(structure, info) {
  const { nota, comprimento, avaliacoes } = { ...info };
  return {
    title: structure.street,
    subtitle: "Visão geral",
    boxes: [
      {
        title: "Nota geral",
        value: IntlNumberMax1Digit(nota),
      },
      {
        title: "Extensão (km)",
        value: IntlNumberMin1Max3Digits(comprimento / 1000),
      },
      { title: "Avaliações", value: avaliacoes },
    ],
  };
}

export function getRatesSummary(structure, forms) {
  // ORDENA POR ANO
  let s = structure;
  // PEGA FORMULÁRIO PARA DADOS DESCRITOS
  let form = forms; //.filter(f => f.id === s.reviews[0].segments[0].form_id)[0]
  // PEGA NOTAS
  let rate = structure.reviews[structure.reviews.length - 1].rates;
  let last_rate = rate;

  if (structure.reviews.length > 1)
    last_rate = structure.reviews[structure.reviews.length - 2].rates;

  //let last_rate = structure.reviews[1].rates
  const project_param = [
    {
      key: "protection",
      titulo: descriptions.protection.title,
      media: rate.protection,
      mediaType: "number",
      different: rate.protection != last_rate.protection,
      better: rate.protection > last_rate.protection,
    },
    {
      key: "all_vert_signs",
      titulo: descriptions.all_vert_signs.title,
      media: rate.all_vert_signs,
      mediaType: "number",
      different: rate.all_vert_signs != last_rate.all_vert_signs,
      better: rate.all_vert_signs > last_rate.all_vert_signs,
    },
    {
      key: "all_hor_signs",
      titulo: descriptions.all_hor_signs.title,
      media: rate.all_hor_signs,
      mediaType: "number",
      different: rate.all_hor_signs != last_rate.all_hor_signs,
      better: rate.all_hor_signs > last_rate.all_hor_signs,
    },
    {
      key: "comfort",
      titulo: descriptions.comfort.title,
      media: rate.comfort,
      mediaType: "number",
      different: rate.comfort != last_rate.comfort,
      better: rate.comfort > last_rate.comfort,
    },
  ];
  const safety_param = [
    {
      key: "speed_control",
      titulo: descriptions.speed_control.title,
      media: rate.speed_control,
      mediaType: "number",
      different: rate.speed_control != last_rate.speed_control,
      better: rate.speed_control > last_rate.speed_control,
    },
    {
      key: "conflicts",
      titulo: descriptions.conflicts.title,
      media: rate.conflicts,
      mediaType: "number",
      different: rate.conflicts != last_rate.conflicts,
      better: rate.conflicts > last_rate.conflicts,
    },
    {
      key: "cross_conflict",
      titulo: descriptions.cross_conflict.title,
      media: rate.cross_conflict,
      mediaType: "number",
      different: rate.cross_conflict != last_rate.cross_conflict,
      better: rate.cross_conflict > last_rate.cross_conflict,
    },
  ];
  const maintenance_param = [
    {
      key: "pavement",
      titulo: descriptions.pavement.title,
      media: rate.pavement,
      mediaType: "number",
      different: rate.pavement != last_rate.pavement,
      better: rate.pavement > last_rate.pavement,
    },
    {
      key: "hor_sign_conditions",
      titulo: descriptions.hor_sign_conditions.title,
      media: rate.hor_sign_conditions,
      mediaType: "number",
      different: rate.hor_sign_conditions != last_rate.hor_sign_conditions,
      better: rate.hor_sign_conditions > last_rate.hor_sign_conditions,
    },
    {
      key: "protection_conditions",
      titulo: descriptions.protection_conditions.title,
      media: rate.protection_conditions,
      mediaType: "number",
      different: rate.protection_conditions != last_rate.protection_conditions,
      better: rate.protection_conditions > last_rate.protection_conditions,
    },
  ];
  const urbanity_param = [
    {
      key: "obstacles",
      titulo: descriptions.obstacles.title,
      media: rate.obstacles,
      mediaType: "number",
      different: rate.obstacles != last_rate.obstacles,
      better: rate.obstacles > last_rate.obstacles,
    },
    {
      key: "shading",
      titulo: descriptions.shading.title,
      media: rate.shading,
      mediaType: "number",
      different: rate.shading != last_rate.shading,
      better: rate.shading > last_rate.shading,
    },
    {
      key: "access",
      titulo: descriptions.access.title,
      media: rate.access,
      mediaType: "number",
      different: rate.access != last_rate.access,
      better: rate.access > last_rate.access,
    },
    {
      key: "lighting",
      titulo: descriptions.lighting.title,
      media: rate.lighting,
      mediaType: "number",
      different: rate.lighting != last_rate.lighting,
      better: rate.lighting > last_rate.lighting,
    },
  ];

  const main_parameters = [
    {
      key: "project",
      titulo: descriptions.project.title,
      media: rate.project,
      mediaType: "number",
      color: "#6DBFAC",
      parametros: project_param,
    },
    {
      key: "safety",
      titulo: descriptions.safety.title,
      media: rate.safety,
      mediaType: "number",
      color: "#CE4831",
      parametros: safety_param,
    },
    {
      key: "maintenance",
      titulo: descriptions.maintenance.title,
      media: rate.maintenance,
      mediaType: "number",
      color: "#EFC345",
      parametros: maintenance_param,
    },
    {
      key: "urbanity",
      titulo: descriptions.urbanity.title,
      media: rate.urbanity,
      mediaType: "number",
      color: "#5AC2E1",
      parametros: urbanity_param,
    },
  ];

  // TRABALHA O DIAGRAMA RADAR
  const categories = main_parameters.map((p) => p.titulo);
  let series = [];
  let reviews = structure.reviews.slice().reverse();
  reviews.forEach((r, index) => {
    let d = [];
    main_parameters.forEach((p) => {
      d.push(r.rates[p.key]);
    });
    let type = "area";
    if (index != 0) type = "line";
    series.push({ type: type, name: r.year, data: d });
  });

  const date = new Date(form.header.date);

  let risk = "";
  structure.reviews[structure.reviews.length - 1].segments.forEach((s) => {
    //  let frm = forms.filter(f => f.id == s.form_id)[0]
    // risk = risk.concat(frm.evaluation.risks.situation)
  });

  return {
    tipologia: s.tipologia,
    fluxo: form.characteristics.flow_direction,
    comprimento: structure.reviews[structure.reviews.length - 1].length,
    pavimento: form.characteristics.pavement,
    localizacao: form.characteristics.localization,
    largura_total: form.characteristics.total_width,
    largura_transitavel: form.characteristics.cyclable_width,
    data: IntlDateStr(date),
    avaliacoes: structure.reviews.length,
    nota: structure.reviews[structure.reviews.length - 1].rates.average,
    categories: categories,
    series: series,
    parametros: main_parameters,
    situacoes: risk,
  };
}

/*
        
# NOTA
- Segurança Viária
    - Controle de velocidade
        - Controle eletrônico
            - Semáforos
            - Fotossensores e radares
        - Controle físico em desnível
            - Lombadas, etc
            - Faixa em nível
            - Outros Controles
        - Controles físico em nível
            - Tamanho médio de quadra (100m)
                - Comprimento da estrutura
                - Quantidade de cruzamentos
            - Largura média da faixa
                - Largura da total da via
                - Quantidade de faixas de rolamento
                - Largura faixa contígua
    - Conflitos ao longo
        - Continuidade de tipologia
        - Situação de risco
        - Riscos de invasão
            - Tipo de segregadores
            - Faixa de amortecimento
    - Conflitos entre ciclistas
        - Área transitável
        - Bidirecionalidade
    - Conflitos no Cruzamentos
        - Tipo de projeto
            - CICLOVIAS E CICLOFAIXAS
            - Localização
            - Fluxo da via
            - Fluxo da Estrutura
        - Situação de risco
        - Sinalização
            - Sinalização Vertical
                - Travessias
            - Sinalização Horizontal
                - Travessias
- Projeto
    - Escolha básica de projeto
        - Fluxo da via
        - Fluxo da Estrutura
        - Localização
        - Situação de risco
        - Padrão de sinalização
    - Proteção contra invasão
        - Situação da proteção
        - Tipos de segregadores
        - Faixa de amortecimento
    - Sinalização
        - Sinalização Horizontal
            - Direcional
            - Pictograma
            - Cruzamento
        - Sinalização Vertical
            - Ao longo
            - Início/fim
            - Travessias
            - Luminosa própria
            - Complementar **
    - Conforto
        - Tipo de pavimento
        - Sinuosidade
        - Largura da estrutura
            - Área transitável
        - Situações de risco
            - Troca de lado
            - Parada de ônibus
        - Obstáculos
            - Desníveis
        - Continuidade de tipologia
        - Bidirecionalidade
        - Acessibilidade à estrutura
            - Localização
            - Tipos de segregadores
            - Pontos de acesso
- Urbanidade e Manutenção
    - Manutenção cicloviária
        - Situação do pavimento
        - Obstáculos
        - Sinalização Vertical
            - Ao longo
            - Início/fim
            - Travessias
        - Sinalização Horizontal
            - Direcional
            - Pictograma
            - Travessias
            - Ao longo
    - Urbanidade
        - Sombreamento
        - Iluminação
        - Acessibilidade à estrutura
            - Localização
            - Pontos de acesso
            - Tipos de segregadores
            */
