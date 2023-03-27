import React from "react";

export function MultipleSelectionFilters({ title, filters }) {
  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="grid text-6xl font-bold pb-5">{title}</h1>
        {filters.length > 0 && filters.map((filter: any) => <SelectionFilter {...filter} />)}
      </div>
    </>
  );
}

export function SelectionFilter({ title, value, name, onChange, onBlur, items }) {
  return (
    <div className="bg-ameciclo  text-white font-bold rounded relative px-4 pb-6 pt-2 mx-4  ">
              <label htmlFor={value}>{title}</label>
              <select
                className="block appearance-none text-black font-bold w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
              >
                {items.map((s: any) => (
                  <option value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
  );
}