import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxesIdeciclo } from "../components/ExplanationBoxIdeciclo";
import IdecicloClientSide from "./useclient";
import { allCitiesStatistics } from "./configuration";
import { IDECICLO_DATA, IDECICLO_PAGE_DATA, IDECICLO_STRUCTURES_DATA } from "../../servers";
import { NavCoverIdeciclo } from "../components/NavCoverIdeciclo";
import { StatisticsBoxIdeciclo } from "../components/StatisticsBoxIdeciclo";

const crumb = {
  label: "IDECICLO",
  slug: "/ideciclo",
  routes: ["/", "/ideciclo"],
};

const fetchData = async () => {
  const idecicloRes = await fetch(IDECICLO_DATA, { cache: "no-cache" });
  const ideciclo = await idecicloRes.json();

  const structuresRes = await fetch(IDECICLO_STRUCTURES_DATA, {
    cache: "no-cache",
  });
  const structures = await structuresRes.json();

  const pageDataRes = await fetch(IDECICLO_PAGE_DATA, { cache: "no-cache" });
  const pageData = await pageDataRes.json();

  return { ideciclo, structures, pageData };
};

const Ideciclo = async () => {
  const { ideciclo, structures, pageData } = await fetchData();
  const cidades = ideciclo.filter((c) => c.reviews.length > 0);

  return (
    <>
      <NavCoverIdeciclo title="Índice de desenvolvimento cicloviário" src="/pages_covers/ideciclo-navcover.png" />
      <Breadcrumb {...crumb} customColor="bg-gray-400" />
      {/* LOGO ABAIXO */}
      {/* <div className="mx-auto my-12">
        <img src="/ideciclo/ideciclo-logo.png" alt="Logomarca" />
      </div> */}
      <StatisticsBoxIdeciclo
        title={"Estatísticas Gerais"}
        boxes={allCitiesStatistics(cidades, structures)}
      />
      <ExplanationBoxesIdeciclo
        boxes={[
          {
            title: "O que é?",
            description: pageData.description,
          },
          {
            title: "Para que serve?",
            description: pageData.objective,
          },
          {
            title: "Metodologia",
            description: pageData.methodology,
          },
        ]}
      />
      <IdecicloClientSide
        cidades={cidades}
        structures={structures}
        ideciclo={ideciclo}
      />
      
    </>
  );
};


export default Ideciclo;
