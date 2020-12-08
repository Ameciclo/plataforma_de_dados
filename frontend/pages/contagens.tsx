import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import ContagensTable from "../components/ContagensTable";
import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from "react-map-gl";
import Breadcrumb from "../components/Breadcrumb";

const Contagens = ({ cyclistCounts, globalSummary }) => {
  function groupBy(xs, f) {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  }

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const SIZE = 20;

  let countsGroupedByLocation = groupBy(cyclistCounts, (count) => count.name);
  let countsGroupedArray = Object.entries(countsGroupedByLocation);

  const [viewport, setViewport] = useState({
    latitude: -8.0584364,
    longitude: -34.945277,
    zoom: 10,
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

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Contagens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
        style={{ height: "25vh" }}
      >
        <h1 className="text-4xl font-bold">Contagens</h1>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb
            label="Contagens"
            slug="/contagens"
            routes={["/", "/contagens"]}
          />
        </div>
      </div>
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold">Estatísticas Gerais</h1>
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Total de ciclistas"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].totalAmount}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Contagens Realizadas"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].numberOfCounts}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Pontos Monitorados"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {countsGroupedArray.length}
            </h3>
          </div>
          <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
            <h3>{"Máximo em um ponto"}</h3>
            <h3 className="text-5xl font-bold mt-2">
              {globalSummary[0].MaximumValue}
            </h3>
          </div>
        </div>
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        {/*<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-10 my-10">*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].totalAmount}*/}
        {/*    label={"N.º de ciclistas contados"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].numberOfCounts}*/}
        {/*    label={"Contagens Realizadas"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={countsGroupedArray.length}*/}
        {/*    label={"Pontos Monitorados"}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    data={globalSummary[0].MaximumValue}*/}
        {/*    label={"N.º máximo contado"}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
              Registramos as pessoas que passam de bicicleta durante 14 horas em
              um pré-escolhido cruzamento da cidade do Recife. As nossas
              contagens são registradas manualmente através da observação das
              pessoas voluntárias na contagem, registrando a direção do
              deslocamento e fatores qualitativos. Dentre esses fatores estão o
              gênero, tipo de bicicleta, uso de capacete, se estão dando carona,
              se são crianças se estão à serviço e comportamentos como contramão
              e pedalada na calçada. Ainda são registrados outros fatores
              qualitativos que podem ser especificidades de cada local.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
              As contagens de ciclistas são importantes instrumentos de
              planejamento urbano. Elas permitem identificar os pontos de maior
              demanda por estruturas cicláveis, além das tendências futuras. A
              Ameciclo as utiliza como ferramentas para incidir no planejamento
              e tem seus dados abertos para serem usados pela mídia, academia ou
              quaisquer pessoa que assim deseje.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10">
        <div className="bg-green-200 rounded shadow-2xl">
          <ReactMapGL
            {...viewport}
            {...settings}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            width="100%"
            height="500px"
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
              <FullscreenControl />
            </div>

            <div style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <NavigationControl />
            </div>

            {cyclistCounts.map((c) => (
              <Marker
                key={c._id}
                longitude={c.location.coordinates[1]}
                latitude={c.location.coordinates[0]}
              >
                <svg
                  height={SIZE}
                  viewBox="0 0 24 24"
                  style={{
                    cursor: "pointer",
                    fill: "#028083",
                    stroke: "none",
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                  }}
                >
                  <path d={ICON} />
                </svg>
              </Marker>
            ))}
          </ReactMapGL>
        </div>
      </section>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <ContagensTable data={cyclistCounts} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const globalSummaryRes = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/`
  );

  const res = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count`
  );

  const cyclistCounts = await res.json();
  const globalSummary = await globalSummaryRes.json();

  return { props: { cyclistCounts, globalSummary } };
}

export default Contagens;
