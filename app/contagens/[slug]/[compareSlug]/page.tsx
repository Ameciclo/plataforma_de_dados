import { NavCover } from "../../../components/NavCover";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { COUNTINGS_DATA_NEW, COUNTINGS_PAGE_DATA, COUNTINGS_SUMMARY_DATA_NEW } from "../../../../servers";
import {
  getBoxesForCountingComparision,
  getPointsDataForComparingCounting,
  getChartData,
} from "./configuration";
import { VerticalStatisticsBoxes } from "../../../components/VerticalStatisticsBoxes";
import { Map } from "../../../components/Maps/Map";
import { CountingComparisionTable } from "./useclient";
import {HourlyCyclistsChart} from "../../../components/HourlyCyclistsChart"
import { Series } from "../../../../typings";


const fetchUniqueData = async (slug: string) => {
  const id = slug.split("-")[0];

  const res = await fetch(COUNTINGS_DATA_NEW + "?id=" + id, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_SUMMARY_DATA_NEW, { cache: "no-cache" });
  const dataJson = await dataRes.json();
  const otherCounts = dataJson.counts;

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover, otherCounts };
};

export default async function Compare({ params }) {
  const toCompare = [params.slug].concat(params.compareSlug.split("_COMPARE_"));
  const data = await Promise.all(
    toCompare.map(async (d) => {
      const result = await fetchUniqueData(d);
      return result;
    })
  );

  const { pageCover, otherCounts } = await fetchData();
  let pageData = {
    title: "Comparação de contagens",
    src: pageCover.cover.url,
  };

  const crumb = {
    label: "Comparação entre contagens",
    slug: params.compareSlug,
    routes: ["/", "/contagens", params.compareSlug],
  };

  const boxes = getBoxesForCountingComparision(data);
  const pointsData = getPointsDataForComparingCounting(data);
  const {series, hours} = getChartData(data);
  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      <VerticalStatisticsBoxes
        title={"Comparação entre as contagens"}
        boxes={boxes}
      />
      <Map pointsData={pointsData} />
      <HourlyCyclistsChart series={series as Series[]} hours={hours} /> {/* Modo de comparação */}
      <CountingComparisionTable data={otherCounts} ids={toCompare} />
    </main>
  );
}
