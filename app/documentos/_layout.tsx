import React from "react";
import { NavCover } from "../components/NavCover";
import { Breadcrumb } from "../components/Breadcrumb";

export const metadata = {
    title: "Documentos e estudos da Ameciclo",
    description: "Área dedicada aos nossos estudos e documentos.",
  };

  const crumb = {
    label: "Documentos",
    slug: "/documentos",
    routes: ["/", "/documentos"],
  };
  
export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
          <NavCover
        props={{
          title: "page_data.title",
          src: "cover.url",
        }}
      />
      <Breadcrumb props={crumb} />
          {children}
    </>
  );
}
