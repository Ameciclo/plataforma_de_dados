import "../styles/tailwind.scss";
import React from "react";
import { SEO } from "./components/SEO";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

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
          <Navbar
            pages={[
              { name: "Inicial", url: "/" },
              { name: "Contagens", url: "/contagens" },
              { name: "Documentos", url: "/documentos" },
              { name: "Ideciclo", url: "/ideciclo" },
              { name: "Observatório", url: "/observatorio" },
              { name: "Perfil", url: "/perfil" },
            ]}
          />
          {children}
          {/* @ts-ignore */}
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-PQNS7S7FD3" />
    </html>
  );
}
