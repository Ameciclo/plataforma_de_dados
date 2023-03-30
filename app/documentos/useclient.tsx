"use client";
import React, { useEffect, useState } from "react";
import { SelectionFilter } from "../components/SelectionFilterMenu";
import { DocumentsList } from "../components/DocumentList";
import { docTypes } from "../../public/dbs/docTypes.json";

export const DocumentsSession = ({ documents }) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState("all");
  const [selectedDocumentOrder, setSelectedDocumentsOrder] = useState(
    "date-newer"
  );
  const [
    filteredAndOrderedDocuments,
    setFilteredAndOrderedDocuments,
  ] = useState(documents);

  useEffect(() => {
    let filteredDocuments = documents;

    if (selectedDocumentType !== "all") {
      filteredDocuments = documents.filter((doc) => {
        return doc.type === selectedDocumentType;
      });
    }
    switch (selectedDocumentOrder) {
      case "date-newer":
        filteredDocuments.sort((a, b) =>
          a.release_date < b.release_date ? 1 : -1
        );
        break;
      case "date-older":
        filteredDocuments.sort((a, b) =>
          a.release_date < b.release_date ? -1 : 1
        );
        break;
      case "alfa":
        filteredDocuments.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "anti-alfa":
        filteredDocuments.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        console.log(selectedDocumentType, selectedDocumentOrder);
        break;
    }
    console.log(
      selectedDocumentType,
      selectedDocumentOrder,
      filteredDocuments[0].title
    );
    setFilteredAndOrderedDocuments(filteredDocuments);
    if(selectedDocumentType === "all") {
      null
    }
  }, [selectedDocumentType, selectedDocumentOrder, documents]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-auto">
        <SelectionFilter
          title={"Ordene os documentos"}
          value={selectedDocumentOrder}
          name={"docOrder"}
          onChange={(e) => setSelectedDocumentsOrder(e.target.value)}
          items={[
            { value: "date-newer", label: "Mais novo" },
            { value: "date-older", label: "Mais antigo" },
            { value: "alfa", label: "de A a Z" },
            { value: "anti-alfa", label: "de Z a A" },
          ]}
        />
        <SelectionFilter
          title={"Selecione o tipo de documento"}
          value={selectedDocumentType}
          name={"docType"}
          onChange={(e) => setSelectedDocumentType(e.target.value)}
          items={docTypes}
        />
      </div>
      <DocumentsList documents={filteredAndOrderedDocuments} />
    </>
  );
};
