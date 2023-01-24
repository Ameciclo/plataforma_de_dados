import React from "react";

const GridCard = ({ title, text, icon = "", url = "#" }) => {
    return (
      <a href={url}>
        <div className="bg-white bg-customGrey w-full rounded-lg flex items-center justify-center text-ameciclo p-10">
          <div className="flex flex-col text-center">
            {icon != "" && <img src={`/icons/${icon}.svg`} className="h-32 fill-current" />}
            <h2 className="text-2xl font-bold text-ameciclo uppercase tracking-wider my-2">
              {title}
            </h2>
            <p className="text-base font-medium">{text}</p>
          </div>
        </div>
      </a>
    );}

const GridSession = ({title, grids}) => {
    return (
        <section>
            <div className="flex-1 container mx-auto p-10 text-center">
              <h3 className="font-bold text-3xl text-ameciclo py-8 w-1/2 mx-auto"> {title}</h3>
              {grids.length <= 6 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 sm:grid-rows-2 gap-8 grid-flow-row">
                      {grids.map((grid) => (
                          <GridCard
                          title={grid.title}
                          text={grid.text}
                          icon={grid.icon}
                          url={grid.url}
                          no_images={no_images}
                          />
                      ))}
                </div> 
              ):(
                <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-1 gap-8 grid-flow-row">
                    {grids.map((grid) => (
                        <GridCard
                        title={grid.title}
                        text={grid.text}
                        icon={grid.icon}
                        url={grid.url}
                        />
                    ))}
                </div> 
              )
              }
            </div>
        </section>
      );
  };
  
  export default GridSession;