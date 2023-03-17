import React, { useRef, useState } from "react";
import { NumberCards } from "../../components/NumberCards";

/* function ObservatoriosCitiesData({ props }) {
  const { cities, city_sort, sortCity, ref } = props;

  const numcards = (data, order) => {
    const units = {
      percentil: "%",
      km_completed: "km",
      km_projected: "km",
      km_ciclos: "km",
    };
    return data
      .map((d: any) => ({
        id: d.id,
        label: d.name,
        unit: units[order],
        value: d[order],
      }))
      .sort((a: any, b: any) => (b.value >= a.value ? 1 : -1));
  };

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
  

  function handleClick(ref) {
    return ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <NumberCards
        props={{
          title: "Estrutura nas cidades",
          data: numcards(cities, city_sort),
          changeFunction: changeCity,
          onClickFnc: handleClick(ref),
          selected: selectedCity.id,
          maxDigs: 1,
          filters: sort_cities,
        }}
      />
    </>
  );
}

export default ObservatoriosCitiesData;
 */