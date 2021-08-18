import React from "react";
import { useTable, usePagination, useFilters, useGlobalFilter, useSortBy, useAsyncDebounce } from "react-table";

// Define a default UI for filtering
  export const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    }) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
      }, 200)
  
    return (
      <span className="max-w-sm text-gray-600 border-2 border-amecicloTransparent bg-white h-10 px-5 pr-5 pt-2 rounded-lg text-sm focus:outline-none">
       {' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Busca em ${count} produtos...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }