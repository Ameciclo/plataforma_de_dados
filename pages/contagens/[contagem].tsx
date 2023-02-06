import Layout from "../../components/Layout";
import CardsSession from "../../components/CardsSession";

import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";

import FlowContainer from "../../components/FlowChart/FlowContainer";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Contagem = ({ count }) => {

  const page_data = {
    title: count.name,
    cover_image_url: "",

  }
  const BreadcrumbConf = {
      label:count.name,
      slug:count._id,
      routes:["/", "/contagens", count._id],
    }

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

  let keyMap = new Map([
      ["child", { name: "Crianças" }],
      ["women", { name: "Mulheres" }],
      ["men", { name: "Homens" }],
    ]),
    hourlyBarKeysOriginal = ["men", "women", "child"],
    series= [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    summary = count.summary;

  hourlyBarKeysOriginal.forEach((hk) => {
    series.push({name: keyMap.get(hk).name, data: Object.values(count.data.qualitative[hk].count_per_hour)})
  })

  let flowData = {};

  ["north", "east", "west", "south"].forEach((d) => {
    if (count[d]) {
      flowData[d] = {};
    }
  });

  const dayOptions = {
    chart: {
      type: "column",
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}:00h</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>'
    },
    title: {
      text:
          "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte",
    },
    xAxis: {
      type: "category",
      categories: hours,
      title: {
        text: "Hora"
      },
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
      scrollbar: {
        enabled: true
      },
    },
    series,

    credits: {
      enabled: false,
    },
  };

  const cards = [
    {label: "Mulheres", icon: "women", data: summary.women_percent},
    {label: "Crianças e Adolescentes", icon: "children", data: summary.children_percent},
    {label: "Capacete", icon: "helmet", data: summary.helmet_percent},
    {label: "Serviço", icon: "service", data: summary.service_percent},
    {label: "Cargueira", icon: "cargo", data: summary.cargo_percent},
    {label: "Contramão", icon: "wrong_way", data: summary.wrong_way_percent},
    {label: "Calçada", icon: "sidewalk", data: summary.sidewalk_percent}
  ]

  return (
    <Layout pageTitle={page_data.title} coverUrl={page_data.cover_image_url} breadcrumbConf={BreadcrumbConf}>
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

        <CardsSession cards={cards} />

        <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
          <div
            className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
          >
            <div style={{minWidth: "500px"}}>
              <h2 className="text-gray-600 text-3xl">
                Quantidade de ciclistas por hora
              </h2>
            <HighchartsReact highcharts={Highcharts} options={dayOptions} />
            </div>
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
