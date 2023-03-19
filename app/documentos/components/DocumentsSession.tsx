"use client";

import React, { useEffect, useState } from "react";
import { SelectionFilterMenu } from "../../components/SelectionFilterMenu";
import { DocumentCard } from "./DocumentCard";
import { document } from "../../../typings";

export const DocumentsSession = ({ props }) => {
  const { documents, docTypes } = props;
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
          filters: [
            {
              title: "Selecione o tipo de documento",
              value: selectedDocumentType,
              name: "docType",
              onChange: (e) => setSelectedDocumentType(e.target.value),
              onBlur: (e) => e,
              items: docTypes,
            },
          ],
        }}
      />
      <DocumentsList props={{filteredDocuments, docTypes}} />
    </>
  );
};

const DocumentsList = ({ props }) => {
  const { filteredDocuments, docTypes } = props;
  return (
    <>
      <div className="mt-5 mx-3 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {filteredDocuments
          .sort((a: document, b: document) =>
            a.release_date > b.release_date ? -1 : 1
          )
          .map((document: document) => (
            <DocumentCard
              props={{
                ...document,
                indicator: docTypes.filter((d) => document.type === d.value)[0],
              }}
            />
          ))}
      </div>{" "}
    </>
  );
};
