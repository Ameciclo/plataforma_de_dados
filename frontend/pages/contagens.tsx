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
        style={{ marginTop: "16px", height: "25vh" }}>
        <div className="container mx-auto my-8">
          <div className="container mx-auto my-12">
            <h1 className="text-4xl font-bold">Contagens</h1>
          </div>
        </div>
      </div>

      <ContagensTable data={cyclistCounts} />
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
