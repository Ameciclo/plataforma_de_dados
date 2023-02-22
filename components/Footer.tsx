import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const footer_data = {
    first_col: {
      title: "Ameciclo",
      content: [
      {label: "Associação de Metropolitana de Ciclistas do Recife", url: "https://www.ameciclo.org"},
      {label: "+55 (81) 93618 2947", url: "https://api.whatsapp.com/send?phone=5581936182947"},
      {label: "R. da Aurora, 529, loja 2 - Santo Amaro, Recife/PE, 50050-145", url: "https://bit.ly/2C01AhY"},
      {label: "contato@ameciclo.org", url: "mailto:contato@ameciclo.org"},

    ]},
    second_col: {
      title: "Links",
      content: [
      {label: "Contagens", url: "/contagens"},
      {label: "Contato", url: "http://www.ameciclo.org/contato"},
    ]},
    third_col: {
      title: "Social",
      content: [
        {label: "Facebook", url: "https://facebook.com/ameciclo"},
        {label: "Instagram", url: "https://instagram.com/ameciclo"},
        {label: "Twitter", url: "https://twitter.com/ameciclo"},
        {label: "Telegram", url: "https://t.me/s/ameciclo"},
        {label: "Youtube", url: "https://www.youtube.com/user/ameciclo"}
    ]},
  }

  return (
    <>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">{footer_data.first_col.title}</h5>
              <ul className="mb-4">
                {footer_data.first_col.content.map((col) => (
                  <li className="mt-2">
                    <a
                      href={col.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-600 hover:text-red-600"
                    >
                      {col.label}
                    </a>
                  </li>        
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h5 className="uppercase mb-6 font-bold">{footer_data.second_col.title}</h5>
                <ul className="mb-4">
                  {footer_data.second_col.content.map((col) => (
                    <li className="mt-2">
                      <Link href={col.url}>
                        <a className="hover:underline text-gray-600 hover:text-red-600">
                          {col.label}
                        </a>
                      </Link>
                    </li>          
                  ))}
                </ul>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h5 className="uppercase mb-6 font-bold">{footer_data.third_col.title}</h5>
              <ul className="mb-4">
                {footer_data.third_col.content.map((col) => (
                  <li className="mt-2">
                    <a
                      href={col.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-600 hover:text-red-600"
                    >
                      {col.label}
                    </a>
                  </li>          
                ))}
                 <li className="mt-2">
                  <a
                    href=" https://vercel.com/?utm_source=ameciclo&utm_campaign=oss"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/vercel-logo.svg"
                      alt="Vercel Logo"
                      width={212}
                      height={44}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
