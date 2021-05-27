import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Ameciclo</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <p className="hover:underline text-gray-600 hover:text-red-600">
                    Ameciclo - Associação de Metropolitana de Ciclistas do
                    Recife
                  </p>
                </li>
                <li className="mt-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=5581994586830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    +55 (81) 9 9458-6830
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    className="hover:underline text-gray-600 hover:text-red-600"
                    href="https://bit.ly/2C01AhY"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    R. da Aurora, 529, loja 2 - Santo Amaro, Recife/PE,
                    50050-145
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:contato@ameciclo.org"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    contato@ameciclo.org
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <Link href="/contagens">
                    <a className="hover:underline text-gray-600 hover:text-red-600">
                      Contagens
                    </a>
                  </Link>
                </li>
                <li className="mt-2">
                  <a
                    href="/contato"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a
                    href="https://facebook.com/ameciclo"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="https://instagram.com/ameciclo"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="https://twitter.com/ameciclo"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Twitter
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="https://www.youtube.com/user/ameciclo"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Youtube
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="https://t.me/s/ameciclo"
                    className="hover:underline text-gray-600 hover:text-red-600"
                  >
                    Telegram
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
