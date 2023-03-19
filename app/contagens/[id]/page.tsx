import FlowContainer from "../../../components/FlowChart/FlowContainer";
import Link from "next/link";
import { CardsSession } from "../../components/CardsSession";

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
  const BreadcrumbConf = {
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

  const keyMap = new Map([
      ["child", { name: "Crianças" }],
      ["women", { name: "Mulheres" }],
      ["men", { name: "Homens" }],
    ]),
    hourlyBarKeysOriginal = ["men", "women", "child"],
    series: any[] = [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    summary = cyclistCount.summary;
  hourlyBarKeysOriginal.forEach((hk) => {
    const keymapname = keyMap.get(hk)?.name;
    series.push({
      name: keymapname,
      data: Object.values(cyclistCount.data.qualitative[hk].count_per_hour),
    });
  });

  let flowData = {};

  ["north", "east", "west", "south"].forEach((d) => {
    if (cyclistCount[d]) {
      flowData[d] = {};
    }
  });

  const dayOptions = {
    chart: {
      type: "column",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}:00h</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
    title: {
      text:
        "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte",
    },
    xAxis: {
      type: "category",
      categories: hours,
      title: {
        text: "Hora",
      },
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
      scrollbar: {
        enabled: true,
      },
    },
    series,

    credits: {
      enabled: false,
    },
  };

  const cards = [
    { label: "Mulheres", icon: "women", data: summary.women_percent },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: summary.children_percent,
    },
    { label: "Capacete", icon: "helmet", data: summary.helmet_percent },
    { label: "Serviço", icon: "service", data: summary.service_percent },
    { label: "Cargueira", icon: "cargo", data: summary.cargo_percent },
    { label: "Contramão", icon: "wrong_way", data: summary.wrong_way_percent },
    { label: "Calçada", icon: "sidewalk", data: summary.sidewalk_percent },
  ];

  return (
    <main className="flex-auto">
      <div className="mx-auto text-center my-24">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Total de ciclistas"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {cyclistCount.summary.total}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Pico em 1h"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {cyclistCount.summary.hour_max}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Data da contagem"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {cyclistCount.date.substr(0, 10).split("-").reverse().join("/")}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Dados"}</h3>
            <Link
              href={cyclistCount.summary.download_xlsx_url}
              className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2"
            >
              XLSX
            </Link>
            <Link
              href={`https://api.contagem.ameciclo.org/v1/cyclist-count/${cyclistCount._id}`}
              className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2"
            >
              JSON
            </Link>
          </div>
        </div>
      </div>
      <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
        <div
          className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
          style={{ minHeight: "400px" }}
        ></div>
        <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
          <FlowContainer count={cyclistCount} flowData={flowData} />
        </div>
      </section>

      <CardsSession title="" cards={cards} />

      <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="shadow-2xl rounded p-10 text-center overflow-x-scroll">
          <div style={{ minWidth: "500px" }}>
            <h2 className="text-gray-600 text-3xl">
              Quantidade de ciclistas por hora
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contagem;
