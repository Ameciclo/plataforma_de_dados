import React  from "react";
import Link from "next/link";
import {ColumnFilter, NumberRangeColumnFilter, SelectColumnFilter} from "../components/Table/TableFiltersIdeciclo";
import { Table } from "../components/Table/TableIdeciclo";

const IdecicloTable = ({ title, data }) => {

  const columns = React.useMemo(
    () => [
      {
        Header: "Rua",
        accessor: "logradouro",
        Cell: ({ row }) => (
            <Link href={`ideciclo/${row.original.id}`} key={row.original.id}>
                {row.original.cidade == 1 ? 
                (<div className="text-ameciclo">{row.original.logradouro}</div>) :
                (<>{row.original.logradouro}</>)}
            </Link>
        ),
        Filter: ColumnFilter,
      },
      {
        Header: "Tipo",
        accessor: "tipologia",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Extensão (km)",
        accessor: "comprimento",
        Cell: ({ value }) => {
          if (value) {
          return <span>{(""+(value).toFixed(2)).replace(".",",")}</span>
        } else {
          return  <span>{"N/A"}</span>
        }
        },
        Filter: NumberRangeColumnFilter,
        filter: 'between',
    },
    ,{
      Header: "Nota Geral",
      accessor: "nota",
      Cell: ({ value }) => {
        if (value) {
        return <span>{((value).toFixed(1)).replace(".",",")}</span>
      } else {
        return  <span>{"N/A"}</span>
      }
      },
      Filter: NumberRangeColumnFilter,
      filter: 'between',
      },
    ],
    []
  );

  return (
    <Table title={title} data={data} columns={columns} />
  );
};

export default IdecicloTable;