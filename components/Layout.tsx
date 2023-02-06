import React from "react";
import SEO from "./SEO"
import Navbar from "./Navbar";
import TitleBar from "./TitleBar";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";


const Layout = ({ children, pageTitle = "", coverUrl = "", breadcrumbConf = null}) => {

const navBarPages = [
  { name: "Inicial", url: "/" },
  { name: "Contagens", url: "/contagens" },
  { name: "Documentos", url: "/documentos" },
  { name: "Ideciclo", url: "/ideciclo" },
  { name: "Observatório", url: "/observatorio" },
  { name: "Perfil", url: "/perfil" },
  { name: "Ameciclo", url: "http://www.ameciclo.org" },
];

const baseBreadCrumbItem = {
  label:"Plataforma de Dados",
  slug:"/",
  routes: ["/"]
}

const footerData = [
  {
    title: "Ameciclo",
    align: "left",
    content: [
    {label: "Associação de Metropolitana de Ciclistas do Recife", url: "https://www.ameciclo.org"},
    {label: "+55 (81) 93618 2947", url: "https://api.whatsapp.com/send?phone=5581936182947"},
    {label: "R. da Aurora, 529, loja 2 - Santo Amaro, Recife/PE, 50050-145", url: "https://bit.ly/2C01AhY"},
    {label: "contato@ameciclo.org", url: "mailto:contato@ameciclo.org"}]
  },{
    title: "Links",
    content: [
    {label: "Contagens", url: "/contagens"},
    {label: "Contato", url: "http://www.ameciclo.org/contato"}]
  },{
    title: "Social",
    content: [
      {label: "Facebook", url: "https://facebook.com/ameciclo"},
      {label: "Instagram", url: "https://instagram.com/ameciclo"},
      {label: "Twitter", url: "https://twitter.com/ameciclo"},
      {label: "Telegram", url: "https://t.me/s/ameciclo"},
      {label: "Youtube", url: "https://www.youtube.com/user/ameciclo"}]
    }
  ]

 return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar pages={ navBarPages }/>
        <SEO title={pageTitle + " | Ameciclo"} />
        <main className="flex-1 w-full mx-auto main-padding-top">
        {pageTitle != "" && (<TitleBar title={pageTitle} imageUrl={coverUrl}/>)}
        {breadcrumbConf && (<Breadcrumb conf={breadcrumbConf} baseItem={baseBreadCrumbItem}/>)}
        {children}
        </main>
        <Footer cols={footerData} />
      </div>
    </>
  );
};

export default Layout;
