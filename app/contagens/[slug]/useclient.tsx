"use client";
import React, { useState, useMemo } from "react";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { ColumnFilter } from "../../components/Table/TableFilters";
import { Table } from "../../components/Table/Table";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const CountingComparisionTable = ({ data, firstSlug }) => {
  const [totalType, setTotalType] = useState('total_cyclists');

  const totalOptions = [
    { value: 'total_cyclists', label: 'Total de Ciclistas' },
    { value: 'total_women', label: 'Total de Mulheres' },
    { value: 'total_helmet', label: 'Total com Capacete' },
    { value: 'total_cargo', label: 'Total com Carga' },
    { value: 'total_juveniles', label: 'Total de Jovens' },
    { value: 'total_shared_bike', label: 'Total Bike Compartilhada' },
    { value: 'total_sidewalk', label: 'Total na Calçada' },
    { value: 'total_wrong_way', label: 'Total Contramão' }
  ];

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
        Header: () => (
          <div className="flex flex-col gap-2">
            <select 
              value={totalType} 
              onChange={(e) => setTotalType(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {totalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ),
        accessor: totalType,
        Cell: ({ row }) => row.original[totalType] || 0,
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "COMPARE",
        Cell: ({ row }) => (
          <span>
            <Link
              className="text-ameciclo"
              href={`/contagens/${firstSlug}/${row.original.slug}`}
            >
              COMPARE
            </Link>
          </span>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <Table
      title={"Compare com outras contagens"}
      data={sortedData}
      columns={columns}
    />
  );
};
