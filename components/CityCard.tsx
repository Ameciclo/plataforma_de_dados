import React from "react";
import PropTypes from "prop-types";

const CityCard = ({ data, selected, changeFunction, position, maxDigs}) => {
  //console.log(data.name + " " + ideciclo)
  let value = data.value
  let value_text = "NaN"
  if(maxDigs == 1) {
    value = Math.round(value * 10) / 10
    value_text = `${value.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1})}`
  } else{
    if (value < 1) {
      value = Math.round(value * 1000) / 1000
      value_text = `${value.toLocaleString("pt-BR", {maximumFractionDigits: 3, minimumFractionDigits: 3})}`
      } else {
      value = Math.round(value * 10)/10
      value_text = `${value.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1})}`
     }    
  }


  const label = data.label.replace('/', ' ')
  return (
    <button onClick={() => changeFunction(data.id)}
    className={`${
      selected
        ? "bg-ameciclo text-white"
        : "bg-white text-gray-800"
      } h-42 hover:bg-red-600 hover:text-white`}>
      <div
        className={`h-full rounded shadow-2xl p-3 uppercase tracking-widest flex justify-between flex-col`}
      >
        <div>
          <h3 className="text-center sm:text-center text-base sm:text-5xl font-bold">
            {value_text}
          </h3>
        </div>
        <div className="p-2">
        {/*<  <h3 className="hidden sm:block">{(position+1) + "ª"}</h3>*/}
          <h3 className="hidden sm:block">{label}</h3>
        </div>
        {/*<img src={`/icons/${icon}.svg`} className="h-20 fill-current" />*/}
      </div>
    </button>
  );
};

CityCard.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
};

CityCard.defaultProps = {
  style: "default",
  icon: "women",
};

export default CityCard;
