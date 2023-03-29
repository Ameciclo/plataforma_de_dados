import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerColumn, footerColumnContent } from "../../typings";

const fetchFooterColumns = async () => {
  const res = await fetch("http://localhost:3300/footer");
  const columns: footerColumn[] = await res.json();
  return columns;
};

export const Footer = async () => {
  const columns = await fetchFooterColumns();

  return (
    <>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            {columns.map((column: footerColumn, i) => (
              <FooterColumn column={column} />
            ))}
          </div>
          <div className="container text-center mt-2">
            <Link
              href=" https://vercel.com/?utm_source=ameciclo&utm_campaign=oss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/vercel_logo/vercel-logo.svg"
                alt="Vercel Logo"
                width={212}
                height={44}
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

function FooterColumn({ column }) {
  return (
    <div
      className={`w-full md:w-1/3 text-center md:text-${
        column.align != "" ? column.align : "center"
      }`}
    >
      <h5 className="uppercase mb-6 font-bold">{column.title}</h5>
      <ul className="mb-4">
        {column.content.map((content: footerColumnContent) => (
          <li className="mt-2">
            <Link
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-600 hover:text-red-600"
            >
              {content.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
