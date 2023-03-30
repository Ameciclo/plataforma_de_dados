import React from "react";
import { ImageWithLink } from "./ImageWithLink";

export function ImagesGrid({ title, images }) {
  return (
    <section className="bg-white">
      <div className="flex-1 container mx-auto p-10 text-center">
        <h3 className="font-bold text-3xl text-ameciclo py-8">{title}</h3>
        <div
          className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ justifyItems: "center" }}
        >
          {images?.map((image) => (
            <div className="bg-white rounded-lg shadow-xl w-full">
              <ImageWithLink {...image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

