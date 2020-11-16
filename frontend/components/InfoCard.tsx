import React from "react";
import PropTypes from "prop-types";

const InfoCard = ({ label, data, style }) => {
  return (
    <div
      className={`${
        style === "ameciclo"
          ? "bg-ameciclo text-white"
          : "bg-white text-gray-800"
      } h-32 rounded shadow-2xl p-3 uppercase tracking-widest`}
    >
      <h3>{label}</h3>
      <h3 className="text-4xl">{data}</h3>
    </div>
  );
};

InfoCard.propTypes = {
  label: PropTypes.string,
  style: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
};

InfoCard.defaultProps = {
  style: "default",
};

export default InfoCard;
