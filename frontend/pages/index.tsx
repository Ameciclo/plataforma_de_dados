import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
import ResarchIcon from "../public/icons/research.svg";
import CalendarIcon from "../public/icons/calendar.svg";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Ameciclo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle content-center flex w-full bg-ameciclo flex-col"
        style={{ marginTop: "16px", height: "75vh" }}
      >
        <div className="container mx-auto my-8">
          <div className="container mx-auto my-12">
            <h1 className="text-4xl font-bold">Plataforma de Dados</h1>
            <h3>Seja bem vinde ao portal de dados de mobilidade urbana</h3>
          </div>
          <SearchBar />
        </div>
      </div>
      <section>
        <div className="container mx-auto flex flex-wrap my-8 flex-1">
          <div className="w-1/4 justify-center flex items-center">
            <ResarchIcon className="h-32" />
          </div>
          <div className="w-3/4 justify-center flex items-center">
            <p className="text-lg">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsumv Lorem Ipsum Lorem IpsumLorem
              Ipsum Lorem Ipsum
            </p>
          </div>
        </div>
      </section>
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto px-10 py-10 text-center">
          <h3 className="text-2xl text-white py-8 w-1/2 mx-auto">
            Navegue e visualize os dados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 sm:grid-rows-3 gap-4 grid-flow-row">
            <div className="lg:row-span-2 lg:col-span-3 bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Mapa</h2>
                <p className="text-lg">
                  Acompanhamento da execução do plano diretor cicloviario
                </p>
              </div>
            </div>
            <div className="bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Ideciclo</h2>
                <p className="text-lg">
                  Índice que mede a malha e qualidade da estrutura cicloviaria
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Relatorio de Mobilidade</h2>
                <p className="text-lg">
                  Informações obtidas a partir de pedidos de acesso a informação
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Perfil</h2>
                <p className="text-lg">
                  Dados socio-economicos dos ciclistas e suas percepções
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="flex-1 container mx-auto px-10 my-10 text-center">
          <h3 className="text-2xl text-ameciclo py-8">
            Mais dados em parceria
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row">
            <div className="bg-white h-32 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <h2 className="text-2xl">CicloMapa</h2>
              </div>
            </div>
            <div className="bg-white h-32 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <h2 className="text-2xl">Observatório da Bicicleta</h2>
              </div>
            </div>
            <div className="bg-white h-32 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <h2 className="text-2xl">Mobilidados</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto px-10 my-10 py-10 text-center">
          <h3 className="text-2xl text-white py-8">Realização</h3>
          <div className="grid grid-cols-1 grid-rows-1 gap-4 grid-flow-row">
            <div className="bg-white h-32 rounded-lg shadow-xl flex items-center justify-center max-w-sm mx-auto">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <h2 className="text-2xl">Ameciclo</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
