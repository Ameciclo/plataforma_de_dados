import FlowContainer from "../../components/FlowChart/FlowContainer";
import { GridSession } from "../../components/GridSession";
import { StatisticsBox } from "../../components/StatisticsBox";
import {
  CountingStatistic,
  getPointsDataForSingleCounting,
  getCountingCards
} from "../configuration";
import { Map as PointMap } from "../../components/Maps/Map";
import { pointData } from "../../../typings";
import { NavCover } from "../../components/NavCover";
import { Breadcrumb } from "../../components/Breadcrumb";
import { HourlyCyclists } from "../HourlyCyclists";

const getCyclistCount = async (id: string) => {
  const res = await fetch(
    `https://api.contagem.ameciclo.org/v1/cyclist-count/${id}`
  );
  const { cyclistCount } = await res.json();
  return cyclistCount;
};

const Contagem = async ({ params }) => {
  const cyclistCount = await getCyclistCount(params.id);

  const page_data = {
    title: cyclistCount.name,
    cover_image_url: "",
  };
  const crumb = {
    label: cyclistCount.name,
    slug: cyclistCount._id,
    routes: ["/", "/contagens", cyclistCount._id],
  };

  function getFlowsFromDirection(direction): string[] {
    return Object.keys(cyclistCount.data.quantitative).filter((key) =>
      key.startsWith(`${direction}_`)
    );
  }

  function getTotalCountFromFlow(flow): number {
    let total: number[] = Object.values(
      cyclistCount.data.quantitative[flow].count_per_hour
    );
    return total.reduce((sum: number, current: number) => sum + current, 0);
  }

  function getTotalCountFromDirection(direction): number {
    let result: number = 0;

    getFlowsFromDirection(direction).forEach((flow) => {
      result += getTotalCountFromFlow(flow);
    });

    return result;
  }

  function getIconFor(direction): string {
    switch (direction) {
      case "north":
        return "⬆️";
      case "south":
        return "⬇️";
      case "east":
        return "➡️";
      case "west":
        return "⬅️";
    }
    return "";
  }


  let flowData = {};

  ["north", "east", "west", "south"].forEach((d) => {
    if (cyclistCount[d]) {
      flowData[d] = {};
    }
  });


  const statistics = CountingStatistic(cyclistCount);
  const pointsData = getPointsDataForSingleCounting(
    cyclistCount
  ) as pointData[];
  const cards = getCountingCards(cyclistCount.summary)

  return (
    <main className="flex-auto">
      <NavCover title={page_data.title} src={""} />
      <Breadcrumb {...crumb} />
      <StatisticsBox {...statistics} />
      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10">
        <div
          className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
          style={{ minHeight: "500px" }}
        >
          <PointMap pointsData={[]} />
        </div>
        <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
          <FlowContainer count={cyclistCount} flowData={flowData} />
        </div>
      </section>
      <GridSession cards={cards} />
      <HourlyCyclists title={page_data.title} cyclistCount={cyclistCount} />
    </main>
  );
};

export default Contagem;

