"use client";

import React, { useEffect, useState } from "react";
import { SelectionFilterMenu } from "../../components/SelectionFilterMenu";
import { DocumentCard } from "./DocumentCard";
import { document } from "../../../typings";

export const DocumentsSession = ({ props }) => {
  const {documents, docTypes} = props
  const [selectedDocumentType, setSelectedDocumentType] = useState("all");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    if (selectedDocumentType != "all") {
      setFilteredDocuments(
        documents.filter((documents) => {
          return documents.type === selectedDocumentType;
        })
      );
    } else {
      setFilteredDocuments(documents);
    }
  }, [selectedDocumentType, documents]);

  return (
    <>
      <SelectionFilterMenu
        props={{
          title: "Selecione o tipo de documento",
          filters: [
            {
              value: selectedDocumentType,
              name: "docType",
              onChange: (e) => setSelectedDocumentType(e.target.value),
              onBlur: (e) => e,
              items: docTypes,
            },
          ],
        }}
      />
      <div className="mt-5 mx-3 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {filteredDocuments
          .sort((a: document, b: document) =>
            a.release_date > b.release_date ? -1 : 1
          )
          .map((document: document) => (
            <DocumentCard
              props={{
                title: document.title,
                description: document.description,
                release_date: document.release_date,
                type: document.type,
                cover: document.cover,
                url: document.url,
                indicator: docTypes.filter(d => document.type === d.value)[0],
              }}
            />
          ))}
      </div>
    </>
  );
};
