"use client";
import React, { useRef, useState } from "react";
import { NumberCards } from "../../components/NumberCards";
import { StatisticsBox } from "../../components/StatisticsBox";
import { Table } from "../../components/Table/Table";
import {
  ColumnFilter,
  SelectColumnFilter,
} from "../../components/Table/TableFilters";
import { CitiesStatistics, sortCards } from "./citiesStatisticsConf";
import { colsconf } from "./tableConf";
import utils from "../../../utils";

export default function ObservatorioCitiesSession({ props }) {
  const { cities, inicialCity } = props;
  console.log(inicialCity);
  const [selectedCity, setCity] = useState(
    utils.filterByName(cities, "Recife")
  );
  const changeCity = (id) => {
    setCity(utils.filterById(cities, id));
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

  const CityStatistics = CitiesStatistics(selectedCity);

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
        Cell: ({ value }) =>
          value ? (
            <span>{("" + value.toFixed(2)).replace(".", ",")}</span>
          ) : (
            <span>{"N/A"}</span>
          ),
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
        Cell: ({ value }) =>
          value ? (
            <span>{("" + value.toFixed(2)).replace(".", ",")}</span>
          ) : (
            <span>{"N/A"}</span>
          ),
        Filter: false,
      },
    ],
    []
  );

  console.log(columns[2])

  const ref = useRef(null);
  function handleClick(ref) {
    return ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  //const uri = utils.exportToJsonFile(calcs(), "PDC")
  //   <Link href={uri} target={"_blank "}>BAIXAR</Link>

  return (
    <>
      <NumberCards
        props={{
          title: "Estrutura nas cidades",
          data: sortCards(cities, city_sort),
          changeFunction: changeCity,
          onClickFnc: handleClick(ref),
          selected: selectedCity.id,
          maxDigs: 1,
          filters: sort_cities,
        }}
      />
      <div ref={ref}>
        <StatisticsBox
          title={CityStatistics.title}
          subtitle={CityStatistics.subtitle}
          boxes={CityStatistics.boxes}
        />
      </div>
      <Table
        title={"Estruturas do PDC para " + selectedCity.name}
        data={selectedCity.ways}
        columns={columns}
      />
    </>
  );
}
