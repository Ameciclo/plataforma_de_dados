
import React from "react";
import CityCard from "../app/ideciclo/components/CityCard";

const NumberCards = ( props ) => {
  const {title, data, selected, changeFunction, filters, maxDigs, onClickFnc} = props
  return (
      <section className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <h1 className="grid text-6xl font-bold pb-5">{title}</h1>
          {(filters.length > 0) && (
            filters.map((filter : any) => (
                <div className="inline-grid bg-ameciclo  text-white font-bold rounded relative w-70 px-4 pb-6 pt-2 mx-4">
                    <label htmlFor="docType">{filter.title}</label>
                    <select
                    value={filter.value}
                    name={filter.name}
                    className="block appearance-none text-black font-bold w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={filter.onChange}
                    onBlur={filter.onBlur}
                    >
                    {filter.items.map((s : any) => <option value={s.value}>{s.label}</option>)}
                    </select>
                </div>                
                ))
        )   }
        <section className="container mx-auto grid grid-cols-6 sd:grid-cols-1 md:grid-cols-6 auto-rows-auto gap-10 my-10">
          {data.map((city : any, index) => (
              <CityCard data={city} selected={city.id==selected} key={city.id} changeFunction={changeFunction} position={index} maxDigs={maxDigs} onClickFnc={onClickFnc}/>
            ))}
        </section>
        </div>
      </section>
      );
};

export default NumberCards;