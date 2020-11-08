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
        <title>Create Next App</title>
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
      <div className="container mx-auto flex flex-wrap my-8">
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
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto px-10">
          <h3 className="text-2xl text-white">Navegue e visualize os dados</h3>
          <div className="grid grid-cols-4 grid-rows-3 gap-4 grid-flow-row">
            <div className="row-span-2 col-span-3 bg-gray-300 h-full rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-32" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="col-span-2 bg-gray-300 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="col-span-2 bg-gray-300 h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="flex-1 container mx-auto px-10 my-10">
          <h3 className="text-2xl text-ameciclo">Mais dados em parceria</h3>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 grid-flow-row">
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto px-10 my-10">
          <h3 className="text-2xl text-white">Realização</h3>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 grid-flow-row">
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
            <div className="bg-white h-64 rounded-lg shadow-xl flex items-center justify-center">
              <div className="flex flex-col text-center px-16 text-ameciclo">
                <CalendarIcon className="h-16" fill="#028083" />
                <h2 className="text-2xl">Contagens</h2>
                <p className="text-lg">
                  Contagens das viagens de bicicleta e suas caracteristicas
                  observaveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
