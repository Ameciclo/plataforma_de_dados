
export function getGeneralStatistics(structure, info) {
  return {
    title: structure.street,
    subtitle: "Visão geral",
    boxes: [
      {
        title: "Nota geral",
        value: ("" + info.nota.toFixed(1)).replace(".", ","),
      },
      {
        title: "Extensão (km)",
        value: (info.comprimento / 1000).toFixed(2).replace(".", ","),
      },
      { title: "Avaliações", value: info.avaliacoes },
    ],
  };
}
