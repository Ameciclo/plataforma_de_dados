import React, { useEffect, useState } from "react";
import Highlight from "react-highlighter";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("protocolos");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchQuestion = async (q) => {
      try {
        if (selectedFilter === "protocolos") {
          const res = await axios.get("https://bicipai.emdados.org/api/pais/", {
            params: {
              format: "json",
              q: q,
            },
          });
          setIsSearching(false);
          setResults(res.data);
        } else {
          const res = await axios.get(
            "https://api.contagem.ameciclo.org/v1/cyclist-count/",
            {
              params: {
                q: q,
              },
            }
          );
          console.log(res)
          setIsSearching(false);
          setResults(res.data.data);
        }
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
    <div className="relative mx-12">
      <div className="flex flex-col items-center relative ">
        <div className="hero-headline flex flex-col items-center justify-center text-center pb-4">
          <h1 className="font-bold text-5xl text-ameciclo">
            Plataforma de dados
          </h1>
          {/* <p className=" font-base text-base text-ameciclo">
            Pedidos de Acesso á informação, dados de contagem...
          </p> */}
        </div>
        <div className="bg-white rounded w-full flex items-center  p-3 shadow-sm border border-gray-200 mt-8">
          <button className="outline-none focus:outline-none">
            <svg
              className=" w-5 text-gray-600 h-5 cursor-pointer"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <input
            type="search"
            name="search"
            autoComplete="off"
            placeholder="Pedidos de Acesso á informação, dados de contagem..."
            className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              setSearchResultsVisible(true);
            }}
          />
          <div className="select">
            <select
              className="text-sm outline-none focus:outline-none bg-transparent"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="protocolos" defaultValue={"protocolos"}>
                Protocolos
              </option>
              <option value="contagens">Contagens</option>
            </select>
          </div>
        </div>
      </div>
      {searchTerm.length > 0 && !isSearching && searchResultsVisible && (
        <div
          className="text-gray-800 absolute normal-case bg-white border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto"
          style={{ maxHeight: "32rem" }}
        >
          <div className="flex flex-col">
            {selectedFilter === "protocolos" ? (
              <>
                {results.map((result) => {
                  return (
                    <a
                      className="border-b border-gray-400 text-xl cursor-pointer p-4 hover:bg-blue-100"
                      key={result.protocolo}
                      href={result.url}
                    >
                      <label>Protocolo: </label>
                      <Highlight search={searchTerm}>
                        {result.protocolo}
                      </Highlight>
                      <span className="block font-normal text-sm my-1">
                        <Highlight search={searchTerm}>
                          {result.pergunta}
                        </Highlight>
                      </span>
                    </a>
                  );
                })}
              </>
            ) : (
                <>
                  {results.map((result) => {
                    return (
                      <a
                        className="border-b border-gray-400 text-xl cursor-pointer p-4 hover:bg-blue-100"
                        key={result._id}
                        href={`/contagens/${result._id}`}
                      >
                        <Highlight search={searchTerm}>{result.name}</Highlight>
                        <div>
                          <span className="block font-normal text-sm my-1">
                            {`Data: ${result.date
                              .substr(0, 10)
                              .split("-")
                              .reverse()
                              .join("/")}`}
                          </span>
                          <span className="block font-normal text-sm my-1">
                            {`Total: ${result.summary.total}`}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </>
              )}

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
