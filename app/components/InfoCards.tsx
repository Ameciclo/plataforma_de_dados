import React from "react";

export const InfoCards = ({ cards }) => {
  return (
    <section className="container mx-auto grid grid-cols-2 max-[320px]:grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-10 my-10">
      {cards.map((card) => (
        <InfoCard {...card} />
      ))}
    </section>
  );
};

const InfoCard = ({ label, data, icon }) => {
  let percent = data * 100;
  let text = `${percent.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })}%`;

  return (
    <div
      className={`text-center sm:text-left text-base bg-white text-gray-800 min-h-32 rounded shadow-2xl p-3 uppercase tracking-widest flex justify-between flex-col sm:flex-row`}
    >
      <div>
        <h3 className="">{label}</h3>
        <h3 className="text-4xl sm:text-5xl font-bold">
          {text}
        </h3>
      </div>
      <img src={`/icons/contagens/${icon}.svg`} className="h-20 fill-current" />
    </div>
  );
};
