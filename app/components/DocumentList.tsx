import React from "react";
import Link from "next/link";
import { document } from "../../typings";
import { docTypes } from "../../public/dbs/docTypes.json";
import { ImageWithLink } from "./ImageWithLink";

export const DocumentsList = ({ documents }) => {
  return (
    <>
      <div className="mt-5 mx-3 px-10 shadow border grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3  auto-cols-max lg:grid-cols-4 gap-10">
        {documents.map((document: document) => (
          <DocumentCard
            {...{
              document,
              indicator: docTypes.filter((d) => document.type === d.value)[0],
            }}
          />
        ))}
      </div>{" "}
    </>
  );
};
const DocumentCard = ({ document, indicator }) => {
  return (
    <div
      className="container bg-white rounded-lg"
      style={{ minHeight: "450px", maxWidth: "220" }}
    >
      <div style={{ position: "relative" }}>
        {indicator?.label != "" && (
          <DocumentTypeIndicator
            {...indicator}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
        {document.cover ? (
          <div style={{ position: "relative", top:0, left:0 }}>
            <ImageWithLink
              url={document.url}
              alt={""}
              src={document.cover}
              aspectRatio={0.75}
            />
          </div>
        ) : (
          <div style={{ minHeight: "270px" }} />
        )}
      </div>
      <DocumentDescription {...document} />
    </div>
  );
};

const DocumentTypeIndicator = ({ label, color, fontColor }) => {
  return (
    <div
      className="uppercase p-4 rounded bg-green-400 font-semibold"
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
  );
};

const DocumentDescription = ({ title, url, release_date, description }) => {
  return (
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
  );
};
