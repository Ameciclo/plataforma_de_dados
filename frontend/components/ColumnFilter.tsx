import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <>
      <input
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Buscar"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
};

export default ColumnFilter;
