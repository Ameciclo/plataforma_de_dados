import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { PERFIL_PAGE_DATA } from "../../servers";
import PerfilClientSide from "./useclient";

const crumb = {
  label: "Perfil Ciclista",
  slug: "/perfil",
  routes: ["/", "/perfil"],
};

const fetchData = async () => {
  const pageDataRes = await fetch(PERFIL_PAGE_DATA, { cache: "no-cache" });
  const pageData = await pageDataRes.json();
  return pageData;
};

const Perfil = async () => {
  const pageData = await fetchData();

  return (
    <>
      <NavCover
        title="Pesquisa Perfil Ciclista"
        src={pageData.cover.url}
      />
      <Breadcrumb {...crumb} />
      <ExplanationBoxes
        boxes={[
          {
            title: "O que é?",
            description: pageData.description,
          },
          {
            title: "Para o que serve?",
            description: pageData.objective,
          },
        ]}
      />
      <PerfilClientSide />
    </>
  );
};

export default Perfil;
