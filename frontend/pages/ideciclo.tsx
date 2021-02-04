import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import Select from "react-select";
import Link from "next/link";
import { useTable } from "react-table";

const Ideciclo = ({ cities, structures }) => {
  const [selectedCity, setCity] = useState({
    label: "Recife",
    value: "Recife",
  });
  const [cityData, setCityData] = useState(null);
  const [cityStructure, setCityStructure] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchCity = async (city) => {
      try {
        const res = await fetch(
          `https://api.ideciclo.ameciclo.org/api/v1/cities/${city}`
        );
        const data = await res.json();
        setIsSearching(false);
        setCityData(data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchStructures = async (city) => {
      try {
        const res = await fetch(
          `https://api.ideciclo.ameciclo.org/api/v1/structures/?city=${city}`
        );
        const data = await res.json();
        setIsSearching(false);
        setCityStructure(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCity(selectedCity.value);
    fetchStructures(selectedCity.value);
  }, [selectedCity]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "street",
        Cell: ({ row }) => (
          <Link href={`ideciclo/${row.original.id}`} key={row.original.id}>
            <a className="text-blue-500">{row.original.street}</a>
          </Link>
        ),
      },
      {
        Header: "Tipo",
        accessor: "structure_type.name",
      },
      {
        Header: "Extensão",
        accessor: "extension",
      },
      {
        Header: "Média",
        accessor: "average_rating",
      },
    ],
    []
  );

  const data = React.useMemo(() => cityStructure, [cityStructure]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  let options = cities.map((c) => {
    return { value: c.city, label: c.city };
  });
  return (
    <Layout>
      <Head>
        <title>Ideciclo | Plataforma de Dados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
        style={{ height: "25vh" }}
      >
        <h1 className="text-4xl font-bold">Ideciclo</h1>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb
            label="Ideciclo"
            slug="/ideciclo"
            routes={["/", "/ideciclo"]}
          />
        </div>
      </div>
      <div className="mx-auto container">
        {cityData && (
          <div className="mx-auto text-center my-24">
            <h1 className="text-6xl font-bold">Estatísticas Gerais</h1>
            <h3 className="text-4xl font-bold my-8">{selectedCity.label}</h3>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100">
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>{"Nota Atual"}</h3>
                <h3 className="text-5xl font-bold mt-2">
                  {cityData.currentReview}
                </h3>
              </div>
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>{"Nota anterior"}</h3>
                <h3 className="text-5xl font-bold mt-2">
                  {cityData.previousReview}
                </h3>
              </div>
              {cityData.extension && (
                <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                  <h3>{"Extensão"}</h3>
                  <h3 className="text-5xl font-bold mt-2">
                    {cityData.extension.toFixed(1)}
                  </h3>
                </div>
              )}
              <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
                <h3>{"Avaliações"}</h3>
                <h3 className="text-5xl font-bold mt-2">
                  {cityData.reviewCount}
                </h3>
              </div>
            </div>
          </div>
        )}
        <Select
          options={options}
          onChange={setCity}
          defaultValue={{ label: "Recife", value: "Recife" }}
        />
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
              O Ideciclo é o resultado da análise de uma estrutura cicloviária,
              levando em consideração critérios relativos à cobertura da malha,
              velocidades máximas das vias, segurança e conforto de ciclistas. O
              índice pode ser utilizado para comparar quantitativa e
              qualitativamente, a situação de uma mesma malha ao longo do tempo
              e em diferentes cidades. A metodologia de cálculo inclui O
              Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
              com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
              BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
              Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
              que permitem avaliar diversas tipologias cicloviárias.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
              O Ideciclo foi desenvolvido pela Ameciclo e aprimorado em parceria
              com as organizações Ciclocidade (São Paulo/SP), Rodas da Paz (DF),
              BH em Ciclo (Belo Horizonte/MG) e Bicileta nos Planos (Campo
              Grande/MS) que aplicaram em suas respectivas cidades. parâmetros
              que permitem avaliar diversas tipologias cicloviárias. A
              metodologia completa foi aplicada em 3 cidades da Região
              Metropolitana do Recife, possibilitando a comparação da capital
              com a metodologia de 2016 (o que revelou aumento aquém do
              projetado e desejável), obtendo consistência independente dos
              avaliadores.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <h2 className="text-gray-600 text-3xl">Veja a nota de cada via</h2>
        <div className="shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg">
          <table
            className="table-auto shadow min-w-full divide-y divide-gray-200"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-left"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200 text-sm font-normal text-gray-700"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-100 border-b border-gray-200 py-10"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700 truncate max-w-sm"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://api.ideciclo.ameciclo.org/api/v1/cities/`);
  const res_structures = await fetch(
    "https://api.ideciclo.ameciclo.org/api/v1/structures/"
  );

  const structures = await res_structures.json();
  const cities = await res.json();

  return { props: { cities, structures } };
}

export default Ideciclo;
