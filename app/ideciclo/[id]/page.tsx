import React from "react";
import { NavCoverIdeciclo } from "../../components/NavCoverIdeciclo";
import { Breadcrumb } from "../../components/Breadcrumb";
import { StatisticsBoxIdecicloDetalhes } from "../../components/StatisticsBoxIdeciclo";
import { IdecicloDescription } from "./IdecicloDescription";
import { Map } from "../../components/Maps/Map";
import { RadarChart } from "../../components/Charts/RadarChart";
import { VerticalStatisticsBoxesIdeciclo } from "../../components/VerticalStatisticsBoxesIdeciclo";
import {
  IDECICLO_FORMS_DATA,
  IDECICLO_PAGE_DATA,
  IDECICLO_STRUCTURES_DATA,
} from "../../../servers";
import {
  structureStatistics,
  getStructureMap,
  getRatesSummary,
} from "./configuration";
import { idecicloLayers } from "./ideciclo_mapstyle";
import * as GEOJSON from "geojson";

const fetchUniqueData = async (id: string) => {
  const res = await fetch(IDECICLO_STRUCTURES_DATA + "/" + id);
  const data = await res.json();
  return data;
};

const fetchData = async (id, structure) => {
  /// COLOCAR EM REVIEW NO Back
  const new_review_form_id =
    structure.reviews[structure.reviews.length - 1].segments[0].form_id;

  const formres = await fetch(IDECICLO_FORMS_DATA + "/" + new_review_form_id, {
    cache: "no-cache",
  });

  const forms = await formres.json();

  let last_review_form_id = null;
  if (structure.reviews.length > 1)
    last_review_form_id =
      structure.reviews[structure.reviews.length - 2].segments[0].form_id;

  const pageDataRes = await fetch(IDECICLO_PAGE_DATA, { cache: "no-cache" });
  const pageData = await pageDataRes.json();

  return { forms, pageData };
};

const Ideciclo = async ({ params }) => {
  const data = await fetchUniqueData(params.id);
  const { forms, pageData } = await fetchData(params.id, data);
  const page_data = {
    title: data.street,
    src: pageData.cover.url,
  };

  const crumb = {
    label: data.street,
    slug: data.id.toString(),
    routes: ["/", "/ideciclo", data.id],
  };

  const info = getRatesSummary(data, forms);
  const mapData = getStructureMap(data) as
    | GeoJSON.Feature<GeoJSON.Geometry>
    | GeoJSON.FeatureCollection<GeoJSON.Geometry>
    | string;
  const GeneralStatistics = structureStatistics(data, info);

  return (
    <>
      <NavCoverIdeciclo {...page_data} src="/pages_covers/ideciclo-navcover.png" />
      <Breadcrumb {...crumb} customColor="bg-gray-400" />
      <StatisticsBoxIdecicloDetalhes
        title={GeneralStatistics.title}
        subtitle={GeneralStatistics.subtitle}
        boxes={GeneralStatistics.boxes}
      />
      <div className="w-full relative z-[-1]  translate-y-[-500px] md:translate-y-[-320px] bg-amber-300">
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-10 mt-[500px] md:mt-[300px] mb-[100px]">
          <div className="rounded bg-white shadow-2xl">
            <IdecicloDescription info={info} />
          </div>
          <div className="bg-green-200 rounded shadow-2xl">
            <Map
              layerData={mapData}
              layersConf={idecicloLayers}
              height={"550px"}
            />
          </div>
          <div className="rounded bg-white shadow-2xl">
            <RadarChart
              {...info}
              title={"EVOLUÇÃO DA NOTA"}
              subtitle={"Notas que compõem a média"}
            />
          </div>
        </section>
      </div>
      <VerticalStatisticsBoxesIdeciclo
        title={"Detalhamento e composição das notas"}
        boxes={info.parametros}
      />
    </>
  );
};

export default Ideciclo;
