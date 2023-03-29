import "../styles/tailwind.scss";
import React from "react";
import { SEO } from "./components/SEO";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const metadata = {
  title: "Plataforma de Dados da Ameciclo",
  description:
    "Nesta plataforma você encontra dados sobre mobilidade ativa, produzidos por nós ou pelo poder público, com visualização facilitada para estudantes, jornalistas, cicloativistas, pesquisadoras(es) e pessoas interessadas. As informações são abertas para uso de todas as pessoas que desejam uma cidade mais humana, democrática e sustentável.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt_BR">
      <head>
        <title>{"Plataforma de Dados" + " | Ameciclo"}</title>
        <SEO />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <p className="font-bold bg-gray-900">CRALHO</p>
          <Navbar
            pages={[
              { name: "Inicial", url: "/" },
              { name: "Contagens", url: "/contagens" },
              { name: "Documentos", url: "/documentos" },
              { name: "Ideciclo", url: "/ideciclo" },
              { name: "Observatório", url: "/observatorio" },
              { name: "Perfil", url: "/perfil" },
              { name: "Ameciclo", url: "http://www.ameciclo.org" },
            ]}
          />
          {children}
          {/* @ts-ignore */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
