import Link from "next/link";
import React from "react";
import Image from "next/image";
import {ImageWithLink} from "../../typings"

export const ImagesGrid = (props) => {
  const { title, gridImages } = props;
  return (
    <section className="bg-white">
      <div className="flex-1 container mx-auto p-10 text-center">
        <h3 className="font-bold text-3xl text-ameciclo py-8">{title}</h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row"
          style={{ justifyItems: "center" }}
        >
          {gridImages?.map((image: ImageWithLink) => (
            <div className="bg-white rounded-lg shadow-xl w-full">
              <Link href={image.url}>
                <Image
                  className="object-fill h-48 w-full"
                  alt={image.alt}
                  src={image.src}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};