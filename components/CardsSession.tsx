import React from "react";
import InfoCard from "./InfoCard";

const CardsSession = ({ cards }) => {
  return (
    <section className="container mx-auto grid grid-cols-3 md:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
        {cards.map((card) => (
            <InfoCard
                data={card.data}
                label={card.label}
                icon={card.icon}
            />       
        ))}
    </section>
  );
};

export default CardsSession;