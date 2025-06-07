import React from "react";

interface MatrixFilterButtonsProps {
  showPercentages: boolean;
  togglePercentages: () => void;
  hideUnspecifiedCol: boolean;
  toggleUnspecifiedCol: () => void;
  hideObjectFixedCol: boolean;
  toggleObjectFixedCol: () => void;
  hideNoCollisionCol: boolean;
  toggleNoCollisionCol: () => void;
  hideOthersCol: boolean;
  toggleOthersCol: () => void;
}

export const MatrixFilterButtons: React.FC<MatrixFilterButtonsProps> = ({
  showPercentages,
  togglePercentages,
  hideUnspecifiedCol,
  toggleUnspecifiedCol,
  hideObjectFixedCol,
  toggleObjectFixedCol,
  hideNoCollisionCol,
  toggleNoCollisionCol,
  hideOthersCol,
  toggleOthersCol,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          showPercentages
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={togglePercentages}
      >
        {showPercentages ? "Ocultar percentuais" : "Mostrar percentuais"}
      </button>
      
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          hideUnspecifiedCol
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={toggleUnspecifiedCol}
      >
        {hideUnspecifiedCol ? "Mostrar Não Especificado" : "Ocultar Não Especificado"}
      </button>
      
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          hideObjectFixedCol
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={toggleObjectFixedCol}
      >
        {hideObjectFixedCol ? "Mostrar Objeto Fixo" : "Ocultar Objeto Fixo"}
      </button>
      
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          hideNoCollisionCol
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={toggleNoCollisionCol}
      >
        {hideNoCollisionCol ? "Mostrar Sem Colisão" : "Ocultar Sem Colisão"}
      </button>
      
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          hideOthersCol
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={toggleOthersCol}
      >
        {hideOthersCol ? "Mostrar Outros" : "Ocultar Outros"}
      </button>
    </div>
  );
};

export default MatrixFilterButtons;