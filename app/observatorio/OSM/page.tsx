'use client'
import React, { useEffect, useState } from "react";
import OSMController from "./OSMController";

export default function TestArea() {
  const [areaData, setAreaData] = useState(null);
  const areaName = "Pernambuco, Brasil"; // Substitua pelo nome da área que deseja obter os dados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OSMController.getData({ area: areaName });
        setAreaData(data.geoJson);
      } catch (error) {
        console.error("Erro ao obter dados da área", error);
      }
    };

    fetchData();
  }, [areaName]);

  return (
    <div>
      {areaData ? (
        <pre>{JSON.stringify(areaData, null, 2)}</pre>
      ) : (
        <p>Carregando dados da área...</p>
      )}
    </div>
  );
}
