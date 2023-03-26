import React from "react";
import { CityCard } from "../ideciclo/components/CityCard";
import { MultipleSelectionFilters } from "./SelectionFilterMenu";

export const NumberCards = ({ props }) => {
  const { data, selected } = props;
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-24">
        <MultipleSelectionFilters props={props} />
        <section className="container mx-auto gap-8 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {data.map((city, index) => (
            <CityCard
              props={{
                ...props,
                city: city,
                position: index,
                selected: city.id == selected,
              }}
            />
          ))}
        </section>
      </div>
    </section>
  );
};
