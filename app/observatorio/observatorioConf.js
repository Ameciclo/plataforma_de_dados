export const generalStatistics = (data) => {
    return (
        {
            title: "Execução Cicloviária",
            subtitle: "da Região Metropolitana do Recife",
            boxes: [
              {
                title: "estrutura cicloviárias",
                unit: "km",
                value: (data.kms.pdc_feito + data.kms.out_pdc).toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }),
              },
              {
                title: "projetada no plano cicloviário",
                unit: "km",
                value: data.kms.pdc_total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }),
              },
              {
                title: "implantados no plano cicloviário",
                unit: "km",
                value: data.kms.pdc_feito.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }),
              },
              {
                title: "cobertos do plano cicloviário",
                value: (data.kms.pdc_feito / data.kms.pdc_total).toLocaleString(
                  "pt-BR",
                  {
                    style: "percent",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }
                )
              }
            ]
          }
    )
}

const PDCLayer = {
    id: "Não executado no PDC",
    type: "line",
    paint: {
      "line-color": "#000000",
      "line-opacity": 0.5,
      "line-width": 2,
    },
    filter: ["==", "STATUS", "Projeto"],
  };

  const PDCDoneLayer = {
    id: "Executados dentro do PDC",
    type: "line",
    paint: {
      "line-color": "#008080",
      "line-width": 3,
    },
    filter: ["==", "STATUS", "Realizada"],
  };

  const NotPDC = {
    id: "Executados fora do PDC",
    type: "line",
    paint: {
      "line-color": "#E02F31",
      "line-width": 1.5,
      "line-opacity": 0.8,
      //          'line-dasharray': [2,.5],
    },
    filter: ["==", "STATUS", "NotPDC"],
  };

export const layers = [PDCLayer, PDCDoneLayer, NotPDC];