import { Layout } from "../../components/OLD/OldLayout";
import StatisticsBox from "../../components/StatisticsBox";
import { ExplanationBox } from "../components/ExplanationBox";
import CardsSession from "../../components/CardsSession";
import CountingMap from "../../components/CountingMap";
import ContagensTable from "../../components/ContagensTable";
import { CardSession } from "../components/CardsSession";

import React from "react";
/* 
//////
/// esses consts irão para o BD
//////

const documents = {
  title: "Documentos para realizar contagens de ciclistas.",
  grids: [
    {
      title: "Planilha de Contagem",
      icon: "",
      url:
        "https://drive.google.com/uc?export=download&id=14D_Ly5GlX9toMKIy79Lsg4TcTQwI1vJP",
      text:
        "Planilha que faz as contagens de fluxos e características de ciclistas",
    },
    {
      title: "Planilha Auxiliar",
      icon: "",
      url:
        "https://drive.google.com/uc?export=download&id=1hEP6Dlqf6677LpCdnSyldAzoGTTrmGNT",
      text: "Planilha com os dados qualitativos para auxiliar na contagem.",
    },
    {
      title: "Planilha Eletrônica",
      icon: "",
      url:
        "https://docs.google.com/spreadsheets/d/1KZUXJ_GkcEnu-ZBgEKkIMq2yRNCI0nRK7dlz2O9QqVs/edit#gid=2030770011",
      text: "Planilha para compilar todos os dados e chegar às conclusões.",
    },
    {
      title: "Modelo de Relatório",
      icon: "",
      url:
        "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing",
      text: "Relatório modelo para cada contagem de ciclistas.",
    },
    {
      title: "Panfleto de instruções",
      icon: "",
      url:
        "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4LURYY2o2Nml0TDA",
      text:
        "Panfleto informativo que mostra como as informações devem ser marcadas.",
    },
    {
      title: "Instruções gerais",
      icon: "",
      url:
        "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4emY5aENNWnJDZE9jRlVvU0VqTVpKMUFZemxV",
      text: "Mais informações acerca de como nossa contagem é realizada.",
    },
    {
      title: "Manual da Transporte Ativo",
      icon: "",
      url:
        "http://transporteativo.org.br/contagens/manual_contagem_fotografica.pdf",
      text:
        "Manual de contagens fotográficas que baseou muitas das contagens no Brasil.",
    },
    {
      title: "Manual do ITDP",
      icon: "",
      url:
        "http://itdpbrasil.org/wp-content/uploads/2018/10/Contagens-de-ciclistas_ITDP_out2018_v04.pdf",
      text:
        "Recomendações técnicas e monitoramento atualizado para uniformização das contagens de ciclsitas.",
    },
  ],
};

const page_data = {
  title: "Contagens de ciclistas",
  cover_image_url: "/contagem.png",
  ExplanationBoxData: {
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
      quaisquer pessoa que assim deseje.`,
  },
};

const Contagens = ({ cyclistCounts, globalSummary }) => {
  const BreadcrumbConf = {
    label: "Contagens",
    slug: "/contagens",
    routes: ["/", "/contagens"],
  };
  const groupBy = (xs, f) => {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  };
  let countsGroupedByLocation = groupBy(cyclistCounts, (count) => count.name);
  let countsGroupedArray = Object.entries(countsGroupedByLocation);

  const GeneralStatistics = {
    title: "Estatísticas Gerais",
    subtitle: "",
    boxes: [
      { title: "Total de ciclistas", value: globalSummary[0].totalAmount },
      { title: "Contagens Realizadas", value: globalSummary[0].numberOfCounts },
      { title: "Pontos Monitorados", value: countsGroupedArray.length },
      { title: "Máximo em um ponto", value: globalSummary[0].MaximumValue },
    ],
  };

  const cards = [
    {
      label: "Mulheres",
      icon: "women",
      data: globalSummary[0].totalWomenPercentile,
    },
    {
      label: "Crianças e Adolescentes",
      icon: "children",
      data: globalSummary[0].totalChildrenPercentile,
    },
    {
      label: "Capacete",
      icon: "helmet",
      data: globalSummary[0].totalHelmetPercentile,
    },
    {
      label: "Serviço",
      icon: "service",
      data: globalSummary[0].totalServicePercentile,
    },
    {
      label: "Cargueira",
      icon: "cargo",
      data: globalSummary[0].totalCargoPercentile,
    },
    {
      label: "Contramão",
      icon: "wrong_way",
      data: globalSummary[0].totalWrongWayPercentile,
    },
  ];

  return (
    <Layout
      pageTitle={page_data.title}
      coverUrl={page_data.cover_image_url}
      breadcrumbConf={BreadcrumbConf}
    >
      <StatisticsBox
        title={GeneralStatistics.title}
        subtitle={GeneralStatistics.subtitle}
        boxes={GeneralStatistics.boxes}
      />
      <ExplanationBox
        props={[
          {
            title: page_data.ExplanationBoxData.title_1,
            description: page_data.ExplanationBoxData.text_1,
          },
          {
            title: page_data.ExplanationBoxData.title_2,
            description: page_data.ExplanationBoxData.text_2,
          },
        ]}
      />
      <CardsSession cards={cards} />
      <CountingMap cyclistCounts={cyclistCounts} />
      <ContagensTable data={cyclistCounts} />
      <CardSession title={documents.title} grids={documents.grids} />
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

  return {
    props: {
      cyclistCounts: cyclistCounts.data,
      globalSummary: globalSummary.data,
    },
  };
}

export default Contagens;
 */