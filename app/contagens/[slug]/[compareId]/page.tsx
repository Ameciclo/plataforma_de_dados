import { NavCover } from "../../../components/NavCover";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { COUNTINGS_DATA_NEW, COUNTINGS_PAGE_DATA } from "../../../../servers";
import {
  getBoxesForCountingComparision,
  getPointsDataForComparingCounting,
  getPointsDataForSingleCounting,
} from "./configuration";
import { VerticalStatisticsBoxes } from "../../../components/VerticalStatisticsBoxes";
import { Map } from "../../../components/Maps/Map";
import { CountingComparisionTable, HourlyCyclistsChart } from "./useclient";

const fetchUniqueData = async (slug: string) => {
  const id = slug.split("-")[0];

  const res = await fetch(COUNTINGS_DATA_NEW + "?id=" + id, { cache: "no-cache" });
  const data = await res.json();
  return data;
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_DATA_NEW, { cache: "no-cache" });
  const dataJson = await dataRes.json();
  const otherData = dataJson.data;

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover, otherData };
};

export default async function Compare({ params }) {
  const toCompare = [params.slug].concat(params.compareId.split("_COMPARE_"));
  const data = await Promise.all(
    toCompare.map(async (d) => {
      const result = await fetchUniqueData(d);
      return result;
    })
  );

  const { pageCover, otherData } = await fetchData();
  let pageData = {
    title: "Comparação de contagens",
    src: pageCover.cover.url,
  };

  const label = data
    .reduce(
      (a, c) => (a += c.name + " (" + c.date.substring(0, 4) + ") e "),
      "COMPARAÇÃO ENTRE: "
    )
    .slice(0, -3);

  const crumb = {
    label: "Comparação entre contagens",
    slug: params.compareId,
    routes: ["/", "/contagens", params.compareId],
  };

  // const boxes = getBoxesForCountingComparision(data);
  // const pointsData = getPointsDataForComparingCounting(data);

  // const countsByHour = {};

  // data.forEach((countData, index) => {
  //   const countQuantitative = countData.data.quantitative;
  //   Object.keys(countQuantitative).forEach((direction) => {
  //     const directionCounts = countQuantitative[direction].count_per_hour;
  //     Object.keys(directionCounts).forEach((hour) => {
  //       const count = directionCounts[hour];
  //       countsByHour[index] = countsByHour[index] || {};
  //       countsByHour[index][hour] = (countsByHour[index][hour] || 0) + count;
  //     });
  //   });
  // });

  // const chartData = data.map((d, index) => ({
  //   name: d.name,
  //   data: Object.values(countsByHour[index]),
  // }));

  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      {/* <VerticalStatisticsBoxes
        title={"Comparação entre as contagens"}
        boxes={boxes}
      />
      <Map pointsData={pointsData} />
      <HourlyCyclistsChart series={chartData} />
      <CountingComparisionTable data={otherData} ids={toCompare} /> */}
    </main>
  );
}
