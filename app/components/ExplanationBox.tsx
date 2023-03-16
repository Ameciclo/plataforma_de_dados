import React from "react";

export const ExplanationBox = ({ props }) => {
  return (
    <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between">
        {props.map((p) => {
          return (
            <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
              <h1 className="text-4xl font-bold mb-2">{p.title}</h1>
              <p>{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
