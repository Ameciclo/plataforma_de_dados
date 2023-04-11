import React from "react";

export function TableHead({ headerGroups, isSmallScreen = false }) {
  return (
    <thead>
      {headerGroups.map((headerGroup: any) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          className="bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-left"
        >
          {headerGroup.headers.map((column: any, index: number) =>
            // Show only the first column when isSmallScreen is true
            isSmallScreen && index !== 0 ? null : (
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
                {/* Only show filter for the first column when isSmallScreen is true */}
                {isSmallScreen && index !== 0
                  ? null
                  : column.canFilter
                  ? column.render("Filter")
                  : null}
              </th>
            )
          )}
        </tr>
      ))}
    </thead>
  );
}

function SingleColumnRow({ cells }) {
  return (
    <tr className="hover:bg-gray-100 border-b border-gray-200 py-10 m-10">
      {cells.map((cell) => {
        return <div><strong>{cell.column.Header}:</strong> {cell.render("Cell")}</div>;
      })}
    </tr>
  );
}

export function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
  isSmallScreen = false,
}) {
  return (
    <tbody
      {...getTableBodyProps()}
      className="bg-white divide-y divide-gray-200 text-sm font-normal text-gray-700"
    >
      {page.map((row, i) => {
        prepareRow(row);
        return isSmallScreen ? (
          <SingleColumnRow cells={row.cells} />
        ) : (
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
  );
}

export function TableFooter({
  rows,
  canPreviousPage,
  canNextPage,
  previousPage,
  pageOptions,
  nextPage,
  pageIndex,
  gotoPage,
  data,
}) {
  const pagesButtons = (numPages) => {
    var pages: any[] = [];
    for (let i = 1; i <= numPages; i++) {
      if (i - 1 != pageIndex) {
        pages.push(
          <button
            className="bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-1 mb-2"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => gotoPage(i - 1)}
          >
            {i}
          </button>
        );
      } else {
        pages.push(
          <button
            className="bg-red-500 border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-1 mb-2"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => gotoPage(i - 1)}
          >
            {i}
          </button>
        );
      }
    }
    return pages;
  };
  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
      Mostrando {rows.length} de {data.length} linhas ao todo.
      <div className="inline-flex mt-2 xs:mt-0">
        {canPreviousPage && (
          <button
            className="hidden sm:block bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-2 mx-2"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>
        )}

        <div className="p-1">
          {pageOptions.length > 0 && pagesButtons(pageOptions.length)}
        </div>

        {canNextPage && (
          <button
            className="hidden sm:block bg-ameciclo border-2 border-white uppercase text-white font-bold hover:bg-white hover:text-ameciclo shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-2 mx-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Próxima
          </button>
        )}
      </div>
    </div>
  );
}
