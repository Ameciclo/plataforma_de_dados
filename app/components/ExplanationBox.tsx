import React from "react";

type box = {
  title: string;
  description: string;
};

export const ExplanationBoxes = ({ boxes }: { boxes: box[] }) => {
  return (
    <section className="container mx-auto my-5 md:my-6 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between">
        {boxes.map((box : box) => {
          return (
            <div className="text-gray-800 p-6 sm:w-2/3 lg:w-5/6 sm:max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">{box.title}</h1>
              <p className="text-justify">{box.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
