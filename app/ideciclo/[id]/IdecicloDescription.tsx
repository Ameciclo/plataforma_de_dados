import React from "react";

export function IdecicloDescription({ info }) {
  return (
    <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
      <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
        <h3>DESCRIÇÃO</h3>
        <h3 className="text-2xl mt-2">
          <strong>{info.tipologia.toUpperCase()}</strong>,{" "}
          <strong>{info.fluxo.toUpperCase()}</strong>
          {info.pavimento != null && (
            <>
              , com piso de{" "}
              <strong>{info.pavimento.replace(",", " e").toUpperCase()}</strong>
            </>
          )}
          {info.tipologia.toUpperCase() != "CICLORROTA" && (
            <>
              , localizada <strong>{info.localizacao.toUpperCase()}</strong>
            </>
          )}
        </h3>
      </div>
      <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
        <h3>LARGURA</h3>
        {info.largura_transitavel >= 0 ? (
          <h3 className="text-3xl  mt-2">
            <strong>{("" + info.largura_total).replace(".", ",")}m</strong>,
            onde{" "}
            <strong>
              {("" + info.largura_transitavel).replace(".", ",")}m{" "}
            </strong>
            são transitáveis
          </h3>
        ) : (
          <h3 className="text-3xl font-bold mt-2">N/A</h3>
        )}
      </div>
      <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
        <h3>Última avaliação</h3>
        <h3 className="text-3xl font-bold mt-2">{info.data}</h3>
      </div>
    </div>
  );
}
