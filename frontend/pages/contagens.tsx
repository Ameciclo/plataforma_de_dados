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
