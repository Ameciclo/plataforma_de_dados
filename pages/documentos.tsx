import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TitleBar from "../components/TitleBar";
import Breadcrumb from "../components/Breadcrumb";

import React, { useState, useEffect } from "react";
import { DocumentCard } from "../components/DocumentCard";

const Documentos = ({ documents }) => {

  const page_data = {
    title: "Documentos e Estudos",
    cover_image_url: "",
    Breadcrumb: {
      label:"Documentos",
      slug:"/documentos",
      routes:["/", "/documentos"],
    }  
  }

  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [docType, setDocType] = useState("");

  useEffect(() => {
    if (docType) {
      setFilteredDocuments(
        documents.filter((documents) => {
          return documents.type === docType;
        })
      );
    } else {
      setFilteredDocuments(documents);
    }
  }, [docType, documents]);

  return (
    <Layout>
      <SEO title={page_data.title + " | Ameciclo"} />
      <TitleBar title={page_data.title} image_url={page_data.cover_image_url}/>
      <Breadcrumb label={page_data.Breadcrumb.label} slug={page_data.Breadcrumb.slug} routes={page_data.Breadcrumb.routes}/>

      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que são?</h1>
            <p>
              A Ameciclo realizou e realiza diversas pesquisas ao longo de sua
              história e documentamos todas elas nessa sessão. São estudos, pesquisas, 
              documentos técnicos e livros acerca do perfil de quem pedala e de quem 
              não pedala no dia a dia, da qualidade da estrutura cicloviária, de contagem 
              de ciclistas e de análise da gestão pública com relação à mobilidade.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">... e tem mais!</h1>
            <p>
              Também guardamos aqui as pesquisas nas quais a Ameciclo contribuiu para
              serem realizadas, seja com o fornecimento de dados, seja por ser 
              o objeto de pesquisa de estudantes nas universidades. É um orgulho
              conseguir contribuir com a ciência e alavancar a ciclomobilidade.

              Se você deseja ver nossos livros de histórias lúdicas, busque na sessão
              biblioteca (em breve).
            </p>
          </div>
        </div>
      </section>

      <section className="container my-12 mx-auto">
        <div className="mt-5 mx-3">
          <div className="inline-block relative w-64">
            <label htmlFor="docType">Selecione o tipo:</label>
            <select
              value={docType}
              name="docType"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDocType(e.target.value)}
              onBlur={(e) => e}
            >
              <option value="">Todos</option>
              <option value="studies">Estudos e pesquisas</option>
              <option value="books">Livros</option>
              <option value="other">Outros</option>
            </select>
          </div>
        </div>
        <div className="mt-5 mx-3 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {filteredDocuments.sort((a, b) => a.release_date > b.release_date ? -1 : 1)
          .map((document) => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  //const res = await fetch("http://localhost:1337/documents");
  const res = await fetch("https://cms.ameciclo.org/documents");
  let documents = [];
  if (res.status === 200) {
    documents = await res.json();
  }
  return {
    props: {
      documents,
    },
    revalidate: 1,
  };
}

export default Documentos;
