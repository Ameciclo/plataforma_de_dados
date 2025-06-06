# Documentação da API Garfo

Este documento descreve os endpoints disponíveis na API Garfo, uma API para acesso a dados de mobilidade urbana, incluindo contagens de ciclistas, infraestrutura cicloviária e dados de sinistros de trânsito.

## Índice

1. [Cidades](#1-cidades)
2. [Contagens de Ciclistas](#2-contagens-de-ciclistas)
3. [Infraestrutura Cicloviária](#3-infraestrutura-cicloviária)
4. [Sinistros de Trânsito (CTTU)](#4-sinistros-de-trânsito-cttu)
5. [Mortes no Trânsito (DATASUS)](#5-mortes-no-trânsito-datasus)

## 1. Cidades

### Listar Cidades

**Endpoint:** `/cities`

**Método:** GET

**Descrição:** Retorna a lista de cidades disponíveis.

**Exemplo de Uso:**
```
GET http://localhost:8080/cities
```

## 2. Contagens de Ciclistas

### Resumo de Contagens

**Endpoint:** `/cyclist-counts`

**Método:** GET

**Descrição:** Retorna um resumo das contagens de ciclistas.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-counts
```

### Contagens por Edição

**Endpoint:** `/cyclist-counts/edition`

**Método:** GET

**Descrição:** Retorna dados de contagens de ciclistas por edição.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-counts/edition
```

## 3. Infraestrutura Cicloviária

### Relações de Infraestrutura

**Endpoint:** `/cyclist-infra/relations`

**Método:** GET

**Descrição:** Retorna relações de infraestrutura cicloviária.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-infra/relations
```

### Relações por Cidade

**Endpoint:** `/cyclist-infra/relationsByCity`

**Método:** GET

**Descrição:** Retorna relações de infraestrutura cicloviária por cidade.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-infra/relationsByCity
```

### Detalhes de Relação

**Endpoint:** `/cyclist-infra/relation`

**Método:** GET

**Parâmetros:**
- `id`: ID da relação

**Descrição:** Retorna detalhes de uma relação específica.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-infra/relation?id=123
```

### Vias Cicloviárias

**Endpoint:** `/cyclist-infra/ways`

**Método:** GET

**Descrição:** Retorna dados de vias cicloviárias.

**Exemplo de Uso:**
```
GET http://localhost:8080/cyclist-infra/ways
```

## 4. Sinistros de Trânsito (CTTU)

### Resumo de Sinistros

**Endpoint:** `/traffic-crashes/summary`

**Método:** GET

**Descrição:** Retorna um resumo dos sinistros de trânsito.

**Exemplo de Uso:**
```
GET http://localhost:8080/traffic-crashes/summary
```

### Dados Geoespaciais de Sinistros

**Endpoint:** `/traffic-crashes/geojson`

**Método:** GET

**Descrição:** Retorna dados geoespaciais de sinistros de trânsito em formato GeoJSON.

**Exemplo de Uso:**
```
GET http://localhost:8080/traffic-crashes/geojson
```

### Sinistros por Tipo de Veículo

**Endpoint:** `/traffic-crashes/vehicles`

**Método:** GET

**Descrição:** Retorna dados de sinistros por tipo de veículo.

**Exemplo de Uso:**
```
GET http://localhost:8080/traffic-crashes/vehicles
```

### Resumo de Sinistros por Rua

**Endpoint:** `/traffic-crashes/streets-summary`

**Método:** GET

**Descrição:** Retorna um resumo dos sinistros de trânsito por rua.

**Exemplo de Uso:**
```
GET http://localhost:8080/traffic-crashes/streets-summary
```

## 5. Mortes no Trânsito (DATASUS)

### Sumário de Informações

**Endpoint:** `/datasus-deaths/summary`

**Método:** GET

**Descrição:** Retorna um resumo das mortes no trânsito na RMR, incluindo totais, crescimento anual e ano mais violento.

**Exemplo de Uso:**
```
GET http://localhost:8080/datasus-deaths/summary
```

**Resposta:**
```json
{
  "porLocalOcorrencia": {
    "totalSinistrosUltimos10Anos": 1234,
    "totalUltimoAno": 123,
    "ultimoAno": 2022,
    "crescimentoRelacaoAnoAnterior": 5.2,
    "anoMaisViolento": {
      "ano": 2019,
      "total": 150
    },
    "dadosPorAno": [
      { "ano": 2013, "total": 120 },
      { "ano": 2014, "total": 125 },
      // ...
    ]
  },
  "porLocalResidencia": {
    // Mesma estrutura que porLocalOcorrencia
  }
}
```

### Matriz de Colisão

**Endpoint:** `/datasus-deaths/matrix`

**Método:** GET

**Parâmetros:**
- `cityId` (opcional): ID do município específico (se não informado, usa todos da RMR)
- `startYear` (opcional): Ano inicial para filtrar (padrão: últimos 10 anos)
- `endYear` (opcional): Ano final para filtrar (padrão: ano atual)
- `byResidence` (opcional): Se `true`, usa local de residência; se `false` ou não informado, usa local de ocorrência

**Descrição:** Retorna uma matriz de colisão mostrando o número de mortes por tipo de vítima e contraparte.

**Exemplos de Uso:**
```
# Matriz de colisão para toda a RMR por local de ocorrência
GET http://localhost:8080/datasus-deaths/matrix

# Matriz de colisão para o Recife em 2023
GET http://localhost:8080/datasus-deaths/matrix?cityId=2611606&startYear=2023&endYear=2023

# Matriz de colisão por local de residência
GET http://localhost:8080/datasus-deaths/matrix?byResidence=true

# Matriz de colisão para o Recife entre 2018 e 2022 por local de residência
GET http://localhost:8080/datasus-deaths/matrix?cityId=2611606&startYear=2018&endYear=2022&byResidence=true
```

**Resposta:**
```json
{
  "matrix": {
    "pedestre": {
      "pedestre": 0,
      "ciclista": 5,
      "motociclista": 25,
      "automovel": 120,
      "ônibus": 30,
      "outros": 3,
      "objeto_fixo": 0,
      "sem_colisao": 0,
      "nao_especificado": 10,
      "total": 193
    },
    "ciclista": {
      "pedestre": 2,
      "ciclista": 3,
      "motociclista": 8,
      "automovel": 45,
      "ônibus": 12,
      "outros": 1,
      "objeto_fixo": 10,
      "sem_colisao": 15,
      "nao_especificado": 5,
      "total": 101
    },
    // ... outros modos de transporte
    "total": {
      "pedestre": 5,
      "ciclista": 10,
      "motociclista": 50,
      "automovel": 280,
      "ônibus": 60,
      "outros": 15,
      "objeto_fixo": 70,
      "sem_colisao": 50,
      "nao_especificado": 60,
      "total": 600
    }
  },
  "metadata": {
    "cityId": 2611606,
    "startYear": 2023,
    "endYear": 2023,
    "byResidence": false,
    "locationType": "Local de Ocorrência",
    "description": "Matriz de colisão mostrando o número de mortes por tipo de vítima e contraparte"
  }
}
```

### Mortes por Cidade e Ano

**Endpoint:** `/datasus-deaths/cities-by-year`

**Método:** GET

**Parâmetros:**
- `tipo` (opcional): Tipo de local a considerar (`ocorrencia` ou `residencia`). Padrão: `ocorrencia`.

**Descrição:** Retorna dados de mortes por cidade da RMR, divididos por ano.

**Exemplo de Uso:**
```
GET http://localhost:8080/datasus-deaths/cities-by-year
GET http://localhost:8080/datasus-deaths/cities-by-year?tipo=residencia
```

**Resposta:**
```json
{
  "tipo": "Local de Ocorrência",
  "anos": [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  "cidades": [
    {
      "id": 2611606,
      "nome": "Recife",
      "2013": 50,
      "2014": 55,
      // ... outros anos
      "total": 500
    },
    // ... outras cidades
  ]
}
```

### Filtros Avançados

**Endpoint:** `/datasus-deaths/filtros`

**Método:** GET

**Parâmetros:**
- `municipio` (opcional): ID do município específico (se não informado, usa todos da RMR)
- `tipoLocal` (opcional): `residencia` ou `ocorrencia` (padrão: `ocorrencia`)
- `anoInicio` (opcional): Ano inicial para filtrar (padrão: últimos 10 anos)
- `anoFim` (opcional): Ano final para filtrar
- `sexo` (opcional): Código do sexo (1 = Masculino, 2 = Feminino)
- `racacor` (opcional): Código da raça/cor (1 = Branca, 2 = Preta, 4 = Parda, etc.)
- `faixaEtariaMin` (opcional): Idade mínima
- `faixaEtariaMax` (opcional): Idade máxima
- `modoTransporte` (opcional): Código do modo de transporte (V0 = Pedestre, V2 = Motociclista, V4 = Ocupante de automóvel, etc.)

**Descrição:** Permite filtrar os dados de mortes no trânsito por diversos critérios.

**Exemplos de Uso:**
```
# Todos os óbitos na RMR nos últimos 10 anos
GET http://localhost:8080/datasus-deaths/filtros

# Óbitos por local de residência
GET http://localhost:8080/datasus-deaths/filtros?tipoLocal=residencia

# Óbitos apenas no Recife
GET http://localhost:8080/datasus-deaths/filtros?municipio=2611606

# Óbitos apenas de pessoas do sexo masculino
GET http://localhost:8080/datasus-deaths/filtros?sexo=1

# Óbitos de pessoas entre 20 e 29 anos
GET http://localhost:8080/datasus-deaths/filtros?faixaEtariaMin=20&faixaEtariaMax=29

# Óbitos de motociclistas
GET http://localhost:8080/datasus-deaths/filtros?modoTransporte=V2

# Combinação: Motociclistas do sexo masculino
GET http://localhost:8080/datasus-deaths/filtros?modoTransporte=V2&sexo=1

# Combinação: Óbitos em Recife por local de residência entre 2018 e 2022
GET http://localhost:8080/datasus-deaths/filtros?municipio=2611606&tipoLocal=residencia&anoInicio=2018&anoFim=2022
```

**Resposta:**
```json
{
  "filtrosAplicados": {
    "tipoLocal": "ocorrencia",
    "anoInicio": 2013,
    "modoTransporte": ["V2"]
  },
  "totalGeral": 456,
  "resumo": {
    "porAno": {
      "2013": 40,
      "2014": 45,
      // ...
    },
    "porSexo": {
      "Masculino": 400,
      "Feminino": 56
    },
    "porRacaCor": {
      "Branca": 100,
      "Preta": 50,
      "Parda": 300,
      "Não informado": 6
    },
    "porFaixaEtaria": {
      "20 a 29 anos": 150,
      "30 a 39 anos": 120,
      // ...
    },
    "porMunicipio": {
      "Recife": 200,
      "Olinda": 80,
      // ...
    },
    "porModoTransporte": {
      "Motociclista": 456
    }
  },
  "dados": [
    // Dados detalhados de cada registro
  ]
}
```

### Códigos e Mapeamentos para DATASUS

#### Sexo
- `0`: Não informado
- `1`: Masculino
- `2`: Feminino
- `9`: Ignorado

#### Raça/Cor
- `1`: Branca
- `2`: Preta
- `3`: Amarela
- `4`: Parda
- `5`: Indígena
- `9`: Ignorado
- `NA`: Não informado

#### Modos de Transporte (Códigos CID-10)
- `V0`: Pedestre
- `V1`: Ciclista
- `V2`: Motociclista
- `V3`: Ocupante de triciclo
- `V4`: Ocupante de automóvel
- `V5`: Ocupante de caminhonete
- `V6`: Ocupante de veículo pesado
- `V7`: Ocupante de ônibus
- `V8`: Outros modos
- `V9`: Não especificado

#### Faixas Etárias
- 0 a 4 anos
- 5 a 9 anos
- 10 a 14 anos
- 15 a 19 anos
- 20 a 29 anos
- 30 a 39 anos
- 40 a 49 anos
- 50 a 59 anos
- 60 a 69 anos
- 70 a 79 anos
- 80 anos ou mais