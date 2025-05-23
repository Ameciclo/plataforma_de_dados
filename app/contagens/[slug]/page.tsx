import { NavCover } from "../../components/NavCover";
import { Breadcrumb } from "../../components/Breadcrumb";
import { StatisticsBox } from "../../components/StatisticsBox";
import { Map as PointMap } from "../../components/Maps/Map";
import { FlowContainer } from "../../components/FlowChart/FlowContainer";
import { InfoCards } from "../../components/InfoCards";
import { CountingComparisionTable } from "./useclient";
import { HourlyCyclistsChart } from "../../components/HourlyCyclistsChart";
import {
  CountingStatistic,
  getPointsData,
  getCountingCards,
  getChartData,
} from "./configuration";
import { pointData, CountEdition, Series } from "../../../typings";
import {
  COUNTINGS_SUMMARY_DATA,
  COUNTINGS_DATA,
  COUNTINGS_PAGE_DATA,
} from "../../../servers";

const fetchUniqueData = async (slug: string) => {
  const id = slug.split("-")[0];
  const URL = COUNTINGS_DATA + "/" + id;
  const res = await fetch(URL, {
    cache: "no-cache",
  });
  const responseJson = await res.json();
  return responseJson;
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_SUMMARY_DATA, {
    cache: "no-cache",
  });
  const dataJson = await dataRes.json();
  const otherCounts = dataJson.counts;

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover, otherCounts };
};

const Contagem = async ({ params }) => {
  const data: CountEdition = await fetchUniqueData(params.slug);
  const { pageCover, otherCounts } = await fetchData();
  let pageData = {
    title: data.name,
    src: pageCover.cover.url,
  };

  const crumb = {
    label: data.name,
    slug: params.slug,
    routes: ["/", "/contagens", params.slug],
    customColor: "bg-ameciclo",
  };
  const pointsData = getPointsData(data) as pointData[];
  const { series, hours } = getChartData(data.sessions);

  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} customColor="bg-ameciclo" />
      <StatisticsBox title={data.name} boxes={CountingStatistic(data)} />
      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10">
        <div
          className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
          style={{ minHeight: "400px" }}
        >
          <PointMap pointsData={pointsData} height="400px" />
        </div>
        <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
          <FlowContainer data={data} />
        </div>
      </section>
      <InfoCards cards={getCountingCards(data.summary)} />
      <HourlyCyclistsChart series={series as Series[]} hours={hours} />
      <CountingComparisionTable
        data={otherCounts.filter((d) => d.id !== data.id)}
        firstSlug={params.slug}
      />
    </main>
  );
};

export default Contagem;
