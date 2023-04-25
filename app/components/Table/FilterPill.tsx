import React from "react";

const FilterPill = ({ filter, addOrRemoveFilter }) => {
  return (
    <>
      <label>
        <input
          className="hidden"
          type="checkbox"
          value={filter}
          onChange={(e) => addOrRemoveFilter(filter)}
        />

        <div className="toggle-btn rounded-3xl flex border switch w-32 h-10 bg-transparent items-center justify-center text-gray-800 outline-none focus:outline-none">
          {filter.value}
        </div>
      </label>
    </>
  );
};

export default FilterPill;
