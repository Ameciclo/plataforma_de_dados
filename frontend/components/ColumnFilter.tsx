import React from "react";

const ColumnFilter = ({ column }) => {
  const {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  } = column;
  return (
    <>
      <span>Buscar:{""}</span>
      <input
        style={{ minWidth: "220px" }}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`${length} registros`}
      />
    </>
  );
};

export default ColumnFilter;
