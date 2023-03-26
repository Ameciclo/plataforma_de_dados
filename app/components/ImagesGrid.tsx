import Link from "next/link";
import React from "react";
import Image from "next/image";

export function ImagesGrid({ title, images }) {
  return (
    <section className="bg-white">
      <div className="flex-1 container mx-auto p-10 text-center">
        <h3 className="font-bold text-3xl text-ameciclo py-8">{title}</h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row"
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

export function ImageWithLink({
  url,
  alt,
  src,
  width = 500,
  height = 500,
  target = "_blank",
}) {
  return (
    <Link href={url} target={target}>
      <Image
        className="object-fill h-48 w-full"
        alt={alt}
        src={src}
        width={width}
        height={height}
      />
    </Link>
  );
}
