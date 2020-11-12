import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import dynamic from "next/dynamic";
import { HourlyBarChart } from "../../components/HourlyBarChart";
import Footer from "../../components/Footer";

const PieChart = dynamic(() => import("../../components/PieChart"), {
  ssr: false,
});

const HourlyChart = dynamic(() => import("../../components/HourlyChart"), {
  ssr: false,
});

const Contagem = ({ count }) => {
  const [viewport, setViewport] = useState({
    latitude: count.location.coordinates[0],
    longitude: count.location.coordinates[1],
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

  let summaryData = [
    {
      id: "Mulheres",
      label: "Mulheres",
      value: (count.summary.women_percent * 100).toFixed(1),
      color: "hsl(1, 70%, 50%)",
    },
    {
      id: "Homens",
      label: "Homens",
      value: (count.summary.men_percent * 100).toFixed(1),
      color: "hsl(293, 70%, 50%)",
    },
    {
      id: "Crianças",
      label: `Crianças ${(count.summary.children_percent * 100).toFixed(1)}%`,
      value: (count.summary.children_percent * 100).toFixed(1),
      color: "hsl(163, 70%, 50%)",
    },
  ];

  let hourlyMen = [],
    hourlyWomen = [],
    hourlyChildren = [],
    hourlyBarKeys = Object.keys(count.data.qualitative),
    hourlyBarData = [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

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
    hourlyBarKeys.forEach((k) => {
      hourObject[k] = count.data.qualitative[k].count_per_hour[h];
    });
    hourlyBarData.push(hourObject);
  });

  let hourlyData = [
    {
      id: "Homens",
      color: "hsl(320, 70%, 50%)",
      data: hourlyMen,
    },
    {
      id: "Mulheres",
      color: "hsl(75, 70%, 50%)",
      data: hourlyWomen,
    },
    {
      id: "Crianças",
      color: "hsl(26, 70%, 50%)",
      data: hourlyChildren,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row bg-red-200">
        <nav>
          <div>Menu</div>
          <ul>
            <li>
              <a>
                <span>Link</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-auto">
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
          <div className="bg-ameciclo text-white h-32 rounded shadow-2xl">
            <h3>Número de Ciclistas contados:</h3>
            <h3>{count.summary.total}</h3>
          </div>
          <div className="bg-green-200 h-32 rounded shadow-2xl">
            <h3>Número máxima de ciclistas no intervalo de 1h</h3>
            <h3>{count.summary.hour_max}</h3>
          </div>
          <div className="bg-green-200 h-32 rounded shadow-2xl">
            <h3>Data da Contagem</h3>
            <h3>{count.date.substr(0, 10).split("-").reverse().join("/")}</h3>
          </div>
        </section>
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-10 my-10">
          <div
            className="shadow-2xl rounded p-10 text-center"
            style={{ height: "700px" }}
          >
            <h2 className="text-gray-600 text-3xl">
              % de caracteristicas de acordo com o total
            </h2>
            <PieChart data={summaryData} />
          </div>
          <div
            className="shadow-2xl rounded p-10 text-center"
            style={{ height: "700px" }}
          >
            <h2 className="text-gray-600 text-3xl">
              Quantidade de ciclistas por hora
            </h2>
            <HourlyChart data={hourlyData} />
          </div>
          <div
            className="shadow-2xl rounded p-10 text-center"
            style={{ height: "700px" }}
          >
            <h2 className="text-gray-600 text-3xl">
              Quantidade de ciclistas por hora
            </h2>
            <HourlyBarChart data={hourlyBarData} keys={hourlyBarKeys} />
          </div>
        </section>
        <section className="container mx-auto my-10">
          <div className="bg-green-200 rounded shadow-2xl">
            <ReactMapGL
              {...viewport}
              width="100%"
              height="500px"
              mapStyle="mapbox://styles/mapbox/streets-v11"
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
            </ReactMapGL>
          </div>
        </section>
      </main>
      <Footer />
    </div>
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