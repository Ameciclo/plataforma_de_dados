export function CitiesStatistics (selectedCity) {
  return {
    title: selectedCity.name,
    subtitle: "Estatísticas Gerais",
    boxes: [
      {
        title: "estrutura cicloviárias",
        unit: "km",
        value: selectedCity.km_ciclos.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
      },
      {
        title: "projetada no plano cicloviário",
        unit: "km",
        value: selectedCity.km_projected.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
      },
      {
        title: "implantados no plano cicloviário",
        unit: "km",
        value: selectedCity.km_completed.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
      },
      {
        title: "cobertos do plano cicloviário",
        value: (selectedCity.percentil / 100).toLocaleString("pt-BR", {
          style: "percent",
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
      },
    ].filter((e) => e),
  };
};

export function sortCards(data, order) {
  const units = {
    percentil: "%",
    km_completed: "km",
    km_projected: "km",
    km_ciclos: "km",
  };
  return data
    .map((d) => ({
      id: d.id,
      label: d.name,
      unit: units[order],
      value: d[order],
    }))
    .sort((a, b) => (b.value >= a.value ? 1 : -1));
};
