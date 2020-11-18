import React, { useEffect, useState } from "react";
import Highlight from "react-highlighter";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchQuestion = async (q) => {
      try {
        const res = await axios.get("http://bicipai.emdados.org/api/pais/", {
          params: {
            format: "json",
            q: q,
          },
        });
        setIsSearching(false);
        setResults(res.data);
      } catch (e) {
        setIsSearching(false);
        setResults([]);
        console.log(e);
        throw new Error("Erro na requisição");
      }
    };

    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm) {
      // Set isSearching state
      setIsSearching(true);
      // Fire off our API call
      searchQuestion(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative mx-6">
      <div className="flex flex-col items-center relative ">
        <h1 className="text-4xl font-bold mb-4">O que você está procurando?</h1>
        <input
          type="search"
          name="search"
          placeholder="O uso de capacete é obrigatório?"
          className="bg-white text-gray-600 w-full h-10 px-5 pr-10 rounded shadow-2xl text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setSearchResultsVisible(true);
          }}
        />
      </div>
      {searchTerm.length > 0 && !isSearching && searchResultsVisible && (
        <div
          className="text-gray-800 absolute normal-case bg-white border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto"
          style={{ maxHeight: "32rem" }}
        >
          <div className="flex flex-col">
            {results.map((result) => {
              return (
                <a
                  className="border-b border-gray-400 text-xl cursor-pointer p-4 hover:bg-blue-100"
                  key={result.protocolo}
                  href={result.url}
                >
                  <Highlight search={searchTerm}>{result.protocolo}</Highlight>
                  <span className="block font-normal text-sm my-1">
                    <Highlight search={searchTerm}>{result.pergunta}</Highlight>
                  </span>
                </a>
              );
            })}
            {results.length === 0 && (
              <div className="font-normal w-full border-b cursor-pointer p-4">
                <p className="my-0">
                  Nenhum resultado para '<strong>{searchTerm}</strong>'
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
