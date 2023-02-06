import React, { useState, useEffect }  from "react";
import { useTable, usePagination, useFilters, useGlobalFilter, useSortBy, useAsyncDebounce } from "react-table";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import {ColumnFilter, NumberRangeColumnFilter, SelectColumnFilter, GlobalFilter} from "./TableFilters";
import SelectColumn from "./SelectColumn";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const Table = ({ title, data, columns }) => {

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    visibleColumns,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      filterTypes,

    },
    useFilters,
    useGlobalFilter, // useGlobalFilter!

    useSortBy,
    usePagination,
  );


  const pagesButtons = (numPages) => {
    var pages = []
    for (let i = 1; i <= numPages; i++) {
      if(numPages < 6) {
        if (i - 1 != pageIndex) {
            pages.push(
                <button
                    className="bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-1 mb-2"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => gotoPage(i-1)}
                >
                    {i}
                </button>
            )
    
        } else {
            pages.push(
                <button
                    className="bg-red-500 border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-1 mb-2"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => gotoPage(i-1)}
                >
                    {i}
                </button>
            )
    
        }
      }
    }
    return pages
  }

  return (
    <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
      <h2 className="text-gray-600 text-3xl">{title}</h2>
        <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
          <table {...getTableProps()} className="table-auto shadow min-w-full divide-y divide-gray-200">
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
                        <span className="inline-block">
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "🔻 "
                              : "🔺 "
                            : "♦️ "}
                        </span>
                        {column.render("Header")}
                      </div>
                      {column.canFilter ? column.render("Filter") : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200 text-sm font-normal text-gray-700">
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700 truncate max-w-sm" >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
              {//console.log("PAGINA")
              }
              {//console.log(rows)
              }
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            São {rows.length} estruturas e somam {Math.round(rows.reduce((a,c)=>a + c.values.ciclo_kms,0)*10)/10}km feitos de {Math.round(rows.reduce((a,c)=>a + c.values.pdc_kms,0)*10)/10}km projetados.
            <div className="inline-flex mt-2 xs:mt-0">
              {canPreviousPage ? (
                <button
                  className="bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-2 mx-2"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Anterior
                </button>
              ) : (
                <button
                className="bg-red-500 border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-2 mx-2"
                type="button"
                style={{ transition: "all .15s ease" }}
                //onClick={() => previousPage()}
                disabled={!canPreviousPage}
                >
                  Anterior
                </button> 
              )}
              
              <div className="p-1">
                {(pageOptions.length > 0) && (pagesButtons(pageOptions.length))}
              </div>
              {canNextPage ? (
                <button
                  className="bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-2 mx-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Próxima
                </button>
              ) : (
                <button
                className="bg-red-500 border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-2 mx-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                //onClick={() => nextPage()}
                disabled={!canNextPage}
                >
                  Próxima
                </button>
              )}
            </div>
            </div>
        </div>
      </section>
  );
};

export default Table;
