"use client";
import React from "react";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { ColumnFilter, NumberRangeColumnFilter } from "../components/Table/TableFilters";
import { Table } from "../components/Table/Table";
import {
  COUNTINGS_DATA,
} from "../../servers";
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const ContagensTable = ({ data }) => {
  const [cyclistFilter, setCyclistFilter] = React.useState<[number | undefined, number | undefined]>([undefined, undefined]);
  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
    if (cyclistFilter[0] || cyclistFilter[1]) {
      const filtered = data.filter(item => {
        const value = item.total_cyclists;
        const min = cyclistFilter[0] || 0;
        const max = cyclistFilter[1] || Infinity;
        return value >= min && value <= max;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [cyclistFilter, data]);

  const minMax = React.useMemo(() => {
    if (!data.length) return [0, 0];
    const values = data.map(d => d.total_cyclists);
    return [Math.min(...values), Math.max(...values)];
  }, [data]);
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            className="text-ameciclo"
            href={`contagens/${row.original.slug}`}
            key={row.original.id}
          >
            {row.original.name}
          </Link>
        ),
        Filter: ColumnFilter,
      },
      {
        Header: "Data",
        accessor: "date",
        Cell: ({ value }) => (
          <span>{value.substr(0, 10).split("-").reverse().join("/")}</span>
        ),
        Filter: ColumnFilter,
      },
      {
        Header: "Total de Ciclistas",
        accessor: "total_cyclists",
        disableFilters: true,
      },

      {
        Header: "Dados",
        Cell: ({ row }) => (
          // <span>
          //   <Link
          //     className="text-ameciclo"
          //     href={row.original.summary.download_xlsx_url}
          //   >
          //     XLSX
          //   </Link>
          //   <span> | </span>
            <Link
              className="text-ameciclo"
              href={`${COUNTINGS_DATA}/${row.original.id}`}
            >
              JSON
            </Link>
          // </span>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <div>
      <div className="container mx-auto mb-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <label className="text-gray-700 font-medium">Filtrar por Total de Ciclistas:</label>
          <div className="flex items-center gap-2">
            <input
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              type="number"
              placeholder={`Min(${minMax[0]})`}
              value={cyclistFilter[0] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setCyclistFilter(prev => [val ? parseInt(val) : undefined, prev[1]]);
              }}
            />
            <span className="text-gray-500">a</span>
            <input
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              type="number"
              placeholder={`Max(${minMax[1]})`}
              value={cyclistFilter[1] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setCyclistFilter(prev => [prev[0], val ? parseInt(val) : undefined]);
              }}
            />
            <button
              className="px-3 py-1 bg-ameciclo text-white rounded hover:bg-opacity-80"
              onClick={() => setCyclistFilter([undefined, undefined])}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
      <Table title={"Nossas contagens"} data={filteredData} columns={columns} />
    </div>
  );
};
