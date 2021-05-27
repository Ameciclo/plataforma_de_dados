import React from "react";
import PropTypes from "prop-types";

const FrontCard = ({ label, data, style, icon }) => {
  return (
    <div
      className={`${
        style === "ameciclo"
          ? "bg-ameciclo text-white"
          : "bg-white text-gray-800"
      } h-100 rounded shadow-2xl p-3 uppercase tracking-widest`}
    >
      <h3>{icon}</h3>
      <h3 className="text-4xl">{label}</h3>
      <p>{data}</p>
    </div>
  );
};

FrontCard.propTypes = {
  label: PropTypes.string,
  style: PropTypes.string,
  data: PropTypes.string,
};

FrontCard.defaultProps = {
  style: "default",
};

export default FrontCard;
