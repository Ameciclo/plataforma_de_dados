import React from 'react';

export const MultipleSelectionFilters = ({ title, filters }) => {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter, index) => (
          <div key={index} className="flex flex-wrap gap-2">
            {filter.options.map((option) => (
              <button
                key={option.value}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  option.selected
                    ? "bg-[#008888] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
                }`}
                onClick={() => filter.onChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectionFilters;