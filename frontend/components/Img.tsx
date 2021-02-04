import React from "react";
import PropTypes from "prop-types";

Img.propTypes = {};

function Img({ src, aspectRatio = 16 / 9, className = "" }) {
  return (
    <div
      className="relative"
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="absolute inset-0">
        <img src={src} className={`${className} w-full h-full object-cover`} />
      </div>
    </div>
  );
}

export default Img;
