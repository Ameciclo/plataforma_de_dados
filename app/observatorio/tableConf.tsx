import {
  ColumnFilter,
  SelectColumnFilter,
} from "../components/Table/TableFilters";

export const colsconf = [
  {
    Header: "(COD) Nome da Via",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Tipologia prevista",
    accessor: "pdc_typology",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Extensão prevista (km)",
    accessor: "length",
    Filter: false,
  },
  {
    Header: "Tipologia executada",
    accessor: "cycleway_typology",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Extensão executada (km)",
    accessor: "length_made",
    Filter: false,
  },
];
