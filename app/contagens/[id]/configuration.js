export const getPointsDataForSingleCounting = (d) => {
  return [
    {
      key: d.name,
      latitude: d.location.coordinates[0],
      longitude: d.location.coordinates[1],
      name: d.summary.total,
    },
    {
      key: d.name + " north",
      latitude: d.north.location.coordinates[1],
      longitude: d.north.location.coordinates[0],
      name: d.north.name,
    },
    {
      key: d.name + " south",
      latitude: d.south.location.coordinates[1],
      longitude: d.south.location.coordinates[0],
      name: d.south.name,
    },
    {
      key: d.name + " east",
      latitude: d.east.location.coordinates[1],
      longitude: d.east.location.coordinates[0],
      name: d.east.name,
    },
    {
      key: d.name + " west",
      latitude: d.west.location.coordinates[1],
      longitude: d.west.location.coordinates[0],
      name: d.west.name,
    },
  ];
};

export const CountingStatistic = (data) => {
  const date = new Date(data.date);
  return [
    { title: "Total de ciclistas", value: data.summary.total },
    { title: "Pico em 1h", value: data.summary.hour_max },
    { title: "Data da Contagem", value: date.toLocaleDateString() },
    {
      type: "LinksBox",
      title: "Dados",
      value: [
        { label: "XLSX", url: data.summary.download_xlsx_url },
        {
          label: "JSON",
          url: `https://api.contagem.ameciclo.org/v1/cyclist-count/${data._id}`,
        },
      ],
    },
  ];
};

export function getCountingCards(data) {
  return [
    { label: "Mulheres", icon: "women", data: data.summary.women_percent },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: data.summary.children_percent,
    },
    { label: "Capacete", icon: "helmet", data: data.summary.helmet_percent },
    { label: "Serviço", icon: "service", data: data.summary.service_percent },
    { label: "Cargueira", icon: "cargo", data: data.summary.cargo_percent },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: data.summary.wrong_way_percent,
    },
    { label: "Calçada", icon: "sidewalk", data: data.summary.sidewalk_percent },
  ];
}
