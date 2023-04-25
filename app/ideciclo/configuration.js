import { IntlNumber, IntlNumber3Digit, IntlNumberMax1Digit } from "../../utils";

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

export function allCitiesStatistics(cities, structures) {

  return [
    { title: "Cidades avaliadas", value: cities.length },
    {
      title: "Em quantos estados",
      value: getTotalCityStates(cities).count,
    },
    {
      title: "Extensão avaliada",
      value: IntlNumberMax1Digit(
        (cities.reduce(
          (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.road,
          0
        ) +
          cities.reduce(
            (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.street,
            0
          ) +
          cities.reduce(
            (acc, cur) => acc + cur.reviews[0].city_network.cycle_length.local,
            0
          )) /
          1000
      ),
      unit:"km"
    },
    { title: "Vias avaliadas", value: IntlNumber(structures.length) },
  ];
}

export function cityStatistics(selectedCity) {
  const reviews = selectedCity.reviews

  return [
    reviews.length > 0 && {
      title: "IDECICLO " + reviews[0].year,
      value: IntlNumber3Digit(reviews[0].ideciclo.toFixed(3)),
    },
    reviews.length > 1 && {
      title: "IDECICLO " + reviews[1].year,
      value: IntlNumber3Digit(reviews[1].ideciclo.toFixed(3)),
    },
    reviews.length && {
      title: "Extensão avaliada",
      value: IntlNumberMax1Digit(
        (reviews[0].city_network.cycle_length.road +
          reviews[0].city_network.cycle_length.street +
          reviews[0].city_network.cycle_length.local) /
          1000
      ),
      unit:"km"
    },
    {
      title: "Vias avaliadas",
      value: IntlNumber(
        reviews[0].city_network.cycle_structures.road +
          reviews[0].city_network.cycle_structures.street +
          reviews[0].city_network.cycle_structures.local
      ),
    },
  ].filter((e) => e);
}
