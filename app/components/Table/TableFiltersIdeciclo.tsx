import React from "react";
import {
  Cell,
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
} from "react-table";

// Define a default UI for filtering
export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="max-w-sm text-gray-600 border-2 border-amecicloTransparent bg-white h-10 px-5 pr-5 pt-2 rounded-xl text-sm focus:outline-none">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Busca em ${count} produtos...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
};

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <>
      <input
        className="my-2 max-w-sm text-gray-600 bg-white h-10 px-4 rounded-xl text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Buscar"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          background: "#E5E8E9",
        }}
      />
    </>
  );
};

export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        className="my-2 max-w-sm text-gray-600 bg-gray-300 h-10 rounded-xl text-sl text-center focus:outline-none"
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          let val = e.target.value;
          setFilter((old = []) => {
            if (parseFloat(val) < min) val = "" + min;
            if (parseFloat(val) > max) val = "" + max;
            return [val ? parseFloat(val) : undefined, old[1]];
          });
        }}
        placeholder={`Mín(${min.toFixed(1)})`}
        style={{
          width: "70px",
          marginRight: "0.5rem",
          background: "#E5E8E9",
        }}
      />
      <div className="my-5 max-w-sm text-gray-600  text-sl text-center">a</div>
      <input
        className="my-2 max-w-sm text-gray-600 bg-gray-300 h-10 rounded-xl text-sl text-center focus:outline-none"
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          let val = e.target.value;
          setFilter((old = []) => {
            if (parseFloat(val) < min) val = "" + min;
            if (parseFloat(val) > max) val = "" + max;
            return [old[0], val ? parseFloat(val) : undefined];
          });
        }}
        placeholder={`Máx(${max.toFixed(1)})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem",
          background: "#E5E8E9",
        }}
      />
    </div>
  );
}

export function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-xl text-sm focus:outline-none"
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Reiniciar</button>
    </>
  );
}

// Seletor "Tipo"
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return Array.from(options.values());
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="my-2 max-w-sm text-gray-600 bg-gray-300 h-10 px-5 pr-16 rounded-xl text-sm focus:outline-none"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Todos tipos</option>
      {options.map((option: string, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Define a custom filter filter function!
export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

export const FilterPill = ({ filter, addOrRemoveFilter }) => {
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

/* export const cellFilterByValue = {
  Cell: ({ value }) => {
    value ? (
      <span>{("" + value.toFixed(2)).replace(".", ",")}</span>
    ) : (
      <span>{"N/A"}</span>
    );
  },
}; */