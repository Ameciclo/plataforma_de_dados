import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import ContagensTable from "../components/ContagensTable";

const Contagens = ({ cyclistCounts, globalSummary }) => {
  
  function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  var countsGroupedByLocation = groupBy(cyclistCounts, (count) => count.name)
  var countsGroupedArray = Object.entries(countsGroupedByLocation)

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Contagens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle content-center flex w-full bg-ameciclo flex-col"
        style={{ marginTop: "16px", height: "25vh" }}
      >
        <div className="container mx-auto my-8">
          <div className="container mx-auto my-12">
            <h1 className="text-4xl font-bold">Contagens</h1>
          </div>
        </div>
      </div>
      <section className="container mx-auto grid-cols-1 p-8">

        <section className="container mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-10 my-10">
          <div className="bg-white text-ameciclo h-32 rounded shadow-2xl p-3">
            <h3>Número de ciclistas contados</h3>
            <h3 className="text-4xl">{globalSummary[0].totalAmount}</h3>
          </div>
          <div className="bg-white text-ameciclo h-32 rounded shadow-2xl p-3">
            <h3>Contagens Realizadas</h3>
            <h3 className="text-4xl">{globalSummary[0].numberOfCounts}</h3>
          </div>
          <div className="bg-white text-ameciclo h-32 rounded shadow-2xl p-3">
            <h3>Pontos Monitorados</h3>
            <h3 className="text-4xl">{countsGroupedArray.length}</h3>
          </div>
          <div className="bg-white text-ameciclo h-32 rounded shadow-2xl p-3">
            <h3>Máximo em um ponto</h3>
            <h3 className="text-4xl">{globalSummary[0].MaximumValue}</h3>
          </div>
        </section>

        <p className="text-justify">
          Registramos as pessoas que passam de bicicleta durante 14 horas em um
          pré-escolhido cruzamento da cidade do Recife. As nossas contagens são
          registradas manualmente através da observação das pessoas voluntárias
          na contagem, registrando a direção do deslocamento e fatores
          qualitativos. Dentre esses fatores estão o gênero, tipo de bicicleta,
          uso de capacete, se estão dando carona, se são crianças se estão à
          serviço e comportamentos como contramão e pedalada na calçada. Ainda
          são registrados outros fatores qualitativos que podem ser
          especificidades de cada local.
        </p>
        <p className="mt-3 text-justify">
          As contagens de ciclistas são importantes instrumentos de planejamento
          urbano. Elas permitem identificar os pontos de maior demanda por
          estruturas cicláveis, além das tendências futuras. A Ameciclo as
          utiliza como ferramentas para incidir no planejamento e tem seus dados
          abertos para serem usados pela mídia, academia ou quaisquer pessoa que
          assim deseje.
        </p>
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
