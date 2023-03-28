import React from "react";

export function VerticalStatisticsBoxes({ title, info }) {
  return (
    <section className="container mx-auto">
      <div className="mx-auto text-center my-24">
        <h3 className="text-4xl font-bold my-8">
          Detalhamento e composição das notas
        </h3>
        <section className="container mx-auto grid lg:grid-cols-4 md:grid-cols-1 auto-rows-auto gap-10 my-10">
          {info.parametros.map((out_param: any) => {
            <VerticalBox {...out_param} />;
          })}
        </section>
      </div>
    </section>
  );
}

export function VerticalBox({ out_param }) {
  return (
    <div className="rounded shadow-2xl">
      <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
        <div
          className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest"
          style={{ background: out_param.color }}
        >
          <h3>{out_param.titulo}</h3>
          <h3 className="text-5xl font-bold mt-2">
            {out_param.media &&
              ("" + out_param.media.toFixed(1)).replace(".", ",")}
          </h3>
        </div>
        {out_param.parametros.map((inner_param: any) => {
          <StatisticBox {...inner_param} />;
        })}
      </div>
    </div>
  );
}

function StatisticBox({ inner_param }) {
  return (
    <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
      <h3>{inner_param.titulo}</h3>
      <h3 className="text-4xl font-bold mt-2">
        {inner_param.media !== null && inner_param.media >= 0
          ? ("" + inner_param.media.toFixed(1)).replace(".", ",") +
            "" +
            (inner_param.different ? (inner_param.bigger ? "" : "") : "")
          : "N/A"}
      </h3>
    </div>
  );
}
