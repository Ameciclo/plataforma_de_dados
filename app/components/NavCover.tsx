import React from "react";

export const NavCover = ({props}) => {
  const { title, src = "" } = props
  return (
    <>
      {src == "" ? (
        <div className="flex flex-col align-middle h-no-cover pt-24 md:pt-0 bg-ameciclo text-white text-center justify-center">
          <h1 className="text-4xl font-bold">
            {/**no futuro aqui pode ter uma imagem padrão e o título ficar por cima*/}
            {title}
          </h1>
        </div>
      ) : (
        <div
          className="bg-cover bg-center bg-no-repeat object-fill h-cover w-full px-10 py-24 text-white"
          style={{ backgroundImage: `url('${src}')` }}
        />
      )}
    </>
  );
};
