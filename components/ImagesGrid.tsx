import React from "react";

const ImagesGrid = ({title, grids}) => {
  return (
    <section className="bg-white">
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="font-bold text-3xl text-ameciclo py-8">{title}</h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row"
            style={{ justifyItems: "center" }}
          >
            {
            grids.map((grid) => (
                <div className="bg-white rounded-lg shadow-xl w-full">
                    <a href={grid.url}>
                    <img
                        src={grid.image}
                        alt={grid.alt}
                        className="object-fill h-48 w-full"
                    />
                    </a>
                </div>           
            ))
            }
          </div>
        </div>
      </section>
    );
};

export default ImagesGrid;
