import React from "react";
import dynamic from "next/dynamic";

const MyChart = dynamic(() => import("../../components/QChart"), {
  ssr: false,
});

const Contagem = ({ count }) => {
  console.log(count.summary);
  let summaryData = [
    { name: "Mulheres", quantity: count.summary.women_percent },
  ];

  return (
    <div>
      <MyChart />
      <span>Teste</span>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    "https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count"
  );
  const cyclistCount = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = cyclistCount.map((c) => ({
    params: { contagem: c._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count/${params.contagem}`
  );
  const count = await res.json();
  return {
    props: {
      count: count,
    },
    revalidate: 1,
  };
}

export default Contagem;
