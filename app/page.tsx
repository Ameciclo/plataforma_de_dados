import React from "react";
import ImageTextBar from "../components/ImageTextBar";
import { CardSession } from "./components/CardsSession";
import { PartnersSession } from "../components/PartnersCard";
import { DataPartners } from "./DataPartners";
import {FeaturedPages} from "./FeaturedPages"

/** o que está como constante global virá do Strapi */
const imagetextbar = {
  image: "/icons/research.svg",
  text:
    "Nesta plataforma você encontra dados sobre mobilidade ativa, produzidos por nós ou pelo poder público, com visualização facilitada para estudantes, jornalistas, cicloativistas, pesquisadoras(es) e pessoas interessadas. As informações são abertas para uso de todas as pessoas que desejam uma cidade mais humana, democrática e sustentável.",
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

export default async function Home() {
  return (
    <>
      <ImageTextBar image={imagetextbar.image} text={imagetextbar.text} />
      {/** @ts-ignore */}
      <FeaturedPages />
      {/** @ts-ignore */}
      <DataPartners />
      <PartnersSession partners={partners} />
    </>
  );
}
