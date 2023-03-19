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
const GlobalFilter = ({
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
    <span className="max-w-sm text-gray-600 border-2 border-amecicloTransparent bg-white h-10 px-5 pr-5 pt-2 rounded-lg text-sm focus:outline-none">
      {" "}
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

function NumberRangeColumnFilter({
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
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 rounded-lg text-sl text-center focus:outline-none"
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
        }}
      />
      <div className="my-5 max-w-sm text-gray-600  text-sl text-center">a</div>
      <input
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 rounded-lg text-sl text-center focus:outline-none"
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
        }}
      />
    </div>
  );
}

function SliderColumnFilter({
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
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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

function SelectColumnFilter({
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
      className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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

/* export const cellFilterByValue = {
  Cell: ({ value }) => {
    value ? (
      <span>{("" + value.toFixed(2)).replace(".", ",")}</span>
    ) : (
      <span>{"N/A"}</span>
    );
  },
}; */

export {
  ColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  SelectColumnFilter,
  GlobalFilter,
};
