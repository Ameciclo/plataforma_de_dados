"use client";
import React, { useState } from "react";
import { filterByName, filterById } from "../../utils";
import { NumberCards } from "../components/NumberCards";
import { StatisticsBox } from "../components/StatisticsBox";
import { Table } from "../components/Table/Table";
import {
  ColumnFilter,
  SelectColumnFilter,
} from "../components/Table/TableFilters";
import {
  cityCycleStructureExecutionStatistics,
  sortCards,
} from "./configuration";

const ExtensionCell = ({ value }) => {
  return (
    <>
      {value ? (
        <span>
          {value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
        </span>
      ) : (
        <span>N/A</span>
      )}
    </>
  );
};

const ObservatorioClientSide = ({ citiesStats, inicialCity }) => {
  const citiesStatsArray = Object.values(citiesStats).filter(
    (c) => c.name !== undefined
  );

  const [selectedCity, setCity] = useState(
    filterByName(citiesStatsArray, inicialCity)
  );
  const changeCity = (id) => {
    setCity(filterById(citiesStatsArray, id));
  };

  const [optionsType, setOptionsType] = useState("max1digit");

  const [city_sort, sortCity] = useState("total");
  const sort_cities = [
    {
      title: "Ordene as cidades: ",
      value: city_sort,
      name: "city-sort",
      onChange: (e) => sortCityAndType(e.target.value),
      onBlur: (e) => e,
      items: [
        { value: "percentil", label: "cobertos do plano cicloviário" },
        { value: "pdc_feito", label: "implantados no plano cicloviário" },
        { value: "pdc_total", label: "projetada no plano cicloviário" },
        { value: "total", label: "estrutura cicloviárias" },
      ],
    },
  ];

  const sortCityAndType = (value) => {
    sortCity(value)
    let type = "max1digit"
    if(value == "percentil") type = "percentual"
    setOptionsType(type)
  }

  const cellFilterByValue = {
    Cell: ({ value }) => {
      return value ? (
        <span>{("" + value.toFixed(2)).replace(".", ",")}</span>
      ) : (
        <span>{"N/A"}</span>
      );
    },
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "(COD) Nome da Via",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Tipologia prevista",
        accessor: "pdc_typology",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Extensão prevista (km)",
        accessor: "pdc_kms",
        Cell: ({ value }) => <ExtensionCell value={value} />,
        Filter: false,
      },
      {
        Header: "Tipologia executada",
        accessor: "ciclo_tipos",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Extensão executada (km)",
        accessor: "ciclo_kms",
        Cell: ({ value }) => <ExtensionCell value={value} />,
        Filter: false,
      },
    ],
    []
  );

  return (
    <>
      <NumberCards
        cards={sortCards(citiesStatsArray, city_sort)}
        data={{
          title: "Estrutura nas cidades",
          filters: sort_cities,
        }}
        options={{
          changeFunction: changeCity,
          type: optionsType,
        }}
        selected={selectedCity?.id}
      />
      <StatisticsBox
        title={selectedCity.name}
        subtitle={"Estatísticas Gerais"}
        boxes={cityCycleStructureExecutionStatistics(selectedCity)}
      />
      <Table
        title={"Estruturas do PDC para " + selectedCity.name}
        data={selectedCity.ways}
        columns={columns}
      />
    </>
  );
};

export default ObservatorioClientSide;
