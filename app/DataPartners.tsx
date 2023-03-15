import React from "react";
import { ImagesGrid } from "./components/ImagesGrid";
import {ImageWithLink } from "../typings";
import { DATA_PARTNERS } from "../servers";

const fetchDataPartners = async () => {
  const res = await fetch(DATA_PARTNERS, { cache: "no-cache" });
  const dataPartners: ImageWithLink[] = await res.json();
  return dataPartners;
};

export async function DataPartners() {
  const dataPartners = await fetchDataPartners();
  return (
    <>
      <ImagesGrid
        props={{
          title: "Outras plataformas de dados de parceiras",
          gridImages: dataPartners,
        }}
      />
    </>
  );
}
