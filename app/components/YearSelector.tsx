import React from "react";

interface YearSelectorProps {
  years: number[];
  selectedYear: number | null;
  onChange: (year: number) => void;
}

export const YearSelector = ({ years, selectedYear, onChange }: YearSelectorProps) => {
  return (
    <div className="flex justify-center my-8">
      <div className="flex overflow-x-auto space-x-2">
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedYear === year 
                ? "bg-ameciclo text-white" 
                : "bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => onChange(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector;