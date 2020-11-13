import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import ContagensTable from "../components/ContagensTable";

const Contagens = ({ cyclistCounts }) => {
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
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto">
        <ContagensTable data={cyclistCounts} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count`
  );
  const cyclistCounts = await res.json();
  return { props: { cyclistCounts } };
}

export default Contagens;
