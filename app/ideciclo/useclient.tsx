"use client";
import React, { useEffect, useRef, useState } from "react";
import { NumberCards } from "../components/NumberCards";
import IdecicloTable from "./IdecicloTable";
import { filterById, filterByName } from "../../utils";
import { city } from "../../typings";
import { getTotalCityStates } from "./configuration";
import { StatisticsBox } from "../components/StatisticsBox";
import { SelectionFilter } from "../components/SelectionFilterMenu";

function IdecicloClientSide({ cidades, structures, ideciclo }) {
  const [filteredCity, setFilteredCity] = useState<any[]>([]);
  const [filteredCityData, setFilteredCityData] = useState<any[]>([]);
  const [selectedCity, setCity] = useState<city>(
    filterByName(cidades, "Recife")
  );
  const [cityState, setCityState] = useState<any>("PE");
  const [cityPop, setCityPop] = useState<any>("");

  const changeCity = (id) => {
    setCity(filterById(cidades, id));
    //window.location.replace("#maisinfo")
  };

  const CityStatistics = {
    title: selectedCity.name,
    subtitle: "Estatísticas Gerais",
    boxes: [
      selectedCity.reviews.length > 0 && {
        title: "IDECICLO " + selectedCity.reviews[0].year,
        value: ("" + selectedCity.reviews[0].ideciclo.toFixed(3)).replace(
          ".",
          ","
        ),
      },
      selectedCity.reviews.length > 1 && {
        title: "IDECICLO " + selectedCity.reviews[1].year,
        value: ("" + selectedCity.reviews[1].ideciclo.toFixed(3)).replace(
          ".",
          ","
        ),
      },
      selectedCity.reviews.length && {
        title: "Extensão avaliada (km)",
        value: (
          "" +
          (
            (selectedCity.reviews[0].city_network.cycle_length.road +
              selectedCity.reviews[0].city_network.cycle_length.street +
              selectedCity.reviews[0].city_network.cycle_length.local) /
            1000
          ).toFixed(1)
        ).replace(".", ","),
      },
      {
        title: "Vias avaliadas",
        value:
          "" +
          (selectedCity.reviews[0].city_network.cycle_structures.road +
            selectedCity.reviews[0].city_network.cycle_structures.street +
            selectedCity.reviews[0].city_network.cycle_structures.local),
      },
    ].filter((e) => e),
  };

  useEffect(() => {
    if (selectedCity) {
      let city_structures = structures.filter((s) => {
        return s.city_id === selectedCity.id;
      });
      let segs: any[] = [];
      city_structures.forEach((d: any) => {
        segs.push({
          id: d.id,
          cidade: d.city_id,
          logradouro: d.street,
          tipologia: d.typology,
          comprimento: d.reviews[d.reviews.length - 1].length / 1000,
          nota: d.reviews[d.reviews.length - 1].rates.average,
          projeto: d.reviews[d.reviews.length - 1].rates.project,
          manutencao:
            d.reviews[d.reviews.length - 1].rates.maintenance_and_urbanity,
          seguranca: d.reviews[d.reviews.length - 1].rates.safety,
        });
      });
      setFilteredCityData(segs);
    } else {
      setFilteredCityData([]);
    }
    if (cityState || cityPop) {
      setFilteredCity(
        ideciclo.filter((c) => {
          let city_size = "med";
          if (c.population < 100000) city_size = "peq";
          if (c.population > 500000) city_size = "grd";
          if (cityState !== "" && cityPop !== "") {
            return c.state === cityState && city_size === cityPop;
          } else {
            return c.state === cityState || city_size === cityPop;
          }
        })
      );
    } else {
      setFilteredCity(ideciclo);
    }
  }, [selectedCity, cityState, cityPop]);

  const cards_city = (chosenCities) => {
    const orderedCities = chosenCities
      .filter((f) => f.reviews[0].ideciclo > 0)
      .sort((a, b) => {
        if (a.reviews.length > 0 && b.reviews.length > 0) {
          return a.reviews[0].ideciclo > b.reviews[0].ideciclo ? -1 : 1;
        } else {
          return -1;
        }
      });
    return orderedCities.map((c: any) => ({
      id: c.id,
      label: c.name,
      value: c.reviews[0].ideciclo, // `${data.value.toLocaleString("pt-BR", {maximumFractionDigits: {maxDig}, minimumFractionDigits: {minDig}})}
    }));
  };
  const statesFilter =  {
    title: "por estado:",
    value: cityState,
    name: "cityState",
    onChange: (e) => setCityState(e.target.value),
    onBlur: (e) => e,
    items: [{ value: "", label: "Todas" }].concat(
      getTotalCityStates(cidades).states.map((s: any) => ({
        value: s,
        label: s,
      }))
    ),
  }
  const CitiesRanking = {
    title: "Ranking das Cidades",
    filters: [
      {
        title: "por estado:",
        value: cityState,
        name: "cityState",
        onChange: (e) => setCityState(e.target.value),
        onBlur: (e) => e,
        items: [{ value: "", label: "Todas" }].concat(
          getTotalCityStates(cidades).states.map((s: any) => ({
            value: s,
            label: s,
          }))
        ),
      },
      {
        title: "por população",
        value: cityPop,
        name: "city_pop",
        onChange: (e) => setCityPop(e.target.value),
        onBlur: (e) => e,
        items: [
          { value: "", label: "Todas" },
          { value: "peq", label: "até 100 mil hab" },
          { value: "med", label: "de 100 a 500 mil hab" },
          { value: "grd", label: "acima de 500 mil hab" },
        ],
      },
    ],
    data: [],
  };

  const ref = useRef(null);
  function handleClick(ref) {
    return ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <NumberCards
        cards={cards_city(filteredCity)}
        data={{
          title: CitiesRanking.title,
          filters: CitiesRanking.filters,
        }}
        selected={selectedCity.id}
        options={{ changeFunction: changeCity, onClickFnc: handleClick(ref) }}
      />
      {filteredCityData.length > 0 && (
        <StatisticsBox
          title={CityStatistics.title}
          subtitle={CityStatistics.subtitle}
          boxes={CityStatistics.boxes}
        />
      )}
      {filteredCityData.length > 0 && (
        <IdecicloTable
          title={"Avaliações de cada via"}
          data={filteredCityData}
        />
      )}
    </>
  );
}

export default IdecicloClientSide;
