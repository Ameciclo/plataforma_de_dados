import Link from "next/link";
import React from "react";
import Image from "next/image";

export const CardsSession = ({
  title,
  cards,
}: {
  title: string;
  cards: any[];
}) => {
  return (
    <section>
      <div className="flex-1 container mx-auto p-10 text-center">
        <h3 className="font-bold text-3xl text-ameciclo py-8 w-1/2 mx-auto">
          {title}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 sm:grid-rows-2 gap-8 grid-flow-row">
          {cards.map((card) => (
            <Card card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const { title, description, src = "", url = "#" } = card;
  return (
    <Link href={url} target="_blank">
      <div className="bg-white w-full rounded-lg flex items-center justify-center text-ameciclo p-10">
        <div className="flex flex-col text-center">
          {src != "" && (
            <Image
              className="h-32 fill-current"
              src={src}
              alt={title}
              height={100}
              width={100}
            />
          )}
          <h2 className="text-2xl font-bold text-ameciclo uppercase tracking-wider my-2">
            {title}
          </h2>
          <p className="text-base font-medium">{description}</p>
        </div>
      </div>
    </Link>
  );
};
