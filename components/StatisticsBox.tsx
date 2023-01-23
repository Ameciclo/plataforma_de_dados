import React from "react";

const StatisticsBox = ({title, boxes, subtitle = ""}) => {
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold">{title}</h1>
        {subtitle && (<h3 className="text-4xl font-bold my-8">{subtitle}</h3>)}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
          {boxes.map((box) => (
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{box.title}</h3>
                  <h3 className="text-5xl font-bold mt-2">{box.value}</h3>
              </div>
          ))}
        </div>
      </div>
    </section>
    );
  };
  
  export default StatisticsBox;