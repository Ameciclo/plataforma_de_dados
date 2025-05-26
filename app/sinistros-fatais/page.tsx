import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { Map } from "../components/Maps/Map";
import ObservatorioClientSide from "./useclient";
import { CardsData, layersConf, vehicleCards } from "./configuration";
import {
  IntlNumber1Digit,
  IntlNumber3Digit,
  IntlNumberMax1Digit,
  IntlNumberNoDigit,
  IntlPercentil,
} from "../../utils";
import {
  SINISTROS_GEOJSON_DATA,
  SINISTROS_STREETS_SUMMARY_DATA,
  SINISTROS_SUMMARY_DATA,
  SINISTROS_VEHICLES_DATA,
} from "../../servers";
import { sinistros_page_data } from "../../public/dbs/todb_observatorio";
import { InfoCards } from "../components/InfoCards";

const fetchData = async () => {
  const summaryRes = await fetch(SINISTROS_SUMMARY_DATA, {
    cache: "no-cache",
  });
  const summary = await summaryRes.json();

  const vehiclesRes = await fetch(SINISTROS_VEHICLES_DATA, {
    cache: "no-cache",
  });
  const vehicles = await vehiclesRes.json();

  const geojsonRes = await fetch(SINISTROS_GEOJSON_DATA, {
    cache: "no-cache",
  });
  const geojson = await geojsonRes.json();

  const streetsRes = await fetch(SINISTROS_STREETS_SUMMARY_DATA, {
    cache: "no-cache",
  });
  const streets = await streetsRes.json();

  return { summary, vehicles, geojson, streets };
};

export default async function ObservatorioSinistrosPage() {
  const { summary, vehicles, geojson, streets } = await fetchData();

  const cards = CardsData(vehicles, summary.totalVitimas);

  return (
    <>
      <NavCover
        title={sinistros_page_data.title}
        src={sinistros_page_data.cover_image_url}
      />
      <Breadcrumb
        label="Observatório de Sinistros"
        slug="/observatorio-sinistros"
        routes={["/", "/observatorio-sinistros"]}
      />
      <StatisticsBox
        title="Sinistros de Trânsito"
        subtitle="Dados da CTTU - Recife (2016–2024)"
        boxes={[
          {
            title: "Total de sinistros",
            value: IntlNumberNoDigit(summary.totalSinistros),
            unit: "",
          },
          {
            title: "Total Vítimas (Fatais e Não)",
            value: IntlNumberNoDigit(summary.totalVitimas),
            unit: "",
          },
          // { title: "Fatais", value: summary.totalVitimasFatais, unit: "" },
          {
            title: "Vítimas em 2024//",
            value: IntlNumberNoDigit(summary.mediaAnual),
            unit: "",
          },
          {
            title: "Crescimento com relação a 2023",
            value: IntlPercentil(summary.crescimentoAno / 100),
            unit: "%",
          },
        ]}
      />
      <ExplanationBoxes
        boxes={[
          {
            title: "O que é?",
            description:
              "Distribuição espacial dos sinistros ao longo do tempo.",
          },
          {
            title: "Que dados são esses?",
            description: "Quantidade de sinistros por categoria de veículo.",
          },
        ]}
      />
      <InfoCards cards={cards} />s
      {/*      <Map layerData={geojson} layersConf={layersConf} />
       */}
      <ObservatorioClientSide streets={streets} />
    </>
  );
}
