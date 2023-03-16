import { NavCover } from "../components/NavCover";
import { ExplanationBox } from "../components/ExplanationBox";
import { DOCUMENTS_PAGE } from "../../servers";
import { Breadcrumb } from "../components/Breadcrumb";
import { DocumentsSession } from "./DocumentsSession";

export const metadata = {
  title: "Documentos e estudos da Ameciclo",
  description: "Área dedicada aos nossos estudos e documentos.",
};

const fetchDocumentsPage = async () => {
  const response = await fetch(DOCUMENTS_PAGE, { cache: "no-cache" });
  const data = await response.json();
  return data;
};

const crumb = {
  label: "Documentos",
  slug: "/documentos",
  routes: ["/", "/documentos"],
};

const Documentos = async () => {
  const page_data = await fetchDocumentsPage();
  const { cover, description, objectives } = page_data;
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
      <DocumentsSession />
    </>
  );
};

export default Documentos;
