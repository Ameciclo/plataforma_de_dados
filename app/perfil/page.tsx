import React from "react";
import { sql } from "@vercel/postgres";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { PERFIL_PAGE_DATA } from "../../servers";
import PerfilClientSide from "./useclient";
import { getGeneralStatistics } from "./configuration";
import { StatisticsBox } from "../components/StatisticsBox";

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

// Função para buscar as cidades no banco de dados
async function getCities() {
  const { rows } = await sql`SELECT * FROM city;`;
  return rows;
}

// Função para buscar as cidades no banco de dados
async function getStatistics(id) {
  const total_editions_res = await sql`SELECT COUNT(*) FROM cyclist_profile WHERE city = ${id};`
  const total_editions = total_editions_res.rows[0].count
  const total_forms_res = await sql`SELECT COUNT(*) FROM cyclist_profile_data cpd JOIN cyclist_profile cp ON cp.id = cpd.cyclist_profile_id WHERE cp.city = ${id}`
  const total_forms = total_forms_res.rows[0].count
  const last_year_res = await sql`SELECT MAX(year) FROM cyclist_profile WHERE city = ${id}`
  const last_year = last_year_res.rows[0].max
  const last_year_forms_res = await sql`WITH last_year AS ( SELECT MAX(year) as year FROM cyclist_profile WHERE city = ${id}) SELECT COUNT(*) FROM cyclist_profile_data cpd JOIN cyclist_profile cp ON cp.id = cpd.cyclist_profile_id WHERE cp.city = ${id} AND cp.year = (SELECT year FROM last_year)`
  const last_year_forms = last_year_forms_res.rows[0].count
  return {total_editions, total_forms, last_year, last_year_forms};
}

// Exemplo de uso da função
async function fetchCities() {
  try {
    const cities = await getCities();
    // Faça algo com as cidades retornadas, como passar para o componente Next.
    const recife = cities.find((city) => city.name === "Recife");
    if (recife) {
      const statistics = await getStatistics(recife.id);
      return statistics
    }
  } catch (error) {
    console.error("Erro ao buscar as cidades:", error);
  }
}

const Perfil = async () => {
  const pageData = await fetchData();
  const GeneralStatistics = await fetchCities();

  return (
    <>
      <NavCover title="Pesquisa Perfil Ciclista" src={pageData.cover.url} />
      <Breadcrumb {...crumb} />
      <StatisticsBox title={"Estatísticas Gerais"} subtitle={"no Recife"} boxes={getGeneralStatistics(GeneralStatistics)} />
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
