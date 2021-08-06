import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";
import structures from "../../public/ideciclo/IDECICLO - structures - public.json";
import forms from "../../public/ideciclo/IDECICLO - forms - public.json";
import rates from "../../public/ideciclo/IDECICLO - rates - public.json";
import map from "../../public/malhacicloviariapermanente_mar2021.json";
import descriptions from "../../public/ideciclo/IDECICLO - ratestitles.json";

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

function group_by(objetoArray, propriedade) {
  return objetoArray.reduce(function (acc, obj) {
    let key = obj[propriedade];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function getAllData (structure, form12, rate12) {
  let s = structure
  s.reviews = structure.reviews.sort((a,b) => a.year < b.year)

//  let form = {caracteristicas: {tipologia: "C-",fluxo: "F-",pavimento: "P-",localizacao: "L-",largura_total: 1,largura_transitavel: 2,},cabecalho: {data: "20202102021",}}

  let form = forms.filter(f => f.id === s.reviews[0].segments[0].form_id)[0]
  let rate = []
  const segm_zero_id = s.reviews.forEach(s => {
    const id = s.segments[0].form_id
    rate.push(rates.filter(r => r.id === id)[0])
  })
  
  const main_rates = {project: rate[0].project, safety: rate[0].safety, maintenance_and_urbanity:rate[0].maintenance}

  let project_param = []
  let safety_param = []
  let maintenance_and_urbanity_param = []

  let categories = [
    "Qualidade do projeto",
    "Segurança viária",
    "Manutenção e urbanidade",
  ]
  let series = [{
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
    }]

  const last_rate = rate[0]
  Object.keys(last_rate).forEach(r => {
    const desc = descriptions[r]
    if (desc != undefined) {
      if (desc.fathers != undefined) {
        if (desc.fathers.length < 4 && 
          (desc.fathers[2] === "maintenance" || 
          desc.fathers[2] ===  "urbanity")) 
            maintenance_and_urbanity_param.push({
              titulo: desc.title, 
              desc: desc.description, 
              media: last_rate[r]})
        if (desc.fathers.length < 3) {
          if (desc.fathers[1] === "project") project_param.push({titulo: desc.title, desc: desc.description, media: last_rate[r]})
          if (desc.fathers[1] === "safety") safety_param.push({titulo: desc.title, desc: desc.description, media: last_rate[r]})
          }
      }
    }
  })

  const m = {
    "type": "FeatureCollection",
    "name": structure.name,
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
  }

  structure.reviews[0].segments.forEach(seg => {
    m.features.push(
      map.features.filter(m => m.properties.idunido == seg.geo_id)[0]
      )})

  const info = {
    tipologia: form.caracteristicas.tipologia,
    fluxo: form.caracteristicas.fluxo,
    comprimento: structure.reviews[0].comprimento,
    pavimento: form.caracteristicas.pavimento,
    localizacao: form.caracteristicas.localizacao,
    largura_total: form.caracteristicas.largura_total,
    largura_transitavel: form.caracteristicas.largura_transitavel,
    data: form.cabecalho.data,
    avaliacoes: structure.reviews.length,
    map: m,
    nota: rate[0].average,
    categories: categories,
    series: series,
    parametros: [
      {
        titulo: descriptions.project.title,
        media: main_rates.project,
        color: "#24CBE5",
        parametros: project_param,
      },
      {
        titulo : descriptions.safety.title,
        media: main_rates.safety,
        color: "#E02F31",
        parametros: safety_param, 
      },
      {
        titulo : descriptions.maintenance_and_urbanity.title,
        media: main_rates.maintenance_and_urbanity,
        color: "#DDDF00",
        parametros: maintenance_and_urbanity_param, 
      },
    ]
  }
  //info.nota = structure.reviews.map(r => r.nota)
  return info
}

const Ideciclo = ({ structure, form, rate }) => {
  const info = getAllData(structure, form, rate)

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
      categories: info.categories,
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
    series: info.series,
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
                {(""+info.nota.toFixed(1)).replace(".",",")}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Extensão (km)</h3>
              <h3 className="text-5xl font-bold mt-2">{((info.comprimento/1000).toFixed(2)).replace(".",",")}</h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>Avaliações</h3>
              <h3 className="text-5xl font-bold mt-2">
                {info.avaliacoes}
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
              <h3>{"Dados"}</h3>
                {/*<a href={count.summary.download_xlsx_url} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">XLSX</a>*/}
                <a href={`https://api.contagem.ameciclo.org/v1/structure/${structure._id}`} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">Formulário</a>
                <a href={`https://api.contagem.ameciclo.org/v1/structure/${structure._id}`} className="border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2">Notas</a>
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
                <strong>{info.tipologia.toUpperCase()}</strong>
                , <strong>{info.fluxo.toUpperCase()}</strong>
                , com piso de <strong>{info.pavimento.replace(","," e").toUpperCase()}</strong>
                {(info.tipologia != "ciclorrota") && (<>, localizada <strong>{info.localizacao.toUpperCase()}</strong></>)}
                
              </h3>
            </div>
            <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
              <h3>LARGURA</h3>
              {(info.largura_transitavel >= 0) ? (
              <h3 className="text-3xl  mt-2">
                <strong>{(""+info.largura_total).replace(".",",")}m</strong>
                , onde <strong>{(""+info.largura_transitavel).replace(".",",")}m </strong>são transitáveis
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
                {info.data.substring(0,10)}
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
            <Source id="malha" type={malha.type} data={info.map}>
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
          <h3 className="text-4xl font-bold my-8">Detalhamento e composição das notas</h3>
        <section className="container mx-auto mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10">
            {info.parametros.map(out_param => {
              return (
                <div className="rounded shadow-2xl">
                  <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
                    <div className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest" style={{ background: out_param.color}}>
                      <h3>{out_param.titulo}</h3>
                      <h3 className="text-5xl font-bold mt-2">
                        {(""+out_param.media.toFixed(1)).replace(".",",")}
                      </h3>
                    </div>
                    {out_param.parametros.map(inner_param => {
                      return (
                      //<Tippy content={n.descricao}>
                        <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
                          <h3>{inner_param.titulo}</h3>
                          <h3 className="text-4xl font-bold mt-2">
                            {inner_param.media >= 0 ? ((""+inner_param.media.toFixed(1)).replace(".",",")) : ("N/A")}  
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
    params: { ideciclo: s.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  /**const res = await fetch(
    `https://api.ideciclo.ameciclo.org/api/v1/structures/${params.ideciclo}`
  );*/
  const structure = structures.filter(s => s.id === params.ideciclo)[0]//await res.json();
  let s = structure
  s.reviews = structure.reviews.sort((a,b) => a.year < b.year)
  const segm_zero_id = s.reviews[0].segments[0].form_id
  const form = forms.filter(f => f.id === segm_zero_id)[0]
  const rate = rates.filter(r => r.id === segm_zero_id)[0]
  return {
    props: {
      structure: structure,
      form: form,
      rate: rate,
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
