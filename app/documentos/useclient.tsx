"use client";
import React, { useEffect, useState } from "react";
import { MultipleSelectionFilters } from "../components/SelectionFilterMenu";
import { DocumentsList } from "../components/DocumentList";

export const DocumentsSession = ({ documents, docTypes }) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState("all");
  const [selectedDocumentOrder, setSelectedDocumentsOrder] = useState("random");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [orderedDocuments, setOrderedDocuments] = useState([]);

  const filterDocs = (arr) => {
    if (selectedDocumentType !== "all") {
      return arr.filter((doc) => {
        return doc.type === selectedDocumentType;
      });
    } else {
      return arr.filter((doc) => {
        return doc.type !== "any";
      });
    }
  };

  const sortDocs = (arr) => {
    switch (selectedDocumentOrder) {
      case "date-newer":
        arr.sort((a, b) => (a.release_date < b.release_date ? 1 : -1));
        break;
      case "date-older":
        arr.sort((a, b) => (a.release_date < b.release_date ? -1 : 1));
        break;
      case "alfa":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "anti-alfa":
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return arr;
  };

  useEffect(() => {
    let filteredDocs = filterDocs(documents);
    setFilteredDocuments(filteredDocs);

    let orderedDocs = sortDocs(filteredDocs);
    setOrderedDocuments(orderedDocs);
  }, [selectedDocumentType, selectedDocumentOrder, documents]);

  useEffect(() => {
    let orderedDocs = sortDocs(filteredDocuments);
    setOrderedDocuments(orderedDocs);
  }, [selectedDocumentOrder, filteredDocuments]);

  return (
    <>
      <MultipleSelectionFilters
        filters={[
          {
            title: "Ordene os documentos",
            value: selectedDocumentOrder,
            name: "docOrder",
            onChange: (e) => setSelectedDocumentsOrder(e.target.value),
            items: [
              { value: "date-newer", label: "Mais recente" },
              { value: "date-older", label: "Mais antigo" },
              { value: "alfa", label: "de A a Z" },
              { value: "anti-alfa", label: "de Z a A" },
            ],
          },
          {
            title: "Selecione o tipo de documento",
            value: selectedDocumentType,
            name: "docType",
            onChange: (e) => setSelectedDocumentType(e.target.value),
            items: docTypes,
          },
        ]}
      />
      <DocumentsList documents={orderedDocuments} docTypes={docTypes}/>
    </>
  );
};
