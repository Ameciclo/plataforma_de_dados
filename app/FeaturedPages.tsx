import React from "react";
import { CardSession } from "./components/CardsSession";
import { FEATURED_PAGES } from "../servers";
import { FeaturedPage } from "../typings";

const fetchFeaturedPages = async () => {
  const res = await fetch(FEATURED_PAGES, { cache: "no-cache" });
  const featuredPages: FeaturedPage[] = await res.json();
  return featuredPages;
};

export async function FeaturedPages() {
  const featuredPages = await fetchFeaturedPages();
  return (
    <>
      <CardSession
        props={{
          title: "Navegue e visualize os dados",
          grids: featuredPages,
        }}
      />
    </>
  );
}
