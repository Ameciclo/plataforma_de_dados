import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { StatisticsBox } from "../components/StatisticsBox";
import { Map } from "../components/Maps/Map";
import { CardsSession } from "../components/CardsSession";
import ObservatorioClientSide from "./useclient";
import { documents, page_data } from "../../public/dbs/todb_observatorio";
import {
  layersConf,
  cycleStructureExecutionStatistics,
  cityCycleStructureExecutionStatisticsByCity,
} from "./configuration";
import { LayerProps } from "react-map-gl";
import {
  OBSERVATORY_DATA,
  OBSERVATORY_DATA_ALL_WAYS,
  OBSERVATORY_DATA_WAYS_SUMMARY,
  CITIES_DATA,
} from "../../servers";

const crumb = {
  label: "Observatório",
  slug: "/observatorio",
  routes: ["/", "/observatorio"],
};

const fetchData = async () => {
  const allWaysRes = await fetch(OBSERVATORY_DATA_ALL_WAYS, {
    cache: "no-cache",
  });
  const allWaysData = await allWaysRes.json();
  const summaryWaysRes = await fetch(OBSERVATORY_DATA_WAYS_SUMMARY, {
    cache: "no-cache",
  });
  const summaryWaysData = await summaryWaysRes.json();
  const citiesRes = await fetch(CITIES_DATA);
  const citiesData = await citiesRes.json();
  const relationsByCityRes = await fetch(OBSERVATORY_DATA);
  const relationsByCityData = await relationsByCityRes.json();
  return { allWaysData, summaryWaysData, citiesData, relationsByCityData };
};

export default async function Observatorio() {
  const {
    allWaysData,
    citiesData,
    summaryWaysData,
    relationsByCityData,
  } = await fetchData();

  const allCitiesLayer = allWaysData.all as
    | GeoJSON.Feature<GeoJSON.Geometry>
    | GeoJSON.FeatureCollection<GeoJSON.Geometry>
    | string;

  const citiesStats = cityCycleStructureExecutionStatisticsByCity(
    summaryWaysData.byCity,
    citiesData,
    relationsByCityData
  );

  return (
    <>
      <NavCover
        title="Observatório cicloviário"
        src={page_data.cover_image_url}
      />
      <Breadcrumb {...crumb} customColor = "bg-ameciclo" />
      <StatisticsBox
        title={"Execução Cicloviária"}
        subtitle={"da Região Metropolitana do Recife"}
        boxes={cycleStructureExecutionStatistics(summaryWaysData.all)}
      />
      <ExplanationBoxes
        boxes={[
          {
            title: page_data.ExplanationBoxData.title_1,
            description: page_data.ExplanationBoxData.text_1,
          },
          {
            title: page_data.ExplanationBoxData.title_2,
            description: page_data.ExplanationBoxData.text_2,
          },
        ]}
      />
      <Map layerData={allCitiesLayer} layersConf={layersConf as LayerProps[]} />
      <ObservatorioClientSide
        citiesStats={citiesStats}
        inicialCity={"Recife"}
      />
      <CardsSession title={documents.title} cards={documents.cards} />
    </>
  );
}
