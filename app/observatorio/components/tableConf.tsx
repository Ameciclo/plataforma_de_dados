import {
  ColumnFilter,
  SelectColumnFilter,
} from "../../components/Table/TableFilters";

export const colsconf = [
  {
    Header: "(COD) Nome da Via",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Tipologia prevista",
    accessor: "pdc_tipos",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Extensão prevista (km)",
    accessor: "pdc_kms",
    Filter: false,
  },
  {
    Header: "Tipologia executada",
    accessor: "ciclo_tipos",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Extensão executada (km)",
    accessor: "ciclo_kms",
    Filter: false,
  },
];
