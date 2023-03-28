import React from "react";
import { StatisticsBox } from "../../components/StatisticsBox";
import { VerticalStatisticsBoxes } from "../../components/VerticalStatisticsBoxes";
import { StructureMap, StructureRadar } from "./useclient";
import {
  IDECICLO_FORMS_DATA,
  IDECICLO_STRUCTURES_DATA,
} from "../../../servers";

export async function getStaticPaths() {
  const res = await fetch(IDECICLO_STRUCTURES_DATA);
  const allstructs = await res.json();
  const rec_structs = allstructs.filter((s) => s.city_id === 1);
  // Get the paths we want to pre-render based on posts
  const paths = rec_structs.map((s: any) => ({
    params: { ideciclo: s.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(IDECICLO_STRUCTURES_DATA + "/" + params.ideciclo);

  let structure = await res.json();
  // iterar sobre reviews
  // map ou foreach
  // cada review

  /// COLOCAR EM REVIEW NO Back
  const new_review_form_id =
    structure.reviews[structure.reviews.length - 1].segments[0].form_id;

  const formres = await fetch(IDECICLO_FORMS_DATA + "/" + new_review_form_id);

  const forms = await formres.json();

  let last_review_form_id = null;
  if (structure.reviews.length > 1)
    last_review_form_id =
      structure.reviews[structure.reviews.length - 2].segments[0].form_id;

  return {
    props: {
      structure: structure,
      forms: forms,
    },
    revalidate: 1,
  };
}

const Ideciclo = ({ structure, forms }) => {
  const page_data = {
    title: structure.street,
    cover_image_url: "",
  };

  const crumb = {
    label: structure.street,
    slug: structure.id.toString(),
    routes: ["/", "/ideciclo", structure.id],
  };
  let info = rates_organization(structure, forms);

  info.map = get_map_data(structure);
  const GeneralStatistics = getGeneralStatistics(structure, info);

  return (
    <>
      <StatisticsBox
        title={GeneralStatistics.title}
        subtitle={GeneralStatistics.subtitle}
        boxes={GeneralStatistics.boxes}
      />

      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="rounded shadow-2xl">
          <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>DESCRIÇÃO</h3>
              <h3 className="text-2xl mt-2">
                <strong>{info.tipologia.toUpperCase()}</strong>,{" "}
                <strong>{info.fluxo.toUpperCase()}</strong>
                {info.pavimento != null && (
                  <>
                    , com piso de{" "}
                    <strong>
                      {info.pavimento.replace(",", " e").toUpperCase()}
                    </strong>
                  </>
                )}
                {info.tipologia.toUpperCase() != "CICLORROTA" && (
                  <>
                    , localizada{" "}
                    <strong>{info.localizacao.toUpperCase()}</strong>
                  </>
                )}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>LARGURA</h3>
              {info.largura_transitavel >= 0 ? (
                <h3 className="text-3xl  mt-2">
                  <strong>
                    {("" + info.largura_total).replace(".", ",")}m
                  </strong>
                  , onde{" "}
                  <strong>
                    {("" + info.largura_transitavel).replace(".", ",")}m{" "}
                  </strong>
                  são transitáveis
                </h3>
              ) : (
                <h3 className="text-3xl font-bold mt-2">N/A</h3>
              )}
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Última avaliação</h3>
              <h3 className="text-3xl font-bold mt-2">{info.data}</h3>
            </div>
          </div>
        </div>
        <div className="bg-green-200 rounded shadow-2xl">
          <StructureMap />
        </div>
        <div className="rounded shadow-2xl">
          <StructureRadar />
        </div>
      </section>
      <VerticalStatisticsBoxes boxes={info} />
    </>
  );
};

export default Ideciclo;