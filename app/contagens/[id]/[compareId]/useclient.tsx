"use client";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { matchSorter } from "match-sorter";
import Link from "next/link";
import { ColumnFilter } from "../../../components/Table/TableFilters";
import { Table } from "../../../components/Table/Table";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export const CountingComparisionTable = ({ data, ids }) => {
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
            href={`/contagens/${row.original._id}`}
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
        Header: "COMPARE",
        Cell: ({ row }) => {
          const id = row.original._id;
          if (id === ids[0]) {
            const newIds = ids.slice(1);
            const newLink =
              newIds.length > 0
                ? `/contagens/${newIds[0]}/${newIds.slice(1).join("_COMPARE_")}`
                : `/contagens`;
            return (
              <Link className="text-red-500" href={newLink}>
                REMOVER COMPARAÇÃO
              </Link>
            );
          }
          else if (ids.includes(id)) {
            const ids2 = ids.filter((id) => id !== ids[0]);
            const newIds = ids2.filter((i) => i !== id);
            const newLink =
              newIds.length > 0
                ? `/contagens/${ids[0]}/${newIds.join("_COMPARE_")}`
                : `/contagens/${ids[0]}`;
            return (
              <Link className="text-red-500" href={newLink}>
                REMOVER COMPARAÇÃO
              </Link>
            );
          } else {
            if (ids.length < 4) {
              const ids2 = ids.filter((id) => id !== ids[0]);
              const newIds = ids2.concat(id);
              return (
                <Link
                  className="text-ameciclo"
                  href={`/contagens/${ids[0]}/${newIds.join("_COMPARE_")}`}
                >
                  COMPARE
                </Link>
              );
            }
          }
        },
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
type Series = {
  name: string | undefined;
  data: number[];
};

export function HourlyCyclistsChart({ cyclistCount }) {
  const keyMap = new Map([
      ["child", { name: "Crianças" }],
      ["women", { name: "Mulheres" }],
      ["men", { name: "Homens" }],
    ]),
    hourlyBarKeysOriginal: string[] = ["men", "women", "child"],
    series: Series[] = [],
    hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  hourlyBarKeysOriginal.forEach((hk) => {
    const keymapname = keyMap.get(hk)?.name;
    series.push({
      name: keymapname,
      data: Object.values(cyclistCount.data.qualitative[hk].count_per_hour),
    });
  });

  const options = {
    chart: {
      type: "column",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}:00h</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
    title: {
      text: "Fluxo horário de ciclistas",
    },
    xAxis: {
      type: "category",
      categories: hours,
      title: {
        text: "Hora",
      },
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
      scrollbar: {
        enabled: true,
      },
    },
    series,

    credits: {
      enabled: true,
    },
  };
  return (
    <section className="container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10">
      <div className="shadow-2xl rounded p-10 text-center overflow-x-scroll">
        <div style={{ minWidth: "500px" }}>
          <h2 className="text-gray-600 text-3xl">
            Quantidade de ciclistas por hora
          </h2>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </section>
  );
}
