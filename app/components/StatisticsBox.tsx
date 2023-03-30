import Link from "next/link";
import React from "react";

export const StatisticsBox = ({ title, boxes, subtitle = "" }) => {
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-12">
        <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>
        {subtitle && <h3 className="text-2xl md:text-3xl font-bold my-8">{subtitle}</h3>}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
          {boxes.map((box: any) =>
            box?.type == "LinksBox" ? <LinksBox {...box} /> : <NumberBox {...box} />
          )}
        </div>
      </div>
    </section>
  );
};

function NumberBox({ title, value, unit = undefined }) {
  return (
    <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
      <h3>{title}</h3>
      <h3 className="text-3xl sm:text-5xl font-bold mt-2">{value}</h3>
      {unit && <p>km</p>}
    </div>
  );
}

function LinksBox({ title, value }) {
  return (
    <>
      <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
        <h3>{title}</h3>
        {value.map((v) => (
          <Link
            href={v.url}
            className="border border-teal-500 bg-ameciclo text-white hover:bg-red-500 hover:border-red-300 rounded px-4 py-2 mt-2"
          >
            {v.label}
          </Link>
        ))}
      </div>
    </>
  );
}
