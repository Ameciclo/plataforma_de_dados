import React from "react";
import Link from "next/link";
import { document } from "../../typings";
import { ImageWithLink } from "./ImageWithLink";

export const DocumentsList = ({ documents, docTypes }) => {
  return (
    <>
      <div className="mt-5 mx-3 px-10 shadow border grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3  auto-cols-max lg:grid-cols-4 gap-10">
        {documents.map((document: document) => (
          <DocumentCard
            {...{
              document,
              indicator: document.type,
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
      className="bg-white relative rounded-lg border"
      style={{ minHeight: "450px", maxWidth: "220" }}
    >
      {indicator?.label != "" && (
        <div className=" absolute top-0 left-0 z-10">
          <DocumentTypeIndicator {...indicator} />
        </div>
      )}
      {document.cover ? (
        <div className="">
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
      <DocumentDescription {...document} />
    </div>
  );
};

const DocumentTypeIndicator = ({ type, background_color, font_color }) => {
  return (
    <div
      className="uppercase p-2 rounded bg-green-400 text-base font-semibold truncate"
      style={{
        maxHeight: "50px",
        color: font_color,
        backgroundColor: background_color,
        borderRadius: "0 0 15px 0",
        borderBottom: "0 none",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)",
      }}
    >
      {type}
    </div>
  );
};

const DocumentDescription = ({ title, url, release_date, description }) => {
  return (
    <div className="px-4 py-5 lg:p-6">
      <dl className="pb-6">
        <Link href={url}>
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
