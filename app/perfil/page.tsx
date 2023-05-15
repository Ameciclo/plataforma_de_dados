import React from "react";
import { sql } from "@vercel/postgres";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { PERFIL_PAGE_DATA } from "../../servers";
import PerfilClientSide from "./useclient";
import { CardsData, getGeneralStatistics } from "./configuration";
import { StatisticsBox } from "../components/StatisticsBox";
import { InfoCards } from "../components/InfoCards";

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
  const summary_res = await sql`SELECT 
                                  cyclist_profile.year AS year,
                                  total_questionaries,
                                  percent_week_at_least_5_days,
                                  percent_collisions
                                FROM 
                                  summary
                                JOIN 
                                  cyclist_profile ON summary.id = cyclist_profile.id
                                WHERE 
                                  cyclist_profile.city = ${id}
                                ORDER BY 
                                  cyclist_profile.year DESC
                                `;
  const summaryData = summary_res.rows;
  const total_editions = summary_res.rowCount;
  const total_forms = summary_res.rows.reduce(
    (a, c) => (a += c.total_questionaries),
    0
  );
  const last_year = summary_res.rows[0].year;
  const last_year_forms = summary_res.rows[0].total_questionaries;
  const age_res = await sql`SELECT
                              cyclist_profile.year AS year,
                              c.name AS category,
                              sd.value
                            FROM 
                              summary.age_distribution sd
                            JOIN 
                              cyclist_profile ON sd.summary_id = cyclist_profile.id
                            JOIN 
                              categories.age c ON sd.category_id = c.id
                            WHERE 
                              cyclist_profile.city = ${id}`;
  const schooling_res = await sql`SELECT 
                                    cyclist_profile.year AS year,
                                    c.name AS category,
                                    sd.value
                                  FROM 
                                    summary.schooling_distribution sd
                                  JOIN 
                                    cyclist_profile ON sd.summary_id = cyclist_profile.id
                                  JOIN 
                                    categories.schooling c ON sd.category_id = c.id
                                  WHERE 
                                    cyclist_profile.city = ${id}`;
  const color_race_res = await sql`SELECT 
                                    cyclist_profile.year AS year,
                                    c.name AS category,
                                    sd.value
                                  FROM 
                                    summary.color_race_distribution sd
                                  JOIN 
                                    cyclist_profile ON sd.summary_id = cyclist_profile.id
                                  JOIN 
                                    categories.color_race c ON sd.category_id = c.id
                                  WHERE 
                                    cyclist_profile.city = ${id}`;

  const years_using_res = await sql`SELECT 
                                  cyclist_profile.year AS year,
                                  c.name AS category,
                                  sd.value
                                FROM 
                                  summary.years_using_distribution sd
                                JOIN 
                                  cyclist_profile ON sd.summary_id = cyclist_profile.id
                                JOIN 
                                  categories.years_using c ON sd.category_id = c.id
                                WHERE 
                                  cyclist_profile.city = ${id}`;
  const distance_time_res = await sql`SELECT 
                                        cyclist_profile.year AS year,
                                        c.name AS category,
                                        sd.value
                                      FROM 
                                        summary.distance_time_distribution sd
                                      JOIN 
                                        cyclist_profile ON sd.summary_id = cyclist_profile.id
                                      JOIN 
                                        categories.distance_time c ON sd.category_id = c.id
                                      WHERE 
                                        cyclist_profile.city = ${id}`;
  const wage_res = await sql`SELECT 
                                cyclist_profile.year AS year,
                                c.name AS category,
                                sd.value
                              FROM 
                                summary.wage_distribution sd
                              JOIN 
                                cyclist_profile ON sd.summary_id = cyclist_profile.id
                              JOIN 
                                categories.wage c ON sd.category_id = c.id
                              WHERE 
                                cyclist_profile.city = ${id}`;
  const last_years_age = age_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const last_years_schooling = schooling_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const last_years_color_race = color_race_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const last_years_years_using = years_using_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const last_years_distance_time = distance_time_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const last_years_wage = wage_res.rows
    .filter((c) => c.year === last_year)
    .sort((a, b) => b.value - a.value);
  const summaryExtraData = {
    age: last_years_age[0],
    schooling: last_years_schooling[0],
    color_race: last_years_color_race[0],
    years_using: last_years_years_using[0],
    distance_time: last_years_distance_time[0],
    wage: last_years_wage[0],
  };
  const summary = {
    main: summaryData,
    extra: summaryExtraData,
  };
  return {
    total_editions,
    total_forms,
    last_year,
    last_year_forms,
    summary,
  };
}

// Exemplo de uso da função
async function fetchCities() {
  try {
    const cities = await getCities();
    // Faça algo com as cidades retornadas, como passar para o componente Next.
    const recife = cities.find((city) => city.name === "Recife");
    if (recife) {
      const statistics = await getStatistics(recife.id);
      return statistics;
    }
  } catch (error) {
    console.error("Erro ao buscar as cidades:", error);
  }
}

const Perfil = async () => {
  const pageData = await fetchData();
  const GeneralStatistics = await fetchCities();
  const cards = CardsData(GeneralStatistics);

  return (
    <>
      <NavCover title="Pesquisa Perfil Ciclista" src={pageData.cover.url} />
      <Breadcrumb {...crumb} />
      <StatisticsBox
        title={"Estatísticas Gerais"}
        subtitle={"no Recife"}
        boxes={getGeneralStatistics(GeneralStatistics)}
      />
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
      <InfoCards cards={cards} />
      <PerfilClientSide />
    </>
  );
};

export default Perfil;
