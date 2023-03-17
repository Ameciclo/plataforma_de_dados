import { NavCover } from "../components/NavCover";
import { ExplanationBox } from "../components/ExplanationBox";
import { Breadcrumb } from "../components/Breadcrumb";
import { DocumentsSession } from "./components/DocumentsSession";
import { document } from "../../typings";
import { DOCUMENTS_PAGE, DOCUMENTS_DATA } from "../../servers";
import { docTypes } from "./docTypes.json";

export const metadata = {
  title: "Documentos e estudos da Ameciclo",
  description: "Área dedicada aos nossos estudos e documentos.",
};

const crumb = {
  label: "Documentos",
  slug: "/documentos",
  routes: ["/", "/documentos"],
};

const fetchDocumentsPage = async () => {
  const response_page = await fetch(DOCUMENTS_PAGE, { cache: "no-cache" });
  const page_data = await response_page.json();
  const response_data = await fetch(DOCUMENTS_DATA, { cache: "no-cache" });
  const documents_data = await response_data.json();
  return { page_data, documents_data };
};

export default async function Documentos() {
  const { page_data, documents_data } = await fetchDocumentsPage();
  const { cover, description, objectives } = page_data;
  const documents: document[] = documents_data?.map((doc) => {
    return {
      title: doc.title,
      description: doc.description,
      url: doc.url,
      type: doc.type,
      release_date: doc.release_date,
      cover: doc.cover.url,
    };
  });

  return (
    <>
      <NavCover
        props={{
          title: page_data.title,
          src: cover.url,
        }}
      />
      <Breadcrumb props={crumb} />
      <ExplanationBox
        props={[
          {
            title: "O que é?",
            description: description,
          },
          { title: "E o que mais?", description: objectives },
        ]}
      />
      {/* @ts-ignore */}
      <DocumentsSession props={{ documents, docTypes }} />
    </>
  );
}
