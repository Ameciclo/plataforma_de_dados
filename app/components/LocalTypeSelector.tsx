import React from "react";

interface LocalTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export const LocalTypeSelector = ({ selectedType, onChange }: LocalTypeSelectorProps) => {
  return (
    <div className="mx-auto container my-4">
      <div className="flex justify-center space-x-4">
        <button 
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            selectedType === "ocorrencia" 
              ? "bg-ameciclo text-white" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => onChange("ocorrencia")}
        >
          Local de Ocorrência da Morte
        </button>
        <button 
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            selectedType === "residencia" 
              ? "bg-ameciclo text-white" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => onChange("residencia")}
        >
          Local de Residência da Vítima Fatal
        </button>
      </div>
    </div>
  );
};

export default LocalTypeSelector;