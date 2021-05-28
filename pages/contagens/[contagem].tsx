import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { HourlyBarChart } from "../../components/HourlyBarChart";
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import FlowContainer from "../../components/FlowChart/FlowContainer";

const Contagem = ({ count }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: count.location.coordinates[0],
    longitude: count.location.coordinates[1],
    zoom: 17,
    bearing: 0,
    pitch: 0,
  });

  const [settings, setsettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: false,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    boxZoom: true,
    doubleClickZoom: true
  });


  function getFlowsFromDirection(direction): string[] {
    return Object.keys(count.data.quantitative).filter((key) =>
      key.startsWith(`${direction}_`)
    );
  }

  function getTotalCountFromFlow(flow): number {
    let total: number[] = Object.values(count.data.quantitative[flow].count_per_hour)
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
  }

  let hourlyMen = [],
    hourlyWomen = [],
    hourlyChildren = [],
    keyMap = new Map([
      ["men", { name: "Homens" }],
      ["women", { name: "Mulheres" }],
      ["child", { name: "Crianças" }],
    ]),
    hourlyBarKeysOriginal = ["men", "women", "child"],
    hourlyBarKeys = ["Homens", "Mulheres", "Crianças"],
    hourlyBarData = [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    summary = count.summary;

  hours.forEach((h) => {
    hourlyMen.push({ x: h, y: count.data.qualitative.men.count_per_hour[h] });
    hourlyWomen.push({
      x: h,
      y: count.data.qualitative.women.count_per_hour[h],
    });
    hourlyChildren.push({
      x: h,
      y: count.data.qualitative.child.count_per_hour[h],
    });
    let hourObject = {
      hour: h.toString(),
    };
    hourlyBarKeysOriginal.forEach((k) => {
      hourObject[keyMap.get(k).name] =
        count.data.qualitative[k].count_per_hour[h];
    });
    hourlyBarData.push(hourObject);
  });

  const sumCountPerHour = (flowCount: object): number => {
    return Object.values(flowCount["count_per_hour"]).reduce(
      (a: number, b: number) => a + b,
      0
    ) as number;
  };

  let flowData = {};

  ["north", "east", "west", "south"].forEach((d) => {
    if (count[d]) {
      flowData[d] = {};
    }
  });

  // let flowData = {
  //   north: {
  //     north_east: sumCountPerHour(count.data.quantitative.north_east),
  //     north_west: sumCountPerHour(count.data.quantitative.north_west),
  //     north_south: sumCountPerHour(count.data.quantitative.north_west),
  //     total: 0,
  //   },
  // };

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Contagens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle content-center flex w-full bg-ameciclo flex-col"
        style={{ height: "25vh" }}
      >
        <div className="container mx-auto pt-24 md:pt-0">
          <h1 className="text-4xl font-bold truncate">{count.name}</h1>
        </div>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex text-xs md:text-base">
        <div className="container mx-auto">
          <Breadcrumb
            label={count.name}
            slug={count._id}
            routes={["/", "/contagens", count._id]}
          />
        </div>
      </div>

      <main className="flex-auto">
        <div className="mx-auto text-center my-24">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Total de ciclistas"}</h3>
              <h3 className="text-5xl font-bold mt-2">{count.summary.total}</h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Pico em 1h"}</h3>
              <h3 className="text-5xl font-bold mt-2">
                {count.summary.hour_max}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Data da contagem"}</h3>
              <h3 className="text-5xl font-bold mt-2">
                {count.date.substr(0, 10).split("-").reverse().join("/")}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Dados"}</h3>
              <a href={count.summary.download_xlsx_url} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">XLSX</a>
              <a href={`https://api.contagem.ameciclo.org/v1/cyclist-count/${count._id}`} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">JSON</a>
            </div>
          </div>
        </div>
        <section className="container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
          <div
            className="bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3"
            style={{ minHeight: "400px" }}
          >
            <ReactMapGL
              {...viewport}
              {...settings}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/light-v10"
              mapboxApiAccessToken={
                "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"
              }
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '10px',
                zIndex: 500
              }}>
                <NavigationControl />
              </div>
              <Marker
                latitude={count.location.coordinates[0]}
                longitude={count.location.coordinates[1]}
              >
                <svg
                  height={40}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "#028083",
                    stroke: "none",
                    transform: `translate(${-40 / 2}px,${-40}px)`,
                  }}
                >
                  <path
                    d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
                  />
                </svg>

              </Marker>
              {["north", "east", "west", "south"].map((d, i) => {
                return (
                  <Marker
                    latitude={count[d]?.location.coordinates[1]}
                    longitude={count[d]?.location.coordinates[0]}
                    key={i}
                  >
                    <svg
                      className="cursor-pointer"
                      height={40}
                      viewBox="0 0 24 24"
                      style={{
                        fill: "#028083",
                        stroke: "none",
                        transform: `translate(${-40 / 2}px,${-40}px)`,
                      }}
                      onClick={() => {
                        setPopupInfo(d);
                      }}
                    >
                      <path
                        d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
                      />
                    </svg>
                  </Marker>
                );
              })}
              {popupInfo && (
                <>
                  <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={count[popupInfo].location.coordinates[0]}
                    latitude={count[popupInfo].location.coordinates[1]}
                    closeOnClick={false}
                    onClose={() => setPopupInfo(null)}
                  >
                    <span>
                      <b>{count[popupInfo].name}</b>
                    </span>
                    <p>
                      Total: {getTotalCountFromDirection(popupInfo)}
                      <br />
                      <br />
                      {count[popupInfo].name} para..
                    </p>

                    {
                      getFlowsFromDirection(popupInfo).map(flow => {
                        return (
                          <p>{getIconFor(flow.split("_")[1])} {count[flow.split("_")[1]].name}: {getTotalCountFromFlow(flow)} </p>
                        )
                      })
                    }

                  </Popup>
                </>
              )}
            </ReactMapGL>
          </div>
          <div className="rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col">
            <FlowContainer count={count} flowData={flowData} />
          </div>
        </section>
        <section className="container mx-auto grid grid-cols-3 md:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
          <InfoCard
            data={summary.women_percent}
            label={"Mulheres"}
            icon="women"
          />
          <InfoCard
            data={summary.children_percent}
            label={"Crianças e Adolescentes"}
            icon="children"
          />
          <InfoCard
            data={summary.helmet_percent}
            label={"Capacete"}
            icon="helmet"
          />
          <InfoCard
            data={summary.service_percent}
            label={"Serviço"}
            icon="service"
          />
          <InfoCard
            data={summary.cargo_percent}
            label={"Cargueira"}
            icon="cargo"
          />
          <InfoCard
            data={summary.wrong_way_percent}
            label={"Contramão"}
            icon="wrong_way"
          />
          <InfoCard
            data={summary.sidewalk_percent}
            label={"Calçada"}
            icon="sidewalk"
          />
        </section>
        <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
          <div
            className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
            style={{ height: "700px" }}
          >
            <h2 className="text-gray-600 text-3xl">
              Quantidade de ciclistas por hora
            </h2>
            <HourlyBarChart data={hourlyBarData} keys={hourlyBarKeys} />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    "https://api.contagem.ameciclo.org/v1/cyclist-count/"
  );
  const cyclistCount = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = cyclistCount.data.map((c) => ({
    params: { contagem: c._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.contagem.ameciclo.org/v1/cyclist-count/${params.contagem}`
  );
  const {cyclistCount} = await res.json();
  return {
    props: {
      count: cyclistCount,
    },
    revalidate: 1,
  };
}

export default Contagem;
