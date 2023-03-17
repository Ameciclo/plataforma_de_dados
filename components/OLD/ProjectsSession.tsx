
import React, { useState, useEffect } from "react";
import { DocumentCard } from "../../app/documentos/components/DocumentCard";
import { DOCUMENTS_DATA } from "../../servers";
/* "use client";

const fetchDocumentsData = async () => {
  const response = await fetch(DOCUMENTS_DATA, { cache: "no-cache" });
  const data: any[] = await response.json();
  return data;
};

export async function ProjectsSession() {
  const documents_data = await fetchDocumentsData();
  const documents = documents_data?.map((doc) => {
    return {
      title: doc.title,
      description: doc.description,
      url: doc.url,
      type: doc.type,
      release_date: doc.release_date,
      cover: doc.cover.url,
    };
  });

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
    <>
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
          {filteredDocuments
            .sort((a: any, b: any) =>
              a.release_date > b.release_date ? -1 : 1
            )
            .map((document: any) => (
              <DocumentCard document={document} key={document.id} />
            ))}
        </div>
      </section>
    </>
  );
}
 */