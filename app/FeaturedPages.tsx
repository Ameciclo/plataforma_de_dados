import React from "react";
import { CardSession } from "./components/CardsSession";
import { FEATURED_PAGES } from "../servers";
import { FeaturedPage } from "../typings";

async function fetchFeaturedPages() {
  const response = await fetch(FEATURED_PAGES, { cache: "no-cache" });
  const data: FeaturedPage[] = await response.json();
  return data;
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
