import descriptions from './ideciclo_rates_descriptions.json'

function rates_organization (structure, forms, rates) {
// ORDENA POR ANO
let s = structure
// PEGA FORMULÁRIO PARA DADOS DESCRITOS
let form = forms//.filter(f => f.id === s.reviews[0].segments[0].form_id)[0]
// PEGA NOTAS
let rate = rates[0]
const project_param = [
        {
                key: "project_choices",
                titulo: descriptions.project_choices.title,
                media: rate.project_choices,
        }, 
        {
                key: "protection",
                titulo: descriptions.protection.title,
                media: rate.protection,
        }, 
        {
                key: "signs",
                titulo: descriptions.signs.title,
                media: rate.signs,
        }, 
        {
                key: "comfort",
                titulo: descriptions.comfort.title,
                media: rate.comfort,
        }, 
]
const safety_param = [
        {
                key: "speed_control",
                titulo: descriptions.speed_control.title,
                media: rate.speed_control,
        }, 
        {
                key: "conflicts",
                titulo: descriptions.conflicts.title,
                media: rate.conflicts,
        }, 
        {
                key: "cross_conflict",
                titulo: descriptions.cross_conflict.title,
                media: rate.cross_conflict,
        }, 
        {
                key: "comfort",
                titulo: descriptions.cyclists_conflicts.title,
                media: rate.cyclists_conflicts,
        },
]
const maintenance_and_urbanity_param = [
        {
                key: "paviment",
                titulo: descriptions.paviment.title,
                media: rate.paviment,
        }, 
        {
                key: "obstacles",
                titulo: descriptions.obstacles.title,
                media: rate.obstacles,
        }, 
        {
                key: "signs_conditions",
                titulo: descriptions.signs_conditions.title,
                media: rate.signs_conditions,
        }, 
        {
                key: "shadow",
                titulo: descriptions.shadow.title,
                media: rate.shadow,
        }, 
        {
                key: "lighting",
                titulo: descriptions.lighting.title,
                media: rate.lighting,
        },
        {
                key: "access",
                titulo: descriptions.access.title,
                media: rate.access,
        },
]

const main_parameters = [
        {
        key: "project",
        titulo: descriptions.project.title,
        media: rate.project,
        color: "#24CBE5",
        parametros: project_param,
        },
        {
        key: "safety",
        titulo : descriptions.safety.title,
        media: rate.safety,
        color: "#E02F31",
        parametros: safety_param, 
        },
        {
        key: "maintenance_and_urbanity",
        titulo : descriptions.maintenance_and_urbanity.title,
        media: rate.maintenance_and_urbanity,
        color: "#DDDF00",
        parametros: maintenance_and_urbanity_param, 
        },
]

// TRABALHA O DIAGRAMA RADAR
const categories = main_parameters.map(p => p.titulo)
let series = []
rates.forEach((r, index) => {
        let d = []
        main_parameters.forEach(p => d.push(r[p.key]))
        let type =    'area'
        if (index != 0) type = 'line'
        series.push({type: type, name: r.year, data: d})
        })

console.log(main_parameters)

return {
        tipologia: s.tipologia,
        fluxo: form.caracteristicas.fluxo,
        comprimento: structure.reviews[0].comprimento,
        pavimento: form.caracteristicas.pavimento,
        localizacao: form.caracteristicas.localizacao,
        largura_total: form.caracteristicas.largura_total,
        largura_transitavel: form.caracteristicas.largura_transitavel,
        data: form.cabecalho.data,
        avaliacoes: structure.reviews.length,
        nota: rate.average,
        categories: categories,
        series: series,
        parametros: main_parameters,
        }
}

    export default rates_organization;


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