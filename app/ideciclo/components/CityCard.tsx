import React from "react";

export const CityCard = ({ props }) => {
  const { city, selected, changeFunction, maxDigs, onClickFnc } = props;

  let value = city.value;
  let unit = city.unit;
  let value_text = "NaN";
  if (maxDigs == 1) {
    value = Math.round(value * 10) / 10;
    value_text = `${value.toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })}`;
  } else {
    if (value < 1) {
      value = Math.round(value * 1000) / 1000;
      value_text = `${value.toLocaleString("pt-BR", {
        maximumFractionDigits: 3,
        minimumFractionDigits: 3,
      })}`;
    } else {
      value = Math.round(value * 10) / 10;
      value_text = `${value.toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      })}`;
    }
  }

  const label = city.label.replace("/", " ");
  return (
    <>
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
            <h3 className="text-center text-5xl font-bold">{value_text}</h3>
            {unit != undefined && <p className="uppercase tracking-widest ">{unit}</p>}
          </div>
          <div className="p-3">
            {/*<  <h3 className="hidden sm:block">{(position+1) + "ª"}</h3>*/}
            <h3 className="uppercase tracking-widest ">{label}</h3>
          </div>
          {/*<img src={`/icons/${icon}.svg`} className="h-20 fill-current" />*/}
        </button>
      </div>
    </>
  );
};