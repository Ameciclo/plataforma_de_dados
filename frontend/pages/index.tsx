import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
// @ts-ignore
import ResarchIcon from "../public/icons/research.svg";
// @ts-ignore
import CalendarIcon from "../public/icons/calendar.svg";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Ameciclo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 sm:p-8 lg:p-16 xl:p-20 mx-auto bg-ameciclo">
        <div className="container mx-auto my-16">
          <SearchBar />
        </div>
      </div>

      <section>
        <div className="container mx-auto flex flex-wrap p-10 flex-1">
          <div className="w-1/4 justify-center flex items-center">
            <ResarchIcon className="h-32 fill-current" />
          </div>
          <div className="w-3/4 justify-center flex items-center">
            <p className="text-base">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsumv Lorem Ipsum Lorem IpsumLorem
              Ipsum Lorem Ipsum
            </p>
          </div>
        </div>
      </section>
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="text-2xl text-white py-8 w-1/2 mx-auto">
            Navegue e visualize os dados
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-5 sm:grid-rows-2 gap-8 grid-flow-row">
            <GridCard
              title="Contagens"
              text="Contagens das viagens de bicicleta e suas caracteristicas observaveis"
              icon={CalendarIcon}
            />
            <GridCard
              title="Mapa"
              text="Acompanhamento da execução do plano diretor cicloviario"
              icon={CalendarIcon}
            />
            <GridCard
              title="Ideciclo"
              text="Índice que mede a malha e qualidade da estrutura cicloviaria"
              icon={CalendarIcon}
            />
            <GridCard
              title="Relatorio de Mobilidade"
              text="Informações obtidas a partir de pedidos de acesso a informação"
              icon={CalendarIcon}
            />
            <GridCard
              title="Perfil"
              text="Dados socio-economicos dos ciclistas e suas percepções"
              icon={CalendarIcon}
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="text-2xl text-ameciclo py-8">
            Mais dados em parceria
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row">
            <div className="bg-white h-32 rounded-lg shadow-xl flex items-center justify-center">
              <img
                src="/ciclomapa.png"
                alt="Logo do Ciclomapa"
                className="w-full h-full object-cover"
              />
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
        <div className="flex-1 container mx-auto p-10 text-center">
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

const GridCard = ({ title, text, icon }) => {
  return (
    <div className="bg-white w-full rounded-lg shadow-xl flex items-center justify-center text-gray-600 p-10">
      <div className="flex flex-col text-center">
        <CalendarIcon className="h-32 fill-current" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-base">{text}</p>
      </div>
    </div>
  );
};
