import { NavCover } from "../../../components/NavCover";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { COUNTINGS_DATA, COUNTINGS_PAGE_DATA } from "../../../../servers";
import { getBoxesForCountingComparision, getPointsDataForComparingCounting, getPointsDataForSingleCounting } from "./configuration";
import { VerticalStatisticsBoxes } from "../../../components/VerticalStatisticsBoxes";
import { Map } from "../../../components/Maps/Map";
import { CountingComparisionTable } from "./useclient";

const fetchUniqueData = async (id: string) => {
  const res = await fetch(COUNTINGS_DATA + "/" + id, { cache: "no-cache" });
  const data = await res.json();
  return data;
};

const fetchData = async () => {
  const dataRes = await fetch(COUNTINGS_DATA, { cache: "no-cache" });
  const dataJson = await dataRes.json();
  const otherData = dataJson.data;

  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover, otherData };
};

export default async function Compare({ params }) {
  const toCompare = [params.id].concat(params.compareId.split("_COMPARE_"));
  const data = await Promise.all(
    toCompare.map(async (d) => {
      const result = await fetchUniqueData(d);
      return result.cyclistCount;
    })
  );

  const {pageCover, otherData} = await fetchData();
  let pageData = {
    title: "Comparação de contagens",
    src: pageCover.cover.url,
  };

  // const label = data
  //   .reduce(
  //     (a, c) => (a += c.name + " (" + c.date.substring(0, 4) + ") e "),
  //     "COMPARAÇÃO ENTRE: "
  //   )
  //   .slice(0, -3);

  const crumb = {
    label: "Comparação entre contagens",
    slug: params.compareId,
    routes: ["/", "/contagens", params.compareId],
  };

  const boxes = getBoxesForCountingComparision(data)
  const pointsData = getPointsDataForComparingCounting(data)
  
  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
      <VerticalStatisticsBoxes title={"Comparação entre as contagens"} boxes={boxes} />
      <Map pointsData={pointsData} />
      <CountingComparisionTable data={otherData} ids={toCompare}/>
    </main>
  );
}
