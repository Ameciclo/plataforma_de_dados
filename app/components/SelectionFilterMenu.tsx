import React from "react";

export function SelectionFilterMenu({ props }) {
  const { title, filters } = props;
  return (
    <>
      <h1 className="grid text-6xl font-bold pb-5">{title}</h1>
      {filters.map((filter: any) => (
        <div className="inline-grid bg-ameciclo  text-white font-bold rounded relative w-70 px-4 pb-6 pt-2 mx-4">
          <select
            value={filter.value}
            name={filter.name}
            className="block appearance-none text-black font-bold w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={filter.onChange}
            onBlur={filter.onBlur}
          >
            {filter.items.map((s: any) => (
              <option value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}
