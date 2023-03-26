import React from "react";
import Link from "next/link";
import Image from "next/image";

export const DocumentCard = ({ document, indicator }) => {
  return (
    <div className="bg-white rounded-lg shadow " style={{ minHeight: "450px" }}>
      {indicator?.label != "" &&  (
        <DocumentTypeIndicator {...indicator} />
      )}
      {document.cover ? (
        <DocumentCover {...document} />
      ) : (
        <div style={{ minHeight: "270px" }} />
      )}
      <DocumentDescription {...document} />
    </div>
  );
};

export const DocumentTypeIndicator = ({label, color, fontColor}) => {
  return (
    <>
      <div
        className="uppercase p-4 rounded bg-green-400 font-semibold absolute"
        style={{
          maxHeight: "50px",
          color: fontColor,
          backgroundColor: color,
          borderRadius: "0 0 15px 0",
          borderBottom: "0 none",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)",
        }}
      >
        {label}
      </div>
    </>
  );
};

const DocumentCover = ({ url, cover }) => {
  return (
    <>
      <Link href={`${url}`} target={"_blank"}>
        <Image src={cover} alt={""} width={100} height={100}/>
      </Link>
    </>
  );
};

const DocumentDescription = ({ title, url, release_date, description }) => {
  return (
    <>
      <div className="px-4 py-5 lg:p-6">
        <dl className="pb-6">
          <Link href={`${url}`}>
            <dt className="mt-1 text-2xl font-semibold leading-9 text-gray-900 cursor-pointer">
              {title} ({release_date.substr(0, 4)})
            </dt>
          </Link>
          <dt
            className="text-sm text-gray-600"
            style={{
              maxHeight: "100px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </dt>
        </dl>
      </div>
    </>
  );
};
