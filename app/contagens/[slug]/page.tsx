import { NavCover } from "../../components/NavCover";
import { Breadcrumb } from "../../components/Breadcrumb";
import { StatisticsBox } from "../../components/StatisticsBox";
import { Map as PointMap } from "../../components/Maps/Map";
import { FlowContainer } from "../../components/FlowChart/FlowContainer";
import { InfoCards } from "../../components/InfoCards";
import { HourlyCyclistsChart, CountingComparisionTable } from "./useclient";
import {
  CountingStatistic,
  getPointsData,
  getCountingCards,
} from "./configuration";
import { pointData } from "../../../typings";
import {
  COUNTINGS_DATA,
  COUNTINGS_DATA_NEW,
  COUNTINGS_PAGE_DATA,
} from "../../../servers";

const fetchUniqueData = async (slug: string) => {
  const id = slug.split("-")[0];
  const URL = COUNTINGS_DATA_NEW + "?id=" + id;
  console.log("NEWURL: " + URL);
  const res = await fetch(URL);
  const responseJson = await res.json();

  return responseJson;
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_DATA, { cache: "no-cache" });
  const dataJson = await dataRes.json();
  const otherData = dataJson.data;

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover, otherData };
};

const Contagem = async ({ params }) => {
  const data = await fetchUniqueData(params.slug);
  // console.log(JSON.stringify(data));
  const { pageCover, otherData } = await fetchData();

  let pageData = {
    title: data.name,
    src: pageCover.cover.url,
  };

  const crumb = {
    label: data.name,
    slug: params.slug,
    routes: ["/", "/contagens", params.slug],
  };
  //const pointsData = getPointsData(data.coordinates) as pointData[];
  console.log(data)
  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      <StatisticsBox title={data.name} boxes={CountingStatistic(data)} />
      {/*<section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10">
             <div
          className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
          style={{ minHeight: "400px" }}
        >
          <PointMap pointsData={pointsData} height="400px" />
        </div>
   
              <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
          <FlowContainer count={data} />
        </div>
      </section>*/}
      {/*    <InfoCards cards={getCountingCards(data.summary)} />
        <HourlyCyclistsChart cyclistCount={data} /> 
       <CountingComparisionTable data={otherData.filter((d) => d._id !== data._id)} firstId={data._id}/>
      */}
    </main>
  );
};

export default Contagem;
