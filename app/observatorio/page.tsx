import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBox } from "../components/ExplanationBox";
import { StatisticsBox } from "../components/StatisticsBox";
import { StructureMap } from "../components/Maps/StructureMap";
import { CardsSession } from "../components/CardsSession";
import data from "../../public/temp_folder/observatorio-data.json";
import { documents, page_data } from "./todb";
import { layers, generalStatistics } from "./observatorioConf";
import ObservatorioCitiesSession from "./ObservatorioCitiesSession";
//import EvalolutionGraph from

const crumb = {
  label: "Observatório",
  slug: "/observatorio",
  routes: ["/", "/observatorio"],
};

export default async function Observatorio() {
  const ciclos = data.map;
  const statistics = generalStatistics(data);

  const cities = data.kms.municipios.map((m, index) => ({
    id: index,
    name: m.name,
    km_projected: m.pdc_total,
    km_completed: m.pdc_feito,
    km_ciclos: m.out_pdc + m.pdc_feito,
    percentil: (m.pdc_feito / m.pdc_total) * 100,
    ways: m.vias,
  }));
  return (
    <>
      <NavCover
        props={{
          title: page_data.title,
          src: page_data.cover_image_url,
        }}
      />
      <Breadcrumb props={crumb} />
      <StatisticsBox
        title={statistics.title}
        subtitle={statistics.subtitle}
        boxes={statistics.boxes}
      />
      <ExplanationBox
        props={[
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
      <StructureMap props={{ map: ciclos, layers: layers }} />
      <ObservatorioCitiesSession cities={cities} inicialCity={"Recife"} />
      <CardsSession title={documents.title} cards={documents.cards} />
    </>
  );
}
