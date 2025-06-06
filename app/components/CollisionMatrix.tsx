import React, { useState } from "react";
import { formatCollisionMatrix } from "../sinistros-fatais/configuration";

type CollisionMatrixProps = {
  data: any;
  isLoading: boolean;
  title: string;
  subtitle: string;
};

export const CollisionMatrix: React.FC<CollisionMatrixProps> = ({
  data,
  isLoading,
  title,
  subtitle,
}) => {
  const [showPercentages, setShowPercentages] = useState(false);
  const [hideUnspecified, setHideUnspecified] = useState(false);

  if (isLoading) {
    return <div className="text-center py-8">Carregando dados da matriz de colisão...</div>;
  }

  if (!data) {
    return <div className="text-center py-8">Não há dados disponíveis para a matriz de colisão.</div>;
  }

  const formattedData = formatCollisionMatrix(data);
  if (!formattedData) {
    return <div className="text-center py-8">Não foi possível carregar os dados da matriz.</div>;
  }

  // Filtrar dados se a opção de esconder não especificados estiver ativa
  let filteredColumnLabels = formattedData.columnLabels;
  let filteredTableData = formattedData.tableData;

  if (hideUnspecified) {
    // Filtrar colunas para remover "nao_especificado"
    filteredColumnLabels = formattedData.columnLabels.filter(
      (label) => label !== "nao_especificado"
    );

    // Filtrar linhas para remover a linha "Não Especificado"
    filteredTableData = formattedData.tableData.filter(
      (row) => row.mode !== "Não Especificado"
    );

    // Recalcular totais para cada linha
    filteredTableData = filteredTableData.map((row) => {
      if (row.mode === "Total") {
        // Recalcular totais para a linha de totais
        const newRow = { ...row };
        filteredColumnLabels.forEach((colKey) => {
          newRow[colKey] = formattedData.tableData
            .filter((r) => r.mode !== "Não Especificado" && r.mode !== "Total")
            .reduce((sum, r) => sum + (r[colKey] || 0), 0);
        });
        // Recalcular o total geral
        newRow.total = filteredColumnLabels.reduce(
          (sum, colKey) => sum + (newRow[colKey] || 0),
          0
        );
        return newRow;
      } else {
        // Recalcular o total para cada linha normal
        const newRow = { ...row };
        newRow.total = filteredColumnLabels.reduce(
          (sum, colKey) => sum + (newRow[colKey] || 0),
          0
        );
        return newRow;
      }
    });
  }

  // Calcular o total geral para percentuais
  const totalGeral = filteredTableData.find((row) => row.mode === "Total")?.total || 0;

  const modeLabels = {
    "pedestre": "Pedestre",
    "ciclista": "Ciclista",
    "motociclista": "Motociclista",
    "ocupante_automovel": "Automóvel",
    "automovel": "Automóvel",
    "ocupante_onibus": "Ônibus",
    "onibus": "Ônibus",
    "outros": "Outros",
    "objeto_fixo": "Objeto Fixo",
    "sem_colisao": "Sem Colisão",
    "nao_especificado": "Não Especificado"
  };

  return (
    <div className="mx-auto container my-12">
      <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
      <h3 className="text-xl text-center mb-4">{subtitle}</h3>
      
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPercentages"
            checked={showPercentages}
            onChange={() => setShowPercentages(!showPercentages)}
            className="mr-2"
          />
          <label htmlFor="showPercentages">Mostrar percentuais</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hideUnspecified"
            checked={hideUnspecified}
            onChange={() => setHideUnspecified(!hideUnspecified)}
            className="mr-2"
          />
          <label htmlFor="hideUnspecified">Ocultar não especificados</label>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th rowSpan={2} className="py-3 px-4 border-b border-r text-center font-semibold">
                Vítima
              </th>
              <th colSpan={filteredColumnLabels.length} className="py-3 px-4 border-b border-r text-center font-semibold bg-gray-100">
                Contraparte
              </th>
              <th rowSpan={2} className="py-3 px-4 border-b text-center font-semibold">Total</th>
            </tr>
            <tr className="bg-gray-100">
              {filteredColumnLabels.map((label, index) => (
                <th key={index} className="py-3 px-4 border-b border-r text-center font-semibold">
                  {modeLabels[label] || label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((row, rowIndex) => {
              const isTotal = rowIndex === filteredTableData.length - 1;
              return (
                <tr key={rowIndex} className={isTotal ? "bg-gray-100" : (rowIndex % 2 === 0 ? "bg-gray-50" : "")}>
                  <td className={`py-2 px-4 border-b border-r font-medium ${isTotal ? "font-semibold" : ""}`}>
                    {row.mode}
                  </td>
                  {filteredColumnLabels.map((colKey, colIndex) => {
                    const value = row[colKey] || 0;
                    const percentage = totalGeral > 0 ? (value / totalGeral) * 100 : 0;
                    
                    return (
                      <td 
                        key={colIndex} 
                        className={`py-2 px-4 border-b border-r text-center ${isTotal ? "font-semibold" : ""} ${
                          value > 0 ? "bg-gray-50" : ""
                        }`}
                      >
                        {showPercentages 
                          ? `${value} (${percentage.toFixed(1)}%)`
                          : value
                        }
                      </td>
                    );
                  })}
                  <td className={`py-2 px-4 border-b text-center ${isTotal ? "font-semibold" : ""}`}>
                    {showPercentages && totalGeral > 0
                      ? `${row.total} (${((row.total / totalGeral) * 100).toFixed(1)}%)`
                      : row.total
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="text-center text-sm text-gray-600 mt-4">
        A matriz mostra o número de mortes por tipo de vítima (linhas) em colisão com cada tipo de contraparte (colunas).
      </div>
    </div>
  );
};

export default CollisionMatrix;