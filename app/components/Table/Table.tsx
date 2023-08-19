import React, { useEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { matchSorter } from "match-sorter";
import { TableBody, TableFooter, TableHead } from "./TableComponents";

const SMALL_SCREEN_WIDTH = 768

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const Table = ({ title, data, columns }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.innerWidth < SMALL_SCREEN_WIDTH
    setIsSmallScreen(isSmallScreen);
    isSmallScreen ? setPageSize(5) : setPageSize(10)
    
  }, []);

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
      initialState: { pageIndex: 0, pageSize: 5 },
      filterTypes,
    },
    useFilters,
    useGlobalFilter, // useGlobalFilter!

    useSortBy,
    usePagination
  );

  return (
    <section className="container mx-auto my-10 shadow-2xl rounded p-2 sm:p-12 overflow-auto bg-gray-100">
      <h2 className="text-gray-600 text-3xl">{title}</h2>
      <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="table-auto shadow min-w-full divide-y divide-gray-200"
        >
          <TableHead headerGroups={headerGroups} isSmallScreen={isSmallScreen}/>
          <TableBody
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            isSmallScreen={isSmallScreen}
          />
        </table>
        <TableFooter
          rows={rows}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          pageOptions={pageOptions}
          nextPage={nextPage}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          data={data}
        />
      </div>
    </section>
  );
};
