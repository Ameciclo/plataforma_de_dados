import React from "react";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import {ColumnFilter} from "./TableFilters";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const ContagensTable = ({ data }) => {
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
          <Link className="text-ameciclo" href={`contagens/${row.original._id}`} key={row.original._id}>
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
            <Link className="text-ameciclo" href={row.original.summary.download_xlsx_url}>
              XLSX
            </Link>
            <span> | </span>
            <Link className="text-ameciclo" href={`https://api.contagem.ameciclo.org/v1/cyclist-count/${row.original._id}`}>
              JSON
            </Link>
          </span>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    visibleColumns,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">

      <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="table-auto shadow min-w-full divide-y divide-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-left"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                  >
                    <div
                      {...column.getSortByToggleProps({ title: "Ordenar" })}
                      className="flex items-center"
                    >
                      {column.render("Header")}
                      <span className="inline-block">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽️"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200 text-sm font-normal text-gray-700"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 border-b border-gray-200 py-10"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700 truncate max-w-sm"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="text-xs xs:text-sm text-gray-900">
            <span>{`Página ${pageIndex + 1} de ${pageOptions.length}`}</span>
          </div>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Anterior
            </button>
            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContagensTable;
