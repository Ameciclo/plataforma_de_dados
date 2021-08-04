import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";

import InfoCard from "../../components/InfoCardNumber";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";

import React, { useEffect, useState } from "react";
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";

import structures from "../../public/ideciclo/IDECICLO - all_structures - public.json"
import ratings from "../../public/ideciclo/IDECICLO - all_rates - public.json"
import map from "../../public/malhacicloviariapermanente_mar2021.json"
//import descriptions from "../../public/ideciclo/ratestitles/"
//import headers from "../../public/ideciclo/"

const malha = {
  'type': 'geojson',
  'data': map
}

const layers = {
  ciclovia: {
    id: 'ciclovias',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
    },
    filter: ['==', 'Tipo', 'Ciclovia']
  },
  ciclofaixa: {
    id: 'ciclofaixas',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 1.5,
      'line-dasharray': [2,.5],
    },
    filter: ['==', 'Tipo', 'Ciclofaixa']
  },
  ciclorrota: {
    id: 'ciclorrota',
    type: 'line',
    paint: {
      'line-color': "#E02F31",
      'line-width': 2,
      'line-dasharray': [1,2.5],
    },
    filter: ['==', 'Tipo', 'Ciclorrota']
  },
};
  const navControlStyle= {
    right: 10,
    top: 10
  };


if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

function getAllData (structure) {

  let s = structure
  s.reviews = s.reviews.sort((a,b) => a.year > b.year)
  const d = descriptions.filter(d => d.form_id == s.reviews[0].segments[0].form_id)[0]
  const r = ratings.filter(r => r.form_id == s.reviews[0].segments[0].form_id)[0]
  const h = headers.filter(h => h.form_id == s.reviews[0].segments[0].form_id)[0]
  const m = {
    "type": "FeatureCollection",
    "name": s.name,
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
  }
  s.reviews[0].segments.forEach(seg => {
    m.features.push(
      map.features.filter(m => m.properties.idunido == seg.geo_id)[0]
      )})
  return [
    s,
    r,
    m,
    d,
    h,
  ]
}

