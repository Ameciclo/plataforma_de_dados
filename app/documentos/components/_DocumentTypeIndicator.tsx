import React from "react";

const typeMap = new Map([
  [
    "studies",
    { name: "Estudos e pesquisas", color: "#008080", fontColor: "#581f0f" },
  ],
  ["books", { name: "Livros", color: "#F6D55C", fontColor: "#581f0f" }],
  ["other", { name: "Outros", color: "#20639B", fontColor: "#dbf4c6" }],
]);

export const DocumentTypeIndicator = ({ docType }) => {
  {
    /* @ts-ignore */
  }
  const type = typeMap.get(docType) ?? {
    name: "Estudos e pesquisas",
    color: "#008080",
    fontColor: "#581f0f",
  };

  return (
    <div>
      <div
        className="uppercase p-4 rounded bg-green-400 font-semibold absolute"
        style={{
          maxHeight: "50px",
          color: type.fontColor,
          backgroundColor: type.color,
          borderRadius: "0 0 15px 0",
          borderBottom: "0 none",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)",
        }}
      >
        {type.name}
      </div>
    </div>
  );
};
