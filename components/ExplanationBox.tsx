import React from "react";

const ExplanationBox = ({title_1, text_1, title_2, text_2}) => {
    return (
    <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">{title_1}</h1>
          <p>{text_1}</p>
        </div>
        <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">{title_2}</h1>
          <p>{text_2}</p>
        </div>
      </div>
    </section>
    );
    };
    
export default ExplanationBox;