import React from "react";

export function VerticalStatisticsBoxes({ title, boxes }) {
  return (
    <section className="container mx-auto">
      <div className="mx-auto text-center my-24">
        <h3 className="text-4xl font-bold my-8">{title}</h3>
        <section className="container mx-auto grid lg:grid-cols-4 md:grid-cols-1 auto-rows-auto gap-10 my-10">
          {boxes.map((out_param: any) => (
            <VerticalBox {...out_param} />
          ))}
        </section>
      </div>
    </section>
  );
}

export function VerticalBox({ titulo, media, color, parametros }) {
  return (
    <div className="rounded shadow-2xl">
      <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
        <div
          className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest"
          style={{ background: color }}
        >
          <h3>{titulo}</h3>
          <h3 className="text-5xl font-bold mt-2">
            {media && ("" + media.toFixed(1)).replace(".", ",")}
          </h3>
        </div>
        {parametros.map((inner_param: any) => (
          <StatisticBox {...inner_param} />
        ))}
      </div>
    </div>
  );
}

function StatisticBox({ titulo, media, different, bigger }) {
  return (
    <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
      <h3>{titulo}</h3>
      <h3 className="text-4xl font-bold mt-2">
        {media !== null && media >= 0
          ? ("" + media.toFixed(1)).replace(".", ",") +
            "" +
            (different ? (bigger ? "" : "") : "")
          : "N/A"}
      </h3>
    </div>
  );
}
