import React from "react";
import { MultipleSelectionFiltersIdeciclo } from "./SelectionFilterMenuIdeciclo";
import {
  IntlNumberMin1Max3Digits,
  IntlNumber1Digit,
  IntlNumberMax1Digit,
  IntlPercentil,
  IntlNumber3Digit,
} from "../../utils"; // Import as needed


// Ideciclo styled
export const NumberCardIdeciclo = ({
  city,
  selected,
  changeFunction,
  onClickFnc,
  options = { type: "default" },
}) => {
  const value = city.value;
  const unit = city.unit;

  let formattedValue;
  switch (options.type) {
    case "max1digit":
      formattedValue = IntlNumberMax1Digit(value);
      break;
    case "percentual":
      formattedValue = IntlPercentil(value);
      break;
    case "max3digits":
      formattedValue = IntlNumberMin1Max3Digits(value);
      break;
    case "3digits":
      formattedValue = IntlNumber3Digit(value);
      break;
    default:
      formattedValue = value; // Default format
  }

  const label = city.label?.replace("/", " ");

  return (
    <div
      className={`flex flex-col rounded-[40px] shadow-[0px_6px_8px_rgba(0,0,0,0.25)] h-full mx-3 ld:mx-0 p-3 justify-center align-center ${
        selected ? "bg-[#6DBFAC] text-gray-700" : "bg-white text-gray-700"
      } h-42 hover:bg-[#EFC345] hover:text-gray-700`}
    >
      <button
        onClick={() => {
          changeFunction(city.id);
          onClickFnc();
        }}
      >
        <div className="flex center justify-center">
          <h3 className="text-center text-5xl font-bold">{formattedValue}</h3>
          {unit != undefined && (
            <p className="uppercase font-semibold tracking-widest ">{unit}</p>
          )}
        </div>
        <div className="p-3">
          <h3 className="uppercase tracking-widest ">{label}</h3>
        </div>
      </button>
    </div>
  );
};

export const NumberCardsIdeciclo = ({ cards, data, selected, options }) => {
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-12 md:my-24 md:mb-6">
        <MultipleSelectionFiltersIdeciclo {...data} />
        <section className="container mx-auto gap-8 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map((city) => (
            <NumberCardIdeciclo
              key={city.id}
              city={city}
              selected={city.id === selected}
              changeFunction={options.changeFunction}
              onClickFnc={() => {}}
              options={options}
            />
          ))}
        </section>
      </div>
    </section>
  );
};
