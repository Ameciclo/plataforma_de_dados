import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import { ResponsiveRadar } from "@nivo/radar";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Ideciclo = ({ structure }) => {
  let data = [];
  let dates = [];

  let keyMap = new Map([
    ["protection_rating", { name: "Proteção", text: null }],
    ["speed_control_rating", { name: "Controle de Velocidade" }],
    ["hor_cross_sign_rating", { name: "Sin. Horizontal em Cruzamentos" }],
    ["avg_structure_width", { name: "Largura Média" }],
    ["hor_sign_rating", { name: "Sin. Horizontal" }],
    ["ver_sign_rating", { name: "Sin. Vertical" }],
    ["ver_cross_sign_rating", { name: "Sin. Vertical em Cruzamentos" }],
    ["pattern_paint_rating", { name: "Pintura" }],
    ["hor_sign_condition_rating", { name: "Condição da Sin. Horizontal" }],
    ["risk_rating", { name: "Risco" }],
    ["sinuosity_rating", { name: "Sinuosidade" }],
    ["bidirectionality_rating", { name: "Bidirecionalidade" }],
    ["shading_rating", { name: "Sombreamento" }],
    ["type_pavement_rating", { name: "Tipo de pavimento" }],
    ["pavement_condition_rating", { name: "Condição do pavimento" }],
    ["obstacles_rating", { name: "Obstaculos" }],
  ]);

  structure.reviews.forEach((review) => {
    let reviewLabel = review.reviewed_at
      .substr(0, 10)
      .split("-")
      .reverse()
      .join("/");
    dates.push(reviewLabel);
    Object.keys(review)
      .filter(
        (f) =>
          ![
            "id",
            "reviewer",
            "reviewed_at",
            "adequacy_rating",
            "average_rating",
            "comfort_rating",
            "safety_rating",
          ].includes(f)
      )
      .forEach((k) => {
        let obj = { key: keyMap.get(k).name };
        keyMap.get(k).text = `${obj.key}: ${reviewLabel} - ${review[k]}`;
        obj[reviewLabel] = review[k];
        let foundObject = data.find((el) => el.key === keyMap.get(k).name);
        if (foundObject) {
          foundObject[reviewLabel] = review[k];
        } else {
          data.push(obj);
        }
      });
  });

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Ideciclo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="text-white text-center justify-center align-middle content-center flex w-full bg-ameciclo flex-col"
        style={{ height: "25vh" }}
      >
        <div className="container mx-auto pt-24 md:pt-0">
          <h1 className="text-4xl font-bold truncate">{structure.street}</h1>
        </div>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex text-xs md:text-base">
        <div className="container mx-auto">
          <Breadcrumb
            label={structure.street}
            slug={structure.id.toString()}
            routes={["/", "/ideciclo", structure.id]}
          />
        </div>
      </div>
      <section className="container mx-auto">
        <div className="mx-auto text-center my-24">
          <h1 className="text-6xl font-bold">Estatísticas Gerais</h1>
          <h3 className="text-4xl font-bold my-8">{structure.street}</h3>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Média</h3>
              <h3 className="text-5xl font-bold mt-2">
                {structure.average_rating}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Velocidade máxima</h3>
              <h3 className="text-5xl font-bold mt-2">{structure.max_speed}</h3>
            </div>
            {structure.extension && (
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>Extensão</h3>
                <h3 className="text-5xl font-bold mt-2">
                  {structure.extension.toFixed(1)}
                </h3>
              </div>
            )}
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Avaliações</h3>
              <h3 className="text-5xl font-bold mt-2">
                {structure.reviews.length}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="shadow-md rounded p-10 text-center overflow-x-scroll h-96">
          <h2 className="text-gray-600 text-3xl">Avaliações</h2>
          <ResponsiveRadar
            data={data}
            keys={dates}
            indexBy="key"
            maxValue="auto"
            margin={{ top: 70, right: 40, bottom: 70, left: 40 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: "nivo" }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            isInteractive={true}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: 300,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </section>
      <section className="container my-10 mx-auto grid grid-cols-3 md:grid-cols-8 sm:gap-4">
        <div className="h-32 w-32 rounded shadow-md">
          <Tippy content={keyMap.get("shading_rating").text}>
            <img src={`/icons/sombreamento.png`} className="h-32" />
          </Tippy>
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <Tippy
            content={<span>{`${keyMap.get("sinuosity_rating").text}`}</span>}
          >
            <img src={`/icons/sinuosidade.png`} className="h-32" />
          </Tippy>
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/pavimento.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/risco.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/obstaculo.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/declividade.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/proteção.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/controle_de_velocidade.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/cont_sin_horizontal.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/sin_horizontal.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/cond_sin_horizontal.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/sin_vertical.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/largura.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/sin_vertical_cruzamentos.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/padrão_pintura.png`} className="h-32" />
        </div>
        <div className="h-32 w-32 rounded shadow-md">
          <img src={`/icons/sit_pavimento.png`} className="h-32" />
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    "https://api.ideciclo.ameciclo.org/api/v1/structures"
  );
  const structures = await res.json();

  const paths = structures.map((s) => ({
    params: { ideciclo: s.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.ideciclo.ameciclo.org/api/v1/structures/${params.ideciclo}`
  );
  const structure = await res.json();
  return {
    props: {
      structure: structure,
    },
    revalidate: 1,
  };
}

const ToolTipContent = ({ title }) => {
  return (
    <>
      <span>{title}</span>
    </>
  );
};

export default Ideciclo;
