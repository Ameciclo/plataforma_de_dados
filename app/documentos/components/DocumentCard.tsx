import React from "react";
import Link from "next/link";
import Image from "next/image";

export const DocumentCard = ({ props }) => {
  const { cover, indicator } = props;
  return (
    <div className="bg-white rounded-lg shadow " style={{ minHeight: "450px" }}>
      {indicator?.label != "" &&  (
        <DocumentTypeIndicator props={indicator} />
      )}
      {cover ? (
        <DocumentCover props={props} />
      ) : (
        <div style={{ minHeight: "270px" }} />
      )}
      <DocumentDescription props={props} />
    </div>
  );
};

export const DocumentTypeIndicator = ({ props }) => {
  const {label, color, fontColor} = props
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

const DocumentCover = ({ props }) => {
  const { url, cover } = props;
  return (
    <>
      <Link href={`${url}`} target={"_blank"}>
        <Image src={cover} alt={""} width={100} height={100}/>
      </Link>
    </>
  );
};

const DocumentDescription = ({ props }) => {
  const { title, url, release_date, description } = props;
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
