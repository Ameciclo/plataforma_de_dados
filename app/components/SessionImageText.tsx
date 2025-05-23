import React from "react";
import Image from "next/image";

export const SessionImageText = ({ text, image, alt = "", height = "", width = "" }) => {
  return (
    <section>
      <div className="container mx-auto flex flex-wrap p-10 flex-1 my-8 w-3/4 border bg-ameciclo bg-opacity-5 rounded-xl">
        <div className="w-1/4 justify-center items-center hidden md:block">
          <Image
            src={image}
            alt={alt != "" ? alt : ""}
            height={100}
            width={100}
          />
        </div>
        <div className="w-full text-center md:w-3/4 md:justify-center md:flex md:items-center">
          <p className="text-lg">{text}</p>
        </div>
      </div>
    </section>
  );
};
