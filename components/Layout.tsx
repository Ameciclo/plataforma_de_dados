import React from "react";
import SEO from "./SEO"
import Navbar from "./Navbar";
import TitleBar from "./TitleBar";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";

const navBarPages = [
  { name: "Inicial", url: "/" },
  { name: "Contagens", url: "/contagens" },
  { name: "Documentos", url: "/documentos" },
  { name: "Ideciclo", url: "/ideciclo" },
  { name: "Observatório", url: "/observatorio" },
  { name: "Perfil", url: "/perfil" },
  { name: "Ameciclo", url: "http://www.ameciclo.org" },
];

const Layout = ({ children, pageTitle = "", coverUrl = "", breadcrumbConf = null}) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar pages={ navBarPages }/>
        <SEO title={pageTitle + " | Ameciclo"} />
        <main className="flex-1 w-full mx-auto main-padding-top">
        {pageTitle != "" && (<TitleBar title={pageTitle} imageUrl={coverUrl}/>)}
        {breadcrumbConf && (<Breadcrumb conf={breadcrumbConf}/>)}
        {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
