import React from "react";
import Link from "next/link";

const DocTypeIndicator = ({ type: docType }) => {
  const typeMap = new Map([
    [
      "studies", 
      { name: "Estudos e pesquisas", color: "#3CAEA3", fontColor: "#581f0f" },
    ],
    [
      "books", 
      { name: "Livros", color: "#F6D55C", fontColor: "#581f0f" }],
    [
      "other",
      { name: "Outros", color: "#20639B", fontColor: "#dbf4c6" },
    ],
  ]);
  return (
    <div
      className="uppercase p-4 rounded bg-green-400 font-semibold absolute"
      style={{
        maxHeight: "50px",
        color: typeMap.get(docType).fontColor,
        backgroundColor: typeMap.get(docType).color,
        borderRadius: "0 0 15px 0",
        borderBottom: "0 none",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)",
      }}
    >
      {typeMap.get(docType).name}
    </div>
  );
};

export const DocumentCard = ({ document }) => {
  return (
    <div className="bg-white rounded-lg shadow " style={{ minHeight: "450px" }}>
      <DocTypeIndicator type={document.type} />
      {document.cover ? (
        <Link href={`${document.url}`}>
          <div
            style={{
              backgroundImage: `url(${document.cover.url})`,
              minHeight: "400px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
          />
        </Link>
      ) : (
        <div
          style={{
            minHeight: "270px",
          }}
        />
      )}
      <div className="px-4 py-5 lg:p-6">
        <dl className="pb-6">
          <Link href={`${document.url}`}>
            <dt className="mt-1 text-3xl font-semibold leading-9 text-gray-900 cursor-pointer">
              {document.title} ({document.release_date.substr(0,4)})
            </dt>
          </Link>
          <dt
            className="text-sm text-gray-600"
            style={{
              maxHeight: "80px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {document.description}
          </dt>
        </dl>
      </div>
    </div>
  );
};
