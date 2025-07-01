import React from 'react';

export const MultipleSelectionFilters = ({ filters, title = "" }) => {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map((filter, index) => (
          <div key={index} className="flex flex-col">
            {filter.title && <h3 className="text-lg font-medium mb-2">{filter.title}</h3>}
            <select
              value={filter.value}
              name={filter.name}
              onChange={filter.onChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008888]"
            >
              {filter.items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectionFilters;