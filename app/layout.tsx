import "../styles/tailwind.scss";
import React from "react";
import { SEO } from "./SEO";
import { Navbar } from "./Navbar";
import { NavCover } from "./NavCover";
import { Footer } from "./Footer";

export const metadata = {
  title: "Plataforma de Dados da Ameciclo",
  description:
    "Nesta plataforma você encontra dados sobre mobilidade ativa, produzidos por nós ou pelo poder público, com visualização facilitada para estudantes, jornalistas, cicloativistas, pesquisadoras(es) e pessoas interessadas. As informações são abertas para uso de todas as pessoas que desejam uma cidade mais humana, democrática e sustentável.",
};

const page_data = {
  title: "Plataforma de Dados",
  cover_image_url: "/plataforma.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{page_data.title + " | Ameciclo"}</title>
        <SEO />
      </head>
      <body>
        {/* <SEO title={pageTitle + " | Ameciclo"} />
              <main className="flex-1 w-full mx-auto main-padding-top">
              {pageTitle != "" && (<TitleBar title={pageTitle} imageUrl={coverUrl}/>)}
              {breadcrumbConf && (<Breadcrumb conf={breadcrumbConf} baseItem={baseBreadCrumbItem}/>)}
              </main> */}
        <div id="__next">
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
            <main className="flex-1 w-full mx-auto main-padding-top">
              <NavCover
                title={page_data.title}
                imageUrl={page_data.cover_image_url}
              />
            </main>
            {children}
            {/* @ts-ignore */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
