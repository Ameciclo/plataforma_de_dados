
import React from "react";
import CityCard from "./CityCard";

const NumberCards = ({ title, data, selected, changeFunction, filters = [], maxDigs=3}) => {
  return (
      <section className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <h1 className="text-6xl font-bold pb-5">{title}</h1>
          {(filters.length > 0) && (
            filters.map(options => (
                <div className="inline-block relative w-64 px-4">
                    <label htmlFor="docType">{options.title}</label>
                    <select
                    value={options.value}
                    name={options.name}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={options.onChange}
                    onBlur={options.onBlur}
                    >
                    {options.items.map((s) => <option value={s.value}>{s.label}</option>)}
                    </select>
                </div>                
                ))
        )   }
        <section className="container mx-auto grid grid-cols-6 md:grid-cols-1 md:grid-cols-6 auto-rows-auto gap-10 my-10">
          {data.map((city, index) => (
              <CityCard data={city} selected={city.id==selected} key={city.id} changeFunction={changeFunction} position={index} maxDigs={maxDigs}/>
            ))}
        </section>
        </div>
      </section>
      );
};

export default NumberCards;