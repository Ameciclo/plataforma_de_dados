import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = ( { cols }) => {
  return (
    <>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            {cols.map((col, i) => (
              <div className={`w-full md:w-1/3 text-center md:text-${col.align ? col.align : 'center'}`}>
                <h5 className="uppercase mb-6 font-bold">{col.title}</h5>
                <ul className="mb-4">
                  {col.content.map((col) => (
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
            ))}

          </div>
          <div className="container text-center mt-2">
            <a href=" https://vercel.com/?utm_source=ameciclo&utm_campaign=oss" target="_blank" rel="noopener noreferrer" >
              <Image src="/vercel-logo.svg" alt="Vercel Logo" width={212} height={44} />
            </a>
          </div> 
        </div>
      </footer>
    </>
  );
};

export default Footer;
