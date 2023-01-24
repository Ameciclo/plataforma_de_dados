import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";
import StatisticsBox from "../components/StatisticsBox";
import ExplanationBox from "../components/ExplanationBox";

import React, { useState } from "react";

import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from "react-map-gl";
import InfoCard from "../components/InfoCard";
import ContagensTable from "../components/ContagensTable";
import GridSession from "../components/GridSession";

const GridCard = ({ title, text, icon, url = "#" }) => {
  return (
    <a href={url}>
      <div className="bg-white bg-customGrey w-full rounded-lg flex items-center justify-center text-ameciclo p-8">
        <div className="flex flex-col text-center">
          {/*<img src={`/icons/${icon}.svg`} className="h-12 fill-current" />*/}
          <h2 className="text-2xl font-bold text-ameciclo uppercase tracking-wider my-2">
            {title}
          </h2>
          <p className="text-base font-medium">{text}</p>
        </div>
      </div>
    </a>
  );
};

const navControlStyle= {
  right: 10,
  top: 10
};

const Contagens = ({ cyclistCounts, globalSummary }) => {

  const page_data = {
    title: "Contagens de ciclistas",
    cover_image_url: "/contagem.png",
    Breadcrumb: {
      label:"Contagens",
      slug:"/contagens",
      routes:["/", "/contagens"],
    },
    ExplanationBox: {
      title_1: "O que é?",
      text_1: `Registramos as pessoas que passam de bicicleta durante 14 horas em
      um pré-escolhido cruzamento da cidade do Recife. As nossas
      contagens são registradas manualmente através da observação das
      pessoas voluntárias na contagem, registrando a direção do
      deslocamento e fatores qualitativos. Dentre esses fatores estão o
      gênero, tipo de bicicleta, uso de capacete, se estão dando carona,
      se são crianças se estão à serviço e comportamentos como contramão
      e pedalada na calçada. Ainda são registrados outros fatores
      qualitativos que podem ser especificidades de cada local.`,
      title_2: "Para que serve?",
      text_2: `As contagens de ciclistas são importantes instrumentos de
      planejamento urbano. Elas permitem identificar os pontos de maior
      demanda por estruturas cicláveis, além das tendências futuras. A
      Ameciclo as utiliza como ferramentas para incidir no planejamento
      e tem seus dados abertos para serem usados pela mídia, academia ou
      quaisquer pessoa que assim deseje.`
    }
  }

  const groupBy = (xs, f) => {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  }
  let countsGroupedByLocation = groupBy(cyclistCounts, (count) => count.name);
  let countsGroupedArray = Object.entries(countsGroupedByLocation);
  
  const GeneralStatistics = {
    title: "Estatísticas Gerais",
    subtitle: "",
    boxes: [
    {title: "Total de ciclistas", value: globalSummary[0].totalAmount},
    {title: "Contagens Realizadas", value: globalSummary[0].numberOfCounts},
    {title: "Pontos Monitorados", value: countsGroupedArray.length},
    {title: "Máximo em um ponto", value: globalSummary[0].MaximumValue},
    ] 
  }


  const documents = {
    title: "Documentos para realizar contagens de ciclistas.",
    grids: [
      {title: "Planilha de Contagem", icon: "", url: "https://drive.google.com/uc?export=download&id=14D_Ly5GlX9toMKIy79Lsg4TcTQwI1vJP", text: "Planilha que faz as contagens de fluxos e características de ciclistas"},
      {title: "Planilha Auxiliar", icon: "", url: "https://drive.google.com/uc?export=download&id=1hEP6Dlqf6677LpCdnSyldAzoGTTrmGNT", text: "Planilha com os dados qualitativos para auxiliar na contagem."},
      {title: "Planilha Eletrônica", icon: "", url: "https://docs.google.com/spreadsheets/d/1KZUXJ_GkcEnu-ZBgEKkIMq2yRNCI0nRK7dlz2O9QqVs/edit#gid=2030770011", text: "Planilha para compilar todos os dados e chegar às conclusões."},
      {title: "Modelo de Relatório", icon: "", url: "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing", text: "Relatório modelo para cada contagem de ciclistas."},
      {title: "Panfleto de instruções", icon: "", url: "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4LURYY2o2Nml0TDA", text: "Panfleto informativo que mostra como as informações devem ser marcadas."},
      {title: "Instruções gerais", icon: "", url: "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4emY5aENNWnJDZE9jRlVvU0VqTVpKMUFZemxV", text: "Mais informações acerca de como nossa contagem é realizada."},
      {title: "Manual da Transporte Ativo", icon: "", url: "http://transporteativo.org.br/contagens/manual_contagem_fotografica.pdf", text: "Manual de contagens fotográficas que baseou muitas das contagens no Brasil."},
      {title: "Manual do ITDP", icon: "", url: "http://itdpbrasil.org/wp-content/uploads/2018/10/Contagens-de-ciclistas_ITDP_out2018_v04.pdf", text: "Recomendações técnicas e monitoramento atualizado para uniformização das contagens de ciclsitas."},
    ]
  }

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const SIZE = 20;

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

  const cards = [
    {label: , icon: , data: },
    {label: , icon: , data: },
    {label: , icon: , data: },
    {label: , icon: , data: },
    {label: , icon: , data: },
    {label: , icon: , data: },
  ]

  return (
    <Layout>
      <SEO title={page_data.title + " | Ameciclo"} />
      <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
      <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/>
      <StatisticsBox title={GeneralStatistics.title} subtitle={GeneralStatistics.subtitle} boxes={GeneralStatistics.boxes} />

      <ExplanationBox title_1={page_data.ExplanationBox.title_1} text_1={page_data.ExplanationBox.text_1} title_2={page_data.ExplanationBox.title_2} text_2={page_data.ExplanationBox.text_2}/>

      <section className="container mx-auto grid grid-cols-3 md:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
        <InfoCard
          data={globalSummary[0].totalWomenPercentile}
          label={"Mulheres"}
          icon="women"
        />
        <InfoCard
          data={globalSummary[0].totalChildrenPercentile}
          label={"Crianças e Adolescentes"}
          icon="children"
        />
        <InfoCard
          data={globalSummary[0].totalHelmetPercentile}
          label={"Capacete"}
          icon="helmet"
        />
        <InfoCard
          data={globalSummary[0].totalServicePercentile}
          label={"Serviço"}
          icon="service"
        />
        <InfoCard
          data={globalSummary[0].totalCargoPercentile}
          label={"Cargueira"}
          icon="cargo"
        />
        <InfoCard
          data={globalSummary[0].totalWrongWayPercentile}
          label={"Contramão"}
          icon="wrong_way"
        />
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
              <FullscreenControl style={navControlStyle}/>
            </div>

            <div style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            }}>
              <NavigationControl style={navControlStyle}/>
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

      <GridSession title={documents.title} grids={documents.grids} />
      
    </Layout>
  );
};

export async function getServerSideProps() {
  const globalSummaryRes = await fetch(
    `https://api.contagem.ameciclo.org/v1/cyclist-count/metadata`
  );

  const res = await fetch(
    `https://api.contagem.ameciclo.org/v1/cyclist-count/`
  );

  const cyclistCounts = await res.json();
  const globalSummary = await globalSummaryRes.json();

  return { props: { cyclistCounts: cyclistCounts.data, globalSummary: globalSummary.data } };
}

export default Contagens;
