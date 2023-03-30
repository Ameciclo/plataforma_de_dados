export function getTotalCityStates(input) {
  let arr = input,
    obj = {},
    count = 0,
    st_arr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i].state]) {
      obj[arr[i].state] = 1;
      count++;
      st_arr.push(arr[i].state);
    } else if (obj[arr[i].state]) {
      obj[arr[i].state] += 1;
    }
  }
  return { states: st_arr, count: count };
}

export function allCitiesStatistics(cidades, structures) {
  return [
    { title: "Cidades avaliadas", value: cidades.length },
    { title: "Em quantos estados", value: getTotalCityStates(cidades).count },
    {
      title: "Extensão avaliada (km)",
      value: (
        "" +
        (
          (cidades.reduce(
            (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.road,
            0
          ) +
            cidades.reduce(
              (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.street,
              0
            ) +
            cidades.reduce(
              (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.local,
              0
            )) /
          1000
        ).toFixed(1)
      ).replace(".", ","),
    },
    { title: "Vias avaliadas", value: "" + structures.length },
  ];
}


export function cityStatistics(selectedCity) {
  return [
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
  ].filter((e) => e);
}