import React from "react";

export const GridSession = ({ props }) => {
  const { cards } = props;
  return (
    <section className="container mx-auto grid grid-cols-3 sd:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10">
      {cards.map((card) => (
        <InfoCard props={card} />
      ))}
    </section>
  );
};

const InfoCard = ({ props }) => {
  const { label, data, icon } = props;
  let percent = data * 100;
  let text = `${percent.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })}%`;

  return (
    <div
      className={`bg-white text-gray-800 h-32 rounded shadow-2xl p-3 uppercase tracking-widest flex justify-between flex-col sm:flex-row`}
    >
      <div>
        <h3 className="hidden sm:block">{label}</h3>
        <h3 className="text-center sm:text-left text-base sm:text-5xl font-bold">
          {text}
        </h3>
      </div>
      <img src={`/icons/contagens/${icon}.svg`} className="h-20 fill-current" />
    </div>
  );
};
