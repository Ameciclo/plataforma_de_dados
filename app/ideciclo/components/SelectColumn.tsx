
import React from "react";

function SelectColumn({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    
    // Render a multi-select box
    return (
      <select
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        value={filterValue}
        onChange={(e) => setFilter(e.target.value)}

      >
        <option value="">Nota Geral</option>
        <option value="incidir">Qualidade do Projeto</option>
        <option value="cultuar">Segurança Viária</option>
        <option value="articular">Manutenção e Urbanidade</option>
      </select>
    )
  }

  export default SelectColumn;
