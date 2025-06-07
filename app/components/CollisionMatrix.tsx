import React, { useState } from "react";
import { formatCollisionMatrix } from "../sinistros-fatais/configuration";
import { MatrixFilterButtons } from "./MatrixFilterButtons";

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
  const [hideUnspecifiedCol, setHideUnspecifiedCol] = useState(false);
  const [hideObjectFixedCol, setHideObjectFixedCol] = useState(false);
  const [hideNoCollisionCol, setHideNoCollisionCol] = useState(false);
  const [hideOthersCol, setHideOthersCol] = useState(false);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        Carregando dados da matriz de colisão...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        Não há dados disponíveis para a matriz de colisão.
      </div>
    );
  }

  const formattedData = formatCollisionMatrix(data);
  if (!formattedData) {
    return (
      <div className="text-center py-8">
        Não foi possível carregar os dados da matriz.
      </div>
    );
  }

  // Sempre remover as linhas "Não Especificado", "Objeto Fixo" e "Sem Colisão". Filtrar também "Outros" caso filtro "hideOthersCol" esteja ativado.
  let filteredTableData = formattedData.tableData.filter(
    (row) =>
      row.mode !== "Não Especificado" &&
      row.mode !== "Objeto Fixo" &&
      row.mode !== "Sem Colisão" &&
      (hideOthersCol ? row.mode !== "Outros" : true)
  );
  // Filtrar colunas com base nas opções selecionadas
  let filteredColumnLabels = formattedData.columnLabels.filter((label) => {
    if (hideUnspecifiedCol && label === "nao_especificado") return false;
    if (hideObjectFixedCol && label === "objeto_fixo") return false;
    if (hideNoCollisionCol && label === "sem_colisao") return false;
    if (hideOthersCol && label === "outros") return false;
    return true;
  });

  // Recalcular totais para a linha de totais
  const totalRowIndex = filteredTableData.findIndex(
    (row) => row.mode === "Total"
  );
  if (totalRowIndex !== -1) {
    // Recalcular cada coluna da linha de totais
    filteredColumnLabels.forEach((colKey) => {
      filteredTableData[totalRowIndex][colKey] = filteredTableData
        .filter((r) => r.mode !== "Total")
        .reduce((sum, r) => sum + (r[colKey] || 0), 0);
    });

    // Recalcular o total geral para cada linha
    filteredTableData.forEach((row) => {
      row.total = filteredColumnLabels.reduce(
        (sum, colKey) => sum + (row[colKey] || 0),
        0
      );
    });
  }

  // Calcular o total geral para percentuais
  const totalGeral =
    filteredTableData.find((row) => row.mode === "Total")?.total || 0;

  const modeLabels = {
    pedestre: "Pedestre",
    ciclista: "Ciclista",
    motociclista: "Motociclista",
    automovel: "Automóvel",
    onibus: "Ônibus",
    outros: "Outros",
    objeto_fixo: "Objeto Fixo",
    sem_colisao: "Sem Colisão",
    nao_especificado: "Não Especificado",
  };

  return (
    <div className="mx-auto container my-12">
      <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
      <h3 className="text-xl text-center mb-4">{subtitle}</h3>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            showPercentages
              ? "bg-[#008888] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
          }`}
          onClick={() => setShowPercentages(!showPercentages)}
        >
          {showPercentages ?  "Percentuais": "Percentuais"}
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            hideUnspecifiedCol
            ? "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
            : "bg-[#008888] text-white"
          }`}
          onClick={() => setHideUnspecifiedCol(!hideUnspecifiedCol)}
        >
          {hideUnspecifiedCol ? "Não Especificado" : "Não Especificado"}
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            hideObjectFixedCol
            ? "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
            : "bg-[#008888] text-white"
          }`}
          onClick={() => setHideObjectFixedCol(!hideObjectFixedCol)}
        >
          {hideObjectFixedCol ? "Objeto Fixo" : "Objeto Fixo"}
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            hideNoCollisionCol
            ? "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
            : "bg-[#008888] text-white"
          }`}
          onClick={() => setHideNoCollisionCol(!hideNoCollisionCol)}
        >
          {hideNoCollisionCol ? "Sem Colisão" : "Sem Colisão"}
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            hideOthersCol
              ? "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
              : "bg-[#008888] text-white"
          }`}
          onClick={() => setHideOthersCol(!hideOthersCol)}
        >
          {hideOthersCol ? "Outros" : "Outros"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="py-3 px-4 border-b border-r text-center font-semibold"
              >
                Vítima
              </th>
              <th
                colSpan={filteredColumnLabels.length}
                className="py-3 px-4 border-b border-r text-center font-semibold bg-gray-100"
              >
                Contraparte
              </th>
              <th
                rowSpan={2}
                className="py-3 px-4 border-b text-center font-semibold"
              >
                Total
              </th>
            </tr>
            <tr className="bg-gray-100">
              {filteredColumnLabels.map((label, index) => (
                <th
                  key={index}
                  className="py-3 px-4 border-b border-r text-center font-semibold"
                >
                  {modeLabels[label] || label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((row, rowIndex) => {
              const isTotal = rowIndex === filteredTableData.length - 1;
              return (
                <tr
                  key={rowIndex}
                  className={
                    isTotal
                      ? "bg-gray-100"
                      : rowIndex % 2 === 0
                      ? "bg-gray-50"
                      : ""
                  }
                >
                  <td
                    className={`py-2 px-4 border-b border-r font-medium ${
                      isTotal ? "font-semibold" : ""
                    }`}
                  >
                    {row.mode}
                  </td>
                  {filteredColumnLabels.map((colKey, colIndex) => {
                    const value = row[colKey] || 0;
                    const percentage =
                      totalGeral > 0 ? (value / totalGeral) * 100 : 0;

                    return (
                      <td
                        key={colIndex}
                        className={`py-2 px-4 border-b border-r text-center ${
                          isTotal ? "font-semibold" : ""
                        } ${value > 0 ? "bg-gray-50" : ""}`}
                      >
                        {showPercentages
                          ? `${value} (${percentage.toFixed(1)}%)`
                          : value}
                      </td>
                    );
                  })}
                  <td
                    className={`py-2 px-4 border-b text-center ${
                      isTotal ? "font-semibold" : ""
                    }`}
                  >
                    {showPercentages && totalGeral > 0
                      ? `${row.total} (${(
                          (row.total / totalGeral) *
                          100
                        ).toFixed(1)}%)`
                      : row.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center text-sm text-gray-600 mt-4">
        A matriz mostra o número de mortes por tipo de vítima (linhas) em
        colisão com cada tipo de contraparte (colunas).
        <br />
        Para efeitos dessa matriz, são iguais: ciclistas e outros modos não
        motorizados; e automóveis e caminhonetes.
      </div>
    </div>
  );
};

export default CollisionMatrix;
