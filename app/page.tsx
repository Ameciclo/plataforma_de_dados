import React from "react";
import ImageTextBar from "../components/ImageTextBar";
import GridSession from "../components/GridSession";
import ImagesGrid from "../components/ImagesGrid";
import { PartnersSession } from "../components/PartnersCard";

/** o que está como constante global virá do Strapi */
const imagetextbar = {
  image: "/icons/research.svg",
  text:
    "Nesta plataforma você encontra dados sobre mobilidade ativa, produzidos por nós ou pelo poder público, com visualização facilitada para estudantes, jornalistas, cicloativistas, pesquisadoras(es) e pessoas interessadas. As informações são abertas para uso de todas as pessoas que desejam uma cidade mais humana, democrática e sustentável.",
};

const site_pages_data = {
  title: "Navegue e visualize os dados",
  grids: [
    {
      title: "Contagens",
      icon: "contagem",
      url: "/contagens",
      text:
        "Contagens das viagens de bicicleta e suas caracteristicas observaveis",
    },
    {
      title: "Ideciclo",
      icon: "ideciclo",
      url: "/ideciclo",
      text: "Índice que mede a malha e qualidade da estrutura cicloviaria",
    },
    {
      title: "Estudos e Pesquisas",
      icon: "relatorio",
      url: "/documentos",
      text:
        "Nossos estudos, pesquisas e livros que participamos ou que fizeramos sobre nós.",
    },
    {
      title: "Perfil",
      icon: "perfil",
      url: "/perfil",
      text: "Dados socio-economicos dos ciclistas e suas percepções",
    },
    {
      title: "Observatório",
      icon: "mapa",
      url: "/observatorio",
      text:
        "Monitoramento das estruturas cicloviárias projetadas e executadas conforme PDC.",
    },
  ],
};

const images_grid = {
  title: "Mais dados em parceria",
  grids: [
    {
      image: "/ciclomapa.webp",
      alt: "Ciclomapa",
      url: "http://ciclomapa.org.br",
    },
    {
      image: "/observatorio.webp",
      alt: "Observatório da Bicicleta",
      url: "https://observatoriodabicicleta.org.br",
    },
    {
      image: "/mobilidados.webp",
      alt: "Mobilidados",
      url: "https://mobilidados.org.br",
    },
  ],
};

const partners = [
  {
    title: "Realização",
    orgs: [
      {
        name: "Ameciclo",
        url: "https://www.ameciclo.org",
        logo: {
          url: "/public/logo.png",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <ImageTextBar image={imagetextbar.image} text={imagetextbar.text} />
      <GridSession
        title={site_pages_data.title}
        grids={site_pages_data.grids}
      />
      <ImagesGrid title={images_grid.title} grids={images_grid.grids} />
      <PartnersSession partners={partners} />
    </>
  );
}
