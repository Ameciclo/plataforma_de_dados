import React from "react";
import { StatisticsBox } from "../../components/StatisticsBox";
import { VerticalStatisticsBoxes } from "../../components/VerticalStatisticsBoxes";
import { StructureMap, StructureRadar } from "./useclient";
import {
  IDECICLO_FORMS_DATA,
  IDECICLO_PAGE_DATA,
  IDECICLO_STRUCTURES_DATA,
} from "../../../servers";
import { IdecicloDescription } from "./IdecicloDescription";
import {
  getGeneralStatistics,
  get_map_data,
  rates_organization,
} from "./configuration";
import { NavCover } from "../../components/NavCover";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Map } from "../../components/Maps/Map";
import mapStyle, { idecicloLayers } from "./ideciclo_mapstyle";

const fetchUniqueData = async (id: string) => {
  const res = await fetch(IDECICLO_STRUCTURES_DATA + "/" + id);
  const data = await res.json();
  return data;
};

// export async function getStaticPaths() {
//   const res = await fetch(IDECICLO_STRUCTURES_DATA);
//   const allstructs = await res.json();
//   const rec_structs = allstructs.filter((s) => s.city_id === 1);
//   // Get the paths we want to pre-render based on posts
//   const paths = rec_structs.map((s: any) => ({
//     params: { ideciclo: s.id },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const res = await fetch(IDECICLO_STRUCTURES_DATA + "/" + params.ideciclo);

//   let structure = await res.json();
//   // iterar sobre reviews
//   // map ou foreach
//   // cada review

//   /// COLOCAR EM REVIEW NO Back
//   const new_review_form_id =
//     structure.reviews[structure.reviews.length - 1].segments[0].form_id;

//   const formres = await fetch(IDECICLO_FORMS_DATA + "/" + new_review_form_id);

//   const forms = await formres.json();

//   let last_review_form_id = null;
//   if (structure.reviews.length > 1)
//     last_review_form_id =
//       structure.reviews[structure.reviews.length - 2].segments[0].form_id;

//   return {
//     props: {
//       structure: structure,
//       forms: forms,
//     },
//     revalidate: 1,
//   };
// }

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

  const info = rates_organization(data, forms);
  const mapData = get_map_data(data);
  const GeneralStatistics = getGeneralStatistics(data, info);

  return (
    <>
      <NavCover {...page_data} />
      <Breadcrumb {...crumb} />
      <StatisticsBox
        title={GeneralStatistics.title}
        subtitle={GeneralStatistics.subtitle}
        boxes={GeneralStatistics.boxes}
      />
      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="rounded shadow-2xl">
          <IdecicloDescription info={info} />
        </div>
        <div className="bg-green-200 rounded shadow-2xl">
          <Map layerData={mapData} layersConf = {idecicloLayers}/>
          <StructureMap data={mapData} />
        </div>
        <div className="rounded shadow-2xl">
          <StructureRadar {...info} />
        </div>
      </section>
      <VerticalStatisticsBoxes
        title={"Detalhamento e composição das notas"}
        boxes={info.parametros}
      />
    </>
  );
};

export default Ideciclo;
