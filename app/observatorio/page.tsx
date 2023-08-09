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
  sumKilometersByRelationId,
  combineFeatures,
} from "./configuration";
import { LayerProps } from "react-map-gl";
import { OBSERVATORY_DATA, OBSERVATORY_DATA_WAYS } from "../../servers";

//import EvalolutionGraph from

const crumb = {
  label: "Observatório",
  slug: "/observatorio",
  routes: ["/", "/observatorio"],
};

const fetchData = async () => {
  const pdcRes = await fetch(OBSERVATORY_DATA);
  const pdcData = await pdcRes.json();
  const waysRes = await fetch(OBSERVATORY_DATA_WAYS, {cache: "no-cache"});
  const waysData = await waysRes.json();
  return { pdcData, waysData };
};

export default async function Observatorio() {
  const { pdcData, waysData } = await fetchData();

  const combinedFeatues = combineFeatures(waysData);
  const ciclos = combinedFeatues as
    | GeoJSON.Feature<GeoJSON.Geometry>
    | GeoJSON.FeatureCollection<GeoJSON.Geometry>
    | string;

  // const cities = data.kms.municipios.map((m, index) => ({
  //   id: index,
  //   name: m.name,
  //   km_projected: m.pdc_total,
  //   km_completed: m.pdc_feito,
  //   km_ciclos: m.out_pdc + m.pdc_feito,
  //   percentil: (m.pdc_feito / m.pdc_total) * 100,
  //   ways: m.vias,
  // }));
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
     <Map layerData={ciclos} layersConf={layersConf as LayerProps[]} />
     {/*   <ObservatorioClientSide cities={cities} inicialCity={"Recife"} /> */}
      <CardsSession title={documents.title} cards={documents.cards} />
    </>
  );
}
