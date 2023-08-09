import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { StatisticsBox } from "../components/StatisticsBox";
import { Map } from "../components/Maps/Map";
import { CardsSession } from "../components/CardsSession";
import ObservatorioClientSide from "./useclient";
import data from "../../public/dbs/observatorio-data.json";
import { documents, page_data } from "../../public/dbs/todb_observatorio";
import {
  layersConf,
  cycleStructureExecutionStatistics,
  cityCycleStructureExecutionStatisticsByCity,
  combineFeatures,
} from "./configuration";
import { LayerProps } from "react-map-gl";
import {
  OBSERVATORY_DATA,
  OBSERVATORY_DATA_WAYS,
  CITIES_DATA,
} from "../../servers";

//import EvalolutionGraph from

const crumb = {
  label: "Observatório",
  slug: "/observatorio",
  routes: ["/", "/observatorio"],
};

const fetchData = async () => {
  const pdcRes = await fetch(OBSERVATORY_DATA);
  const pdcData = await pdcRes.json();
  const waysRes = await fetch(OBSERVATORY_DATA_WAYS, { cache: "no-cache" });
  const waysData = await waysRes.json();
  const citiesRes = await fetch(CITIES_DATA);
  const citiesData = await citiesRes.json();
  return { pdcData, waysData, citiesData };
};

export default async function Observatorio() {
  const { pdcData, waysData, citiesData } = await fetchData();
  const citiesStats = await cityCycleStructureExecutionStatisticsByCity(
    waysData,
    citiesData
  );
  return (
    <>
      <NavCover
        title="Observatório cicloviário"
        src={page_data.cover_image_url}
      />
      <Breadcrumb {...crumb} />
      <StatisticsBox
        title={"Execução Cicloviária"}
        subtitle={"da Região Metropolitana do Recife"}
        boxes={cycleStructureExecutionStatistics(waysData)}
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
      <Map
        layerData={
          combineFeatures(waysData) as
            | GeoJSON.Feature<GeoJSON.Geometry>
            | GeoJSON.FeatureCollection<GeoJSON.Geometry>
            | string
        }
        layersConf={layersConf as LayerProps[]}
      />
      <ObservatorioClientSide
        citiesStats={citiesStats}
        inicialCity={"Recife"}
      />
      <CardsSession title={documents.title} cards={documents.cards} />
    </>
  );
}
