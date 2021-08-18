import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import ContagensTable from "../components/ContagensTable";
import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from "react-map-gl";
import Breadcrumb from "../components/Breadcrumb";
import InfoCard from "../components/InfoCard";

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
  const groupBy = (xs, f) => {
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
        <title>Contagens | Plataforma de Dados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{
          width: "100%",
          height: "52vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('/contagem.png')`,
        }}
      />
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
      <section>
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="font-bold text-3xl text-ameciclo py-8 w-2/3 mx-auto">
            Documentos para realizar contagens de ciclistas.
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-1 gap-8 grid-flow-row">
            <GridCard
              title="Planilha de Contagem"
              text="Planilha que faz as contagens de fluxos e características de ciclistas"
              icon="ideciclo"
              url="https://drive.google.com/uc?export=download&id=14D_Ly5GlX9toMKIy79Lsg4TcTQwI1vJP"
            />
            <GridCard
              title="Planilha Auxiliar"
              text="Planilha com os dados qualitativos para auxiliar na contagem."
              icon="relatorio"
              url="https://drive.google.com/uc?export=download&id=1hEP6Dlqf6677LpCdnSyldAzoGTTrmGNT"
            />
            <GridCard
              title="Planilha Eletrônica"
              text="Planilha para compilar todos os dados e chegar às conclusões."
              icon="relatorio"
              url="https://docs.google.com/spreadsheets/d/1KZUXJ_GkcEnu-ZBgEKkIMq2yRNCI0nRK7dlz2O9QqVs/edit#gid=2030770011"
            />
            <GridCard
              title="Modelo de Relatório"
              text="Relatório modelo para cada contagem de ciclistas."
              icon="relatorio"
              url="https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing"
            />
            <GridCard
              title="Panfleto de instruções"
              text="Panfleto informativo que mostra como as informações devem ser marcadas."
              icon="contagem"
              url="https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4LURYY2o2Nml0TDA"
            />
            <GridCard
              title="Instruções gerais"
              text="Mais informações acerca de como nossa contagem é realizada."
              icon="contagem"
              url="https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4emY5aENNWnJDZE9jRlVvU0VqTVpKMUFZemxV"
            />
            <GridCard
              title="Manual da Transporte Ativo"
              text="Manual de contagens fotográficas que baseou muitas das contagens no Brasil."
              icon="ideciclo"
              url="http://transporteativo.org.br/contagens/manual_contagem_fotografica.pdf"
            />
            <GridCard
              title="Manual do ITDP"
              text="Recomendações técnicas e monitoramento atualizado para uniformização das contagens de ciclsitas."
              icon="relatorio"
              url="http://itdpbrasil.org/wp-content/uploads/2018/10/Contagens-de-ciclistas_ITDP_out2018_v04.pdf"
            />
          </div>
        </div>
      </section>
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
