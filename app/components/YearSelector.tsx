import React from "react";

interface YearSelectorProps {
  years: number[];
  selectedYear: number | null;
  selectedEndYear?: number | null;
  onChange: (year: number, endYear?: number | null) => void;
}

export const YearSelector = ({ 
  years, 
  selectedYear, 
  selectedEndYear = null,
  onChange 
}: YearSelectorProps) => {
  
  const handleYearClick = (year: number) => {
    // Se não há ano selecionado ou já temos um intervalo, começar nova seleção
    if (!selectedYear || selectedEndYear) {
      onChange(year, null);
      return;
    }
    
    // Se já temos um ano inicial selecionado
    if (year === selectedYear) {
      // Clicou no mesmo ano, desseleciona
      onChange(null, null);
    } else if (year < selectedYear) {
      // Clicou em um ano anterior ao selecionado, inverte a ordem
      onChange(year, selectedYear);
    } else {
      // Clicou em um ano posterior, define como fim do intervalo
      onChange(selectedYear, year);
    }
  };
  
  // Verifica se um ano está no intervalo selecionado
  const isInRange = (year: number) => {
    if (!selectedYear) return false;
    if (!selectedEndYear) return year === selectedYear;
    return year >= selectedYear && year <= selectedEndYear;
  };

  return (
    <div className="flex flex-col items-center my-8">
      <p className="mb-2 text-sm text-gray-600">
        {selectedEndYear 
          ? "Clique em um ano para iniciar nova seleção" 
          : selectedYear 
            ? "Clique em outro ano para selecionar um intervalo" 
            : "Clique em um ano para selecionar"}
      </p>
      <div className="flex overflow-x-auto space-x-2">
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isInRange(year)
                ? "bg-ameciclo text-white" 
                : "bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
      {selectedYear && (
        <div className="mt-2 text-sm">
          {selectedEndYear 
            ? `Período selecionado: ${selectedYear} a ${selectedEndYear}` 
            : `Ano selecionado: ${selectedYear}`}
        </div>
      )}
    </div>
  );
};

export default YearSelector;