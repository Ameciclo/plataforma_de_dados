import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { HourlyBarChart } from "../../components/HourlyBarChart";
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";

const Contagem = ({ count }) => {
  const [viewport, setViewport] = useState({
    latitude: count.location.coordinates[0],
    longitude: count.location.coordinates[1],
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

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

  // const sumCountPerHour = (flowCount: object): number => {
  //   return Object.values(flowCount["count_per_hour"]).reduce(
  //     (a: number, b: number) => a + b,
  //     0
  //   ) as number;
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
          </div>
        </div>
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-10 my-10">
          <div
            className="bg-green-200 rounded shadow-2xl lg:col-span-3"
            style={{ minHeight: "400px" }}
          >
            <ReactMapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/light-v10"
              mapboxApiAccessToken={
                "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A"
              }
            >
              <Marker
                latitude={count.location.coordinates[0]}
                longitude={count.location.coordinates[1]}
              >
                <svg
                  height={40}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "#d00",
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
              <Marker
                latitude={count.location.coordinates[0]}
                longitude={count.location.coordinates[1]}
              >
                <svg
                  height={40}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "#d00",
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
            </ReactMapGL>
          </div>
        </section>
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
          <InfoCard
            data={`${(summary.women_percent * 100).toFixed(2)}%`}
            label={"Mulheres"}
          />
          <InfoCard
            data={`${(summary.children_percent * 100).toFixed(2)}%`}
            label={"Crianças e Adolescentes"}
          />
          <InfoCard
            data={`${(summary.helmet_percent * 100).toFixed(2)}%`}
            label={"Capacete"}
          />
          <InfoCard
            data={`${(summary.service_percent * 100).toFixed(2)}%`}
            label={"Serviço"}
          />
          <InfoCard
            data={`${(summary.cargo_percent * 100).toFixed(2)}%`}
            label={"Cargueira"}
          />
          <InfoCard
            data={`${(summary.wrong_way_percent * 100).toFixed(2)}%`}
            label={"Contramão"}
          />
          <InfoCard
            data={`${(summary.sidewalk_percent * 100).toFixed(2)}%`}
            label={"Calçada"}
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
    "https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count"
  );
  const cyclistCount = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = cyclistCount.map((c) => ({
    params: { contagem: c._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count/${params.contagem}`
  );
  const count = await res.json();
  return {
    props: {
      count: count,
    },
    revalidate: 1,
  };
}

export default Contagem;
