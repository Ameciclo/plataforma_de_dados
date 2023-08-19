import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerColumn, footerColumnContent } from "../../typings";

const columns = [
  {
    title: "Ameciclo",
    align: "left",
    content: [
      {
        label: "Associação de Metropolitana de Ciclistas do Recife",
        url: "https://www.ameciclo.org",
      },
      {
        label: "+55 (81) 93618 2947",
        url: "https://api.whatsapp.com/send?phone=5581936182947",
      },
      {
        label: "R. da Aurora, 529, loja 2 - Santo Amaro, Recife/PE, 50050-145",
        url: "https://bit.ly/2C01AhY",
      },
      {
        label: "contato@ameciclo.org",
        url: "mailto:contato@ameciclo.org",
      },
    ],
  },
  {
    title: "Links",
    align: "center",
    content: [
      {
        label: "Contagens",
        url: "/contagens",
      },
      {
        label: "Contato",
        url: "http://www.ameciclo.org/contato",
      },
    ],
  },
  {
    title: "Social",
    align: "center",
    content: [
      {
        label: "Facebook",
        url: "https://facebook.com/ameciclo",
      },
      {
        label: "Instagram",
        url: "https://instagram.com/ameciclo",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/ameciclo",
      },
      {
        label: "Telegram",
        url: "https://t.me/s/ameciclo",
      },
      {
        label: "Youtube",
        url: "https://www.youtube.com/user/ameciclo",
      },
    ],
  },
];

// const fetchFooterColumns = async () => {
//   const res = await fetch(FOOTER, { cache: "no-cache" });
//   const columns: footerColumn[] = await res.json();
//   return columns;
// };

export const Footer = async () => {
  // const columns = await fetchFooterColumns();

  return (
    <>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            {columns.map((column: footerColumn, i) => (
              <div
                className={`w-full md:w-1/3 text-center md:text-${
                  column.align != "" ? column.align : "center"
                }`}
              >
                <FooterColumn column={column} />{" "}
              </div>
            ))}
          </div>
          <div className="container p3">
            <VercelSponsor />{" "}
          </div>
        </div>
      </footer>
    </>
  );
};

function FooterColumn({ column }) {
  return (
    <>
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
    </>
  );
}

function VercelSponsor() {
  return (
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
        className="mx-auto"
      />
    </Link>
  );
}
