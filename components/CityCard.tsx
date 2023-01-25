import React from "react";
import PropTypes from "prop-types";

const CityCard = ({ data, selected, changeFunction, position}) => {
  let ideciclo = data.reviews.length > 0 ? (data.reviews[0].ideciclo) : ('100')
  //console.log(data.name + " " + ideciclo)
  let text = `${ideciclo.toLocaleString("pt-BR", {maximumFractionDigits: 3, minimumFractionDigits: 3})}`
  const label = data.name.replace('/', ' ')
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
            {text}
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
