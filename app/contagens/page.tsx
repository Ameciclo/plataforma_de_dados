import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatisticsBox } from "../components/StatisticsBox";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { CardsSession } from "../components/CardsSession";
import { Map } from "../components/Maps/Map";
import { ContagensTable } from "./useclient";
import { InfoCards } from "../components/InfoCards";
import { groupBy } from "../../utils";
import {
  COUNTINGS_DATA,
  COUNTINGS_SUMMARY_DATA,
  COUNTINGS_PAGE_DATA,
} from "../../servers";
import { allCountsStatistics, CardsData } from "./configuration";
import { pointData } from "../../typings";

const crumb = {
  label: "Contagens",
  slug: "/contagens",
  routes: ["/", "/contagens"],
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_DATA, { cache: "no-cache" });
  const dataJson = await dataRes.json();
  const data = dataJson.data;

  const summaryDataRes = await fetch(COUNTINGS_SUMMARY_DATA, {
    cache: "no-cache",
  });
  const summaryDataJson = await summaryDataRes.json();
  const summaryData = summaryDataJson.data[0];

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageData = await pageDataRes.json();

  return { data, summaryData, pageData };
};

export default async function Contagens() {
  const { data, summaryData, pageData } = await fetchData();
  const { cover, description, objective, archives } = pageData;
  const pointsData: pointData[] = data.map((d) => ({
    key: d._id,
    latitude: d.location.coordinates[0],
    longitude: d.location.coordinates[1],
    name: d.name,
  }));
  const countsGroupedByLocation = groupBy(data, (count) => count.name);
  const countsGroupedArray = Object.entries(countsGroupedByLocation);
  const cards = CardsData(summaryData);
  const docs = archives.map((a) => {
    return {
      title: a.filename,
      description: a.description,
      src: a.image?.url,
      url: a.file.url,
    };
  });
  return (
    <>
      <NavCover title="Contagens de ciclistas" src={cover.url} />
      <Breadcrumb {...crumb} />
      <StatisticsBox
        title={"Estatísticas Gerais"}
        boxes={allCountsStatistics(summaryData, countsGroupedArray.length)}
      />
      <ExplanationBoxes
        boxes={[
          {
            title: "O que é?",
            description: description,
          },
          { title: "E o que mais?", description: objective },
        ]}
      />
      <InfoCards cards={cards} />
      <Map pointsData={pointsData} />
      <ContagensTable data={data} />
      <CardsSession
        title={"Documentos para realizar contagens de ciclistas."}
        cards={docs}
      />
    </>
  );
}
