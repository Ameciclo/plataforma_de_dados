import React from "react";
import { MultipleSelectionFilters } from "./SelectionFilterMenu";
import {
  IntlNumberMin1Max3Digits,
  IntlNumber1Digit,
  IntlNumberMax1Digit,
  IntlPercentil,
} from "../../utils"; // Import as needed

export const NumberCard = ({
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
      formattedValue = value < 1 ? IntlNumberMin1Max3Digits(value) : IntlNumber1Digit(value);
      break;
    default:
      formattedValue = value; // Default format
  }

  const label = city.label?.replace("/", " ");

  return (
    <div
      className={`flex flex-col rounded shadow-2xl h-full mx-3 ld:mx-0 p-3 justify-between ${
        selected ? "bg-ameciclo text-white" : "bg-white text-gray-800"
      } h-42 hover:bg-red-600 hover:text-white`}
    >
      <button
        onClick={() => {
          changeFunction(city.id);
          onClickFnc();
        }}
      >
        <div>
          <h3 className="text-center text-5xl font-bold">{formattedValue}</h3>
          {unit != undefined && (
            <p className="uppercase tracking-widest ">{unit}</p>
          )}
        </div>
        <div className="p-3">
          <h3 className="uppercase tracking-widest ">{label}</h3>
        </div>
      </button>
    </div>
  );
};

export const NumberCards = ({ cards, data, selected, options }) => {
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-12 md:my-24">
        <MultipleSelectionFilters {...data} />
        <section className="container mx-auto gap-8 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map((city) => (
            <NumberCard
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
