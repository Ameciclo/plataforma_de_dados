import { NavCover } from "../components/NavCover";
import { ExplanationBoxes } from "../components/ExplanationBox";
import { Breadcrumb } from "../components/Breadcrumb";
import { DocumentsSession } from "./useclient";
import { document } from "../../typings";
import { DOCUMENTS_PAGE, DOCUMENTS_DATA } from "../../servers";

export const metadata = {
  title: "Documentos e estudos da Ameciclo",
  description: "Área dedicada aos nossos estudos e documentos.",
};

const crumb = {
  label: "Documentos",
  slug: "/documentos",
  routes: ["/", "/documentos"],
};

const fetchData = async () => {
  const pageDataRes = await fetch(DOCUMENTS_PAGE, { cache: "no-cache" });
  const pageData = await pageDataRes.json();
  const dataRes = await fetch(DOCUMENTS_DATA, { cache: "no-cache" });
  const data = await dataRes.json();
  return { pageData, data };
};

export default async function Documentos() {
  const { pageData, data } = await fetchData();
  const { cover, description, objectives } = pageData;
  const documents: document[] = data?.map((doc) => {
    return {
      ...doc,
      cover: doc.cover.url,
    };
  });

  return (
    <>
      <NavCover
         title = "Documentos e pesquisas"
          src = {cover.url}
      />
      <Breadcrumb {...crumb} />
      <ExplanationBoxes
        boxes={[
          {
            title: "O que é?",
            description: description,
          },
          { title: "E o que mais?", description: objectives },
        ]}
      />
      {/* @ts-ignore */}
      <DocumentsSession documents = {documents} />
    </>
  );
}
