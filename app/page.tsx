import React from "react";
import { ImageTextBar } from "./components/ImageTextBar";
import { CardSession } from "./components/CardsSession";
import { ImagesGrid } from "./components/ImagesGrid";
import { PLATAFORM_HOME_PAGE, FEATURED_PAGES } from "../servers";

const fetchPlataformHomePage = async () => {
  const res = await fetch(PLATAFORM_HOME_PAGE, { cache: "no-cache" });
  const homePageData: any = await res.json();
  return homePageData;
};

async function fetchFeaturedPages() {
  const response = await fetch(FEATURED_PAGES, { cache: "no-cache" });
  const data: any[] = await response.json();
  return data;
}

export default async function Home() {
  const data = await fetchPlataformHomePage();
  const { description, partners } = data;
  const featuredPages = await fetchFeaturedPages();
  const dataPartners = partners.map((p) => {
    return {
      src: p.image.url,
      alt: p.title,
      url: p.link,
    };
  });
  return (
    <div className="home-page">
      {/* @ts-ignore */}
      <ImageTextBar
        props={{
          image: "/icons/home/research.svg",
          text: description,
        }}
      />
      {/* @ts-ignore */}
      <CardSession
        props={{
          title: "Navegue e visualize os dados",
          grids: featuredPages,
        }}
      />
      {/* @ts-ignore */}
      <ImagesGrid
        props={{
          title: "Outras plataformas de dados de parceiras",
          gridImages: dataPartners,
        }}
      />
    </div>
  );
}