const Ideciclo = ({ structure }) => {
  let [s, r, m, d, h] = getAllData(structure)
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


  let radarOptions = {
    chart: {
      polar: true,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "EVOLUÇÃO DA NOTA",
    },
    subtitle: {
      text: 'Notas que compõem a média'
    },
    pane: {
      size: "70%",
//      startAngle: 0,
 //     endAngle: 120
    },
    xAxis: {
      categories: [
        "Qualidade do projeto",
        "Segurança viária",
        "Manutenção e urbanidade",
      ],
      tickmarkPlacement: "on",
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      min: 0,
      max: 10,
    },
    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
    },
    colors: ['#008080', '#E02F31', '#000000', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    series: [{
      type: 'area',
      name: '2021',
      data: [8, 2, 3],
      }, {
      type: 'line',
      name: '2018',
      data: [1, 5, 3]
      }, {
      type: 'line',
      name: '2016',
      data: [1, 8, 2]
      }],
  };
  
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
          <h1 className="text-4xl font-bold truncate">{structure.logradouro}</h1>
        </div>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex text-xs md:text-base">
        <div className="container mx-auto">
          <Breadcrumb
            label={structure.logradouro}
            slug={structure.id.toString()}
            routes={["/", "/ideciclo", structure.id]}
          />
        </div>
      </div>
      <section className="container mx-auto">
        <div className="mx-auto text-center my-24">
          <h1 className="text-6xl font-bold">{structure.logradouro}</h1>
          <h3 className="text-4xl font-bold my-8">Visão geral</h3>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Nota geral</h3>
              <h3 className="text-5xl font-bold mt-2">
                {(""+s.reviews[0].nota.toFixed(1)).replace(".",",")}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Extensão (km)</h3>
              <h3 className="text-5xl font-bold mt-2">{((s.reviews[0].comprimento/1000).toFixed(2)).replace(".",",")}</h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Avaliações</h3>
              <h3 className="text-5xl font-bold mt-2">
                {s.reviews.length}
              </h3>
              </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
        <div className="rounded shadow-2xl">
          <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>DESCRIÇÃO</h3>
              <h3 className="text-2xl mt-2">
                <strong>{d.tipologia.toUpperCase()}</strong>
                , <strong>{d.fluxo.toUpperCase()}</strong>
                , com piso de <strong>{d.pavimento.replace(","," e").toUpperCase()}</strong>
                {(d.tipologia != "ciclorrota") && (<>, localizada <strong>{d.localizacao.toUpperCase()}</strong></>)}
                
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>LARGURA</h3>
              {(d.largura_transitavel >= 0) ? (
              <h3 className="text-3xl  mt-2">
                <strong>{(""+d.largura_total).replace(".",",")}m</strong>
                , onde <strong>{(""+d.largura_transitavel).replace(".",",")}m </strong>são transitáveis
              </h3>
              ):(
                <h3 className="text-3xl font-bold mt-2">
                  N/A
                </h3>
                )}
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Última avaliação</h3>
              <h3 className="text-3xl font-bold mt-2">
                {h.data.substring(0,10)}
              </h3>
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
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <FullscreenControl  style={navControlStyle}/>
            </div>

            <div style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <NavigationControl  style={navControlStyle}/>
            </div>
            <Source id="malha" type={malha.type} data={m}>
                <Layer {...layers.ciclovia} />
                <Layer {...layers.ciclofaixa} />
                <Layer {...layers.ciclorrota} />
            </Source>
          </ReactMapGL>
        </div>
        <div className="rounded shadow-2xl">
        <div className="flex flex-col justify-center w-full p-6 pt-12 text-center tracking-widest">
            <HighchartsReact highcharts={Highcharts} options={radarOptions} />
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="mx-auto text-center my-24">
          <h3 className="text-4xl font-bold my-8">Detalhamento das notas</h3>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
            {r.parametros.map(n => {
                return (<div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{n.titulo}</h3>
                  <h3 className="text-5xl font-bold mt-2">
                    {(""+n.media.toFixed(1)).replace(".",",")}
                  </h3>
                </div>
                )})}
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Dados"}</h3>
                {/*<a href={count.summary.download_xlsx_url} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">XLSX</a>*/}
                <a href={`https://api.contagem.ameciclo.org/v1/structure/${structure._id}`} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">Formulário</a>
                <a href={`https://api.contagem.ameciclo.org/v1/structure/${structure._id}`} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">Notas</a>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="mx-auto text-center my-24">
          <h3 className="text-4xl font-bold my-8">Composição das notas</h3>
        <section className="container mx-auto mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
            {r.parametros.map(m => {
              return (
                <div className="rounded shadow-2xl">
                  <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
                    <div className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest">
                      <h3>{m.titulo}</h3>
                    </div>
                    {m.parametros.map(n => {
                      return (
                      //<Tippy content={n.descricao}>
                        <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
                          <h3>{n.titulo}</h3>
                          <h3 className="text-4xl font-bold mt-2">
                            {n.media >= 0 ? ((""+n.media.toFixed(1)).replace(".",",")) : ("N/A")}  
                          </h3>
                        </div>
                      //</Tippy>
                      )})
                    }
                  </div>
                </div>
                )})}
      </section></div></section>      
    </Layout>
  );
};

export async function getStaticPaths() {
/**  const res = await fetch(
    "https://api.ideciclo.ameciclo.org/api/v1/structures"
  );
  const structures = await res.json();
*/
  const allStructures = structures
  const paths = allStructures.map((s) => ({
    params: { ideciclo: s.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  /**const res = await fetch(
    `https://api.ideciclo.ameciclo.org/api/v1/structures/${params.ideciclo}`
  );*/
  const structure = structures[params.ideciclo]//await res.json();
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
