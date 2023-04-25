import { NavCover } from "../../components/NavCover";
import { Breadcrumb } from "../../components/Breadcrumb";
import { StatisticsBox } from "../../components/StatisticsBox";
import { Map as PointMap } from "../../components/Maps/Map";
import { FlowContainer } from "../../components/FlowChart/FlowContainer";
import { InfoCards } from "../../components/InfoCards";
import { HourlyCyclistsChart } from "./useclient";
import {
  CountingStatistic,
  getPointsDataForSingleCounting,
  getCountingCards,
} from "./configuration";
import { pointData } from "../../../typings";
import { COUNTINGS_DATA, COUNTINGS_PAGE_DATA } from "../../../servers";

const fetchUniqueData = async (id: string) => {
  const res = await fetch(COUNTINGS_DATA + "/" + id);
  const { cyclistCount } = await res.json();
  return cyclistCount;
};

const fetchData = async () => {
  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageData = await pageDataRes.json();
  return pageData;
};

const Contagem = async ({ params }) => {
  const data = await fetchUniqueData(params.id);
  const pageCover = await fetchData();
  let pageData = {
    title: data.name,
    src: pageCover.cover.url,
  };

  const crumb = {
    label: data.name,
    slug: data._id,
    routes: ["/", "/contagens", data._id],
  };

  const pointsData = getPointsDataForSingleCounting(data) as pointData[];
  const cards = getCountingCards(data);
  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      <StatisticsBox title={data.name} boxes={CountingStatistic(data)} />
      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10">
        <div
          className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
          style={{ minHeight: "400px" }}
        >
          <PointMap pointsData={pointsData} height="400px"/>
        </div>
        <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
          <FlowContainer count={data} />
        </div>
      </section>
      <InfoCards cards={cards} />
      <HourlyCyclistsChart cyclistCount={data} />
    </main>
  );
};

export default Contagem;
