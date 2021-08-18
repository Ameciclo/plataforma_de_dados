import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  LinearInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import MAP_STYLE from "../../styles/ideciclo_mapstyle";
import RADAR_STYLE from "../../styles/ideciclo_radarstyle";
import rates_organization from "../../styles/ideciclo_rates";
import map from "../../public/malhacicloviariapermanente_mar2021.json";
import bbox from "@turf/bbox";
import { server } from "../../config";

// comentário

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

/**
function getViewport(feature, viewport) {
  // calculate the bounding box of the feature
  const [minLng, minLat, maxLng, maxLat] = bbox(feature);
  // construct a viewport instance from the current state
  const vp = new WebMercatorViewport(viewport);
  const {longitude, latitude, zoom} = vp.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat]
    ],
    {
      padding: 40
    }
  );

  return {
    ...viewport,
    longitude,
    latitude,
    zoom,
  }
}
*/

function get_map_data(structure) {
  // TRABALHA O MAPA
  const geoJsonMap = {
    type: "FeatureCollection",
    name: structure.street,
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [],
  };

  structure.reviews[structure.reviews.length - 1].segments.forEach((seg) => {
    geoJsonMap.features.push(
      map.features.filter((m) => m.properties.idunido == seg.geo_id)[0]
    );
  });

  return geoJsonMap;
}

const Ideciclo = ({ structure, forms }) => {
  let info = rates_organization(structure, forms);
  info.map = get_map_data(structure);

  const [minLng, minLat, maxLng, maxLat] = bbox(info.map);
  const vp = new WebMercatorViewport({
    width: 400,
    height: 600,
    longitude: -122.45,
    latitude: 37.78,
    zoom: 12,
    pitch: 30,
    bearing: 15,
  });
  const { longitude, latitude, zoom } = vp.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    {
      padding: 40,
    }
  );

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });
  //  var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
  //  setViewport(getViewport(info.map, viewport))

  const [settings, setsettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: false,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    boxZoom: true,
    doubleClickZoom: true,
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
          <h1 className="text-6xl font-bold">{structure.street}</h1>
          <h3 className="text-4xl font-bold my-8">Visão geral</h3>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Nota geral</h3>
              <h3 className="text-5xl font-bold mt-2">
                {("" + info.nota.toFixed(1)).replace(".", ",")}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Extensão (km)</h3>
              <h3 className="text-5xl font-bold mt-2">
                {(info.comprimento / 1000).toFixed(2).replace(".", ",")}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Avaliações</h3>
              <h3 className="text-5xl font-bold mt-2">{info.avaliacoes}</h3>
            </div>
            {
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>{"Dados"}</h3>
                <a
                  href={`${server}/forms/${forms.id}`}
                  target="_blank"
                  className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2"
                >
                  Formulário
                </a>
              </div>
            }
          </div>
        </div>
      </section>
      <section className="container mx-auto mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="rounded shadow-2xl">
          <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>DESCRIÇÃO</h3>
              <h3 className="text-2xl mt-2">
                <strong>{info.tipologia.toUpperCase()}</strong>,{" "}
                <strong>{info.fluxo.toUpperCase()}</strong>
                {info.pavimento != null && (
                  <>
                    , com piso de{" "}
                    <strong>
                      {info.pavimento.replace(",", " e").toUpperCase()}
                    </strong>
                  </>
                )}
                {info.tipologia.toUpperCase() != "CICLORROTA" && (
                  <>
                    , localizada{" "}
                    <strong>{info.localizacao.toUpperCase()}</strong>
                  </>
                )}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>LARGURA</h3>
              {info.largura_transitavel >= 0 ? (
                <h3 className="text-3xl  mt-2">
                  <strong>
                    {("" + info.largura_total).replace(".", ",")}m
                  </strong>
                  , onde{" "}
                  <strong>
                    {("" + info.largura_transitavel).replace(".", ",")}m{" "}
                  </strong>
                  são transitáveis
                </h3>
              ) : (
                <h3 className="text-3xl font-bold mt-2">N/A</h3>
              )}
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Última avaliação</h3>
              <h3 className="text-3xl font-bold mt-2">{info.data}</h3>
            </div>
          </div>
        </div>
        <div className="bg-green-200 rounded shadow-2xl">
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
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "10px",
                zIndex: 500,
              }}
            >
              <FullscreenControl style={MAP_STYLE.navControlStyle} />
            </div>
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 0,
                padding: "10px",
                zIndex: 500,
              }}
            >
              <NavigationControl style={MAP_STYLE.navControlStyle} />
            </div>
            <Source id="malha" type="geojson" data={info.map}>
              <Layer {...MAP_STYLE.layers.ciclovia} />
              <Layer {...MAP_STYLE.layers.ciclofaixa} />
              <Layer {...MAP_STYLE.layers.ciclorrota} />
            </Source>
          </ReactMapGL>
        </div>
        <div className="rounded shadow-2xl">
          <div className="flex flex-col justify-center w-full p-6 pt-12 text-center tracking-widest">
            <HighchartsReact
              highcharts={Highcharts}
              options={RADAR_STYLE(info.series, info.categories)}
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="mx-auto text-center my-24">
          <h3 className="text-4xl font-bold my-8">
            Detalhamento e composição das notas
          </h3>
          <section className="container mx-auto mx-auto grid lg:grid-cols-4 md:grid-cols-1 auto-rows-auto gap-10 my-10">
            {info.parametros.map((out_param) => {
              return (
                <div className="rounded shadow-2xl">
                  <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
                    <div
                      className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest"
                      style={{ background: out_param.color }}
                    >
                      <h3>{out_param.titulo}</h3>
                      <h3 className="text-5xl font-bold mt-2">
                        {out_param.media &&
                          ("" + out_param.media.toFixed(1)).replace(".", ",")}
                      </h3>
                    </div>
                    {out_param.parametros.map((inner_param) => {
                      return (
                        //<Tippy content={n.descricao}>
                        <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
                          <h3>{inner_param.titulo}</h3>
                          <h3 className="text-4xl font-bold mt-2">
                            {inner_param.media !== null &&
                            inner_param.media >= 0
                              ? ("" + inner_param.media.toFixed(1)).replace(
                                  ".",
                                  ","
                                ) +
                                "" +
                                (inner_param.different
                                  ? inner_param.bigger
                                    ? "🔺"
                                    : "🔻"
                                  : "")
                              : "N/A"}
                          </h3>
                        </div>
                        //</Tippy>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
          {/*<section>
        <div className="rounded shadow-2xl">
          <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest">
              <h3>Situações de risco</h3>
            </div>
            <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
              {info.situacoes}.
            </div>
          </div>
        </div>
      </section>*/}
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${server}/structures`);
  const allstructs = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = allstructs.map((s) => ({
    params: { ideciclo: s.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${server}/structures/${params.ideciclo}`);

  let structure = await res.json();
  // iterar sobre reviews
  // map ou foreach
  // cada review

  /// COLOCAR EM REVIEW NO Back
  const new_review_form_id =
    structure.reviews[structure.reviews.length - 1].segments[0].form_id;

  const formres = await fetch(`${server}/forms/${new_review_form_id}`);

  const forms = await formres.json();

  let last_review_form_id = null;
  if (structure.reviews.length > 1)
    last_review_form_id =
      structure.reviews[structure.reviews.length - 2].segments[0].form_id;

  return {
    props: {
      structure: structure,
      forms: forms,
    },
    revalidate: 1,
  };
}

export default Ideciclo;
