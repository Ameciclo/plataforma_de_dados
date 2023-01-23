import React from "react";

const TitleBar = ({title, image_url = ""}) => {
  return (
    <>
    {image_url == "" ? (
            <div
                className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
                style={{ height: "25vh" }}
            >
            <h1 className="text-4xl font-bold">{title}</h1>
            </div>
        ) : (
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{
          width: "100%",
          height: "52vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('/contagem.png')`,
        }}
      />
    )}
    </>
  );
};

export default TitleBar;
