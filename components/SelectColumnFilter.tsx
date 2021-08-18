
import React from "react";

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return Array.from(options.values())
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">Todos tipos</option>
        {options.map((option: string, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  export default SelectColumnFilter;
