import React from "react";
import PropTypes from "prop-types";

const InfoCard = ({ label, data, style, icon }) => {
  let percent = (data)
  let text = `${percent.toLocaleString("pt-BR", {maximumFractionDigits: 1})}`

  return (
    <div
      className={`${
        style === "ameciclo"
          ? "bg-ameciclo text-white"
          : "bg-white text-gray-800"
      } h-32 rounded shadow-2xl p-3 uppercase tracking-widest flex justify-between flex-col sm:flex-row`}
    >
      <div>
        <h3 className="hidden sm:block">{label}</h3>
        <h3 className="text-center sm:text-left text-base sm:text-5xl font-bold">
          {text}
        </h3>
      </div>
      <img src={`/icons/${icon}.svg`} className="h-20 fill-current" />
    </div>
  );
};

InfoCard.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
};

InfoCard.defaultProps = {
  style: "default",
  icon: "women",
};

export default InfoCard;
