import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import { DocumentCard } from "../components/DocumentCard";

const Documentos = ({ documents }) => {
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
      <SEO title="Documentos" />
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{
          width: "100%",
          height: "40vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('/projetos.webp')`,
        }}
      />
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb
            label="Documentos"
            slug="/documentos"
            routes={["/", "/documentos"]}
          />
        </div>
      </div>
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
          {filteredDocuments.sort((a, b) => a.relase_date > b.relase_date ? 1 : -1)
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
