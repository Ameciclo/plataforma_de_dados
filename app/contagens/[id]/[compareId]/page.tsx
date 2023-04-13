import { NavCover } from "../../../components/NavCover";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { COUNTINGS_DATA, COUNTINGS_PAGE_DATA } from "../../../../servers";
import { getPointsDataForSingleCounting } from "./configuration";
import { VerticalStatisticsBoxes } from "../../../components/VerticalStatisticsBoxes";
import { IntlDateStr, IntlNumber, IntlPercentil } from "../../../../utils";
import { Map } from "../../../components/Maps/Map";
import { pointData } from "../../../../typings";
import { Table } from "../../../components/Table/Table";

const fetchUniqueData = async (id: string) => {
  const res = await fetch(COUNTINGS_DATA + "/" + id, { cache: "no-cache" });
  const data = await res.json();
  return data;
};

const fetchData = async () => {
  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return pageCover;
};

export default async function Compare({ params }) {
  const toCompare = [params.id].concat(params.compareId.split("&"));
  const data = await Promise.all(
    toCompare.map(async (d) => {
      const result = await fetchUniqueData(d);
      return result.cyclistCount;
    })
  );

  const pageCover = await fetchData();
  let pageData = {
    title: "Comparação de contagens",
    src: pageCover.cover.url,
  };

  const label = data
    .reduce(
      (a, c) => (a += c.name + " (" + c.date.substring(0, 4) + ") e "),
      "Comparação entre "
    )
    .slice(0, -3);

  const crumb = {
    label: label,
    slug: params.compareId,
    routes: ["/", "/contagens", params.id, params.compareId],
  };

  const colors = ["#24CBE5", "#E02F31", "#DDDF00", "#6AF9C4"];

  const boxes = data.map((d, index) => {
    return {
      titulo: d.name,
      media: IntlDateStr(d.date),
      color: colors[index],
      parametros: [
        {
          titulo: "Total",
          media: IntlNumber(d.summary.total),
        },
        {
          titulo: "Pico",
          media: IntlNumber(d.summary.hour_max),
        },
        {
          titulo: "Mulheres",
          media: IntlPercentil(d.summary.women_percent),
        },
        {
          titulo: "Crianças e Adolescentes",
          media: IntlPercentil(d.summary.children_percent),
        },
        {
          titulo: "Capacete",
          media: IntlPercentil(d.summary.helmet_percent),
        },
        {
          titulo: "Serviço",
          media: IntlPercentil(d.summary.service_percent),
        },
        {
          titulo: "Cargueira",
          media: IntlPercentil(d.summary.cargo_percent),
        },
        {
          titulo: "Contramão",
          media: IntlPercentil(d.summary.wrong_way_percent),
        },
        {
          titulo: "Calçada",
          media: IntlPercentil(d.summary.sidewalk_percent),
        },
      ],
    };
  });

  const pointsData = data.map((d, index) => {
    const points = getPointsDataForSingleCounting(
      d,
      colors[index]
    ) as pointData[];
    return points[0];
  });

  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      <VerticalStatisticsBoxes title={label} boxes={boxes} />
      <Map pointsData={pointsData} />
    </main>
  );
}
