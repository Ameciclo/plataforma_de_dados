"use client";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { color } from "highcharts";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { ColumnFilter } from "../../components/Table/TableFilters";
import { Table } from "../../components/Table/Table";
import { Series, CountEditionSession, CountEdition } from "../../../typings";
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const CountingComparisionTable = ({ data, firstSlug }) => {
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
      data={data}
      columns={columns}
    />
  );
};

// export function HourlyCyclistsChart({
//   sessions,
// }: {
//   sessions: { [key: string]: CountEditionSession };
// }) {
//   const series: Series[] = [];
//   const hours: number[] = [];
//   Object.values(sessions).forEach((session: CountEditionSession) => {
//     const { start_time, total_cyclists } = session;
//     const hour = parseInt(start_time.split(":")[0]); // Extrair a hora do start_time
//     hours.push(hour);
//     const dataPoint = [total_cyclists]; // Criar um array com a hora e o total de ciclistas

//     series.push({
//       name: "total",
//       data: dataPoint, // Adicionar o array de dados (hora e total de ciclistas) ao gráfico
//     });
//   });
//   console.log(hours, series)

//   const options = {
//     chart: {
//       type: "column",
//     },
//     plotOptions: {
//       column: {
//         stacking: "normal",
//         dataLabels: {
//           enabled: true,
//         },
//       },
//     },
//     tooltip: {
//       headerFormat: "<b>{point.x}:00h</b><br/>",
//       pointFormat: "{series.name}: {point.y}<br/>",
//     },
//     title: {
//       text: "Fluxo horário de ciclistas",
//     },
//     xAxis: {
//       type: "category",
//       categories: hours,
//       title: {
//         text: "Hora",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Quantidade",
//       },
//       scrollbar: {
//         enabled: true,
//       },
//     },
//     series,

//     credits: {
//       enabled: true,
//     },
//   };

//   return (
//     <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
//       <div className="shadow-2xl rounded p-10 text-center overflow-x-scroll">
//         <div style={{ minWidth: "500px" }}>
//           <h2 className="text-gray-600 text-3xl">
//             Quantidade de ciclistas por hora
//           </h2>
//           <HighchartsReact highcharts={Highcharts} options={options} />
//         </div>
//       </div>
//     </section>
//   );
// }
