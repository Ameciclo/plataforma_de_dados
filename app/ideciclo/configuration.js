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

export function getGeneralStatistics (cidades, structures) {
  const data = {
    title: "Estatísticas Gerais",
    subtitle: "",
    boxes: [
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
                (acc, cur) =>
                  acc + cur.reviews[0].city_network.cycle_length.street,
                0
              ) +
              cidades.reduce(
                (acc, cur) =>
                  acc + cur.reviews[0].city_network.cycle_length.local,
                0
              )) /
            1000
          ).toFixed(1)
        ).replace(".", ","),
      },
      { title: "Vias avaliadas", value: "" + structures.length },
    ],
  };

  return data;
};
