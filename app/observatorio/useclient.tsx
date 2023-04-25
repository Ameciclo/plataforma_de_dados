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

const ObservatorioClientSide = ({ cities, inicialCity }) => {
  const [selectedCity, setCity] = useState(filterByName(cities, "Recife"));
  const changeCity = (id) => {
    setCity(filterById(cities, id));
  };

  const [city_sort, sortCity] = useState("km_completed");
  const sort_cities = [
    {
      title: "Ordene as cidades: ",
      value: city_sort,
      name: "city-sort",
      onChange: (e) => sortCity(e.target.value),
      onBlur: (e) => e,
      items: [
        { value: "percentil", label: "cobertos do plano cicloviário" },
        { value: "km_completed", label: "implantados no plano cicloviário" },
        { value: "km_projected", label: "projetada no plano cicloviário" },
        { value: "km_ciclos", label: "estrutura cicloviárias" },
      ],
    },
  ];

  const CityStatistics = cityCycleStructureExecutionStatistics(selectedCity);

  const cellFilterByValue = {
    Cell: ({ value }) => {
      value ? (
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
        accessor: "pdc_tipos",
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
        cards={sortCards(cities, city_sort)}
        data={{
          title: "Estrutura nas cidades",
          filters: sort_cities,
        }}
        options={{
          changeFunction: changeCity,
          maxDigs: 1,
        }}
        selected={selectedCity.id}
      />
      <StatisticsBox
        title={selectedCity.name}
        subtitle={"Estatísticas Gerais"}
        boxes={CityStatistics}
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
