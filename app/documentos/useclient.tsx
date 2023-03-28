"use client";

import React, { useEffect, useState } from "react";
import { SelectionFilter } from "../components/SelectionFilterMenu";
import { DocumentCard } from "../components/DocumentCard";
import { document } from "../../typings";

export const DocumentsSession = ({ documents, docTypes }) => {
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
      <SelectionFilter
        title={"Selecione o tipo de documento"}
        value={selectedDocumentType}
        name={"docType"}
        onChange={(e) => setSelectedDocumentType(e.target.value)}
        onBlur={(e) => e}
        items={docTypes}
      />
      <DocumentsList {...{ filteredDocuments, docTypes }} />
    </>
  );
};

const DocumentsList = ({ filteredDocuments, docTypes }) => {
  return (
    <>
      <div className="mt-5 mx-3 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {filteredDocuments
          .sort((a: document, b: document) =>
            a.release_date > b.release_date ? -1 : 1
          )
          .map((document: document) => (
            <DocumentCard
              {...{
                document,
                indicator: docTypes.filter((d) => document.type === d.value)[0],
              }}
            />
          ))}
      </div>{" "}
    </>
  );
};
