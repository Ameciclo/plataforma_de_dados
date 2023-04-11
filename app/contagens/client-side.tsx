"use client";
import React from "react";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { ColumnFilter } from "../components/Table/TableFilters";
import { Table } from "../components/Table/Table";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const ContagensTable = ({ data }) => {
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
            href={`contagens/${row.original._id}`}
            key={row.original._id}
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
        accessor: "summary.total",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Dados",
        Cell: ({ row }) => (
          <span>
            <Link
              className="text-ameciclo"
              href={row.original.summary.download_xlsx_url}
            >
              XLSX
            </Link>
            <span> | </span>
            <Link
              className="text-ameciclo"
              href={`https://api.contagem.ameciclo.org/v1/cyclist-count/${row.original._id}`}
            >
              JSON
            </Link>
          </span>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  return <Table title={"Nossas contagens"} data={data} columns={columns} />;
};
