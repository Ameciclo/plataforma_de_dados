// app/observatorio-sinistros/useClient.tsx
"use client";
import React, { useState, useEffect } from "react";
import { NumberCards } from "../components/NumberCards";
import { Table } from "../components/Table/Table";
import { vehicleCards } from "./configuration";
import { ColumnFilter } from "../components/Table/TableFilters";

export default function ObservatorioClientSide({ streets }) {
  return (
    <>
      <Table
        title="Sinistros por Via"
        data={streets}
        columns={[
          { Header: "(ID) Rua", accessor: "streetId", Filter: false },
          { Header: "Nome da Via", accessor: "name", Filter: ColumnFilter },
          {
            Header: "Total Sinistros",
            accessor: "totalSinistros",
            Filter: false,
          },
          { Header: "Fatais", accessor: "totalFatais", Filter: false },
        ]}
      />
    </>
  );
}
