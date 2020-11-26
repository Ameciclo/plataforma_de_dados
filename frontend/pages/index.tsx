import Head from "next/head";
import Layout from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
// @ts-ignore
import ResarchIcon from "../public/icons/research.svg";
// @ts-ignore
import CalendarIcon from "../public/icons/calendar.svg";
import React from "react";
import Img from "../components/Img";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Ameciclo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 sm:p-8 lg:p-16 xl:p-20 mx-auto bg-ameciclo">
        <div className="container mx-auto">
          <SearchBar />
        </div>
      </div>

      <section>
        <div className="container mx-auto flex flex-wrap p-10 flex-1 my-8 w-3/4">
          <div className="w-1/4 justify-center flex items-center">
            <ResarchIcon className="h-32 fill-current" />
          </div>
          <div className="w-3/4 justify-center flex items-center">
            <p className="text-base text-2xl">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsumv Lorem Ipsum Lorem IpsumLorem
              Ipsum Lorem Ipsum
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="font-bold text-3xl text-ameciclo py-8 w-1/2 mx-auto">
            Navegue e visualize os dados
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-5 sm:grid-rows-2 gap-8 grid-flow-row">
            <GridCard
              title="Contagens"
              text="Contagens das viagens de bicicleta e suas caracteristicas observaveis"
              icon={CalendarIcon}
              url="/contagens"
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
          <h3 className="font-bold text-3xl text-ameciclo py-8">
            Mais dados em parceria
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4 grid-flow-row"
            style={{ justifyItems: "center" }}
          >
            <div className="bg-white rounded-lg shadow-xl w-full">
              <img src="/ciclomapa.webp" className="object-fill h-48 w-full" />
            </div>
            <div className="bg-white rounded-lg shadow-xl w-full">
              <img
                src="/observatorio.webp"
                className="object-contain h-48 w-full"
              />
            </div>
            <div className="bg-white rounded-lg shadow-xl w-full">
              <img
                src="/mobilidados.webp"
                className="object-fill h-48 w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-ameciclo">
        <div className="flex-1 container mx-auto p-10 text-center">
          <h3 className="font-bold text-3xl text-white py-8">Realização</h3>
          <div
            className="grid grid-cols-1 grid-rows-1 gap-4"
            style={{ justifyItems: "center" }}
          >
            <svg
              className="w-32 h-32 text-ameciclo bg-white border-white border-4"
              fill="currentColor"
              viewBox="0 0 400 400"
            >
              <defs />
              <path d="M1 1L0 201v199h400V0H200L1 1zm86 127c8 3 12 8 15 16 2 5 3 7 3 45v40h-3c-9 2-24 3-34 3-25 0-38-8-40-27-3-20 8-33 30-37 6-1 22-1 27 1 2 0 2 0 2-6 0-10-4-18-12-21-6-2-19-2-28 0-7 2-8 2-8-3l-1-6v-5l5-1c8-3 10-3 24-3 13 1 14 1 20 4zm91-1l8 4 3 3 4-2 13-6c8-2 10-2 17-2 19 1 28 9 33 26l2 107c0 98 1 102 2 104l6 3 6 2-1 8-1 8-7-1c-15-2-21-8-23-21l-1-102-1-101c-2-8-4-10-9-13-3-2-5-3-12-2-8 0-10 0-15 3-3 1-5 3-5 4 2 8 2 16 2 46v36h-7c-13 0-12 4-12-36 0-36 0-40-4-46s-8-7-19-7h-12l-4 1v44l-1 44h-18V129l11-2 14-2a121 121 0 0131 2zm157 1c14 7 21 21 21 46l1 10h-68v2c0 4 3 13 6 18 6 10 24 14 43 9l9-1c1 0 3 14 2 15s-11 4-21 5c-30 3-50-10-57-36-2-9-2-28 0-36 5-17 15-28 29-34 5-2 7-2 17-2 11 1 12 1 18 4zM137 241c2 0 4 2 4 3 2 3 3 11 1 14-2 4-6 6-11 6-4 0-5-1-8-4-2-3-3-4-3-8 0-10 8-16 17-12zm182 32c3 8 11 9 15 2 2-4 5-4 10-1 3 2 4 3 2 8s6 13 11 9c2-2 5-2 7 1 4 3 4 8 1 11-6 3-2 14 5 14 2 0 3 1 4 3 2 6 0 11-5 11-3 0-6 3-7 7l3 7c4 4 4 4 3 7l-3 5c-3 2-3 2-6 0-5-2-8-1-11 4v6c1 5 0 6-4 9-4 2-6 1-8-2-3-6-12-6-14 1-2 5-3 6-6 6-5 0-8-2-8-7s-3-8-8-8c-3 0-4 1-5 2-2 3-5 3-8 1-4-3-5-6-3-9 3-3 2-7-1-11-2-3-3-3-6-2-5 1-7-1-8-6s-1-5 3-8c4-2 5-3 5-7s-1-6-5-8-5-5-3-10c1-3 2-3 8-3l5-2c3-4 4-7 1-11l-2-4c0-2 6-8 8-8l4 3c6 5 13 1 13-8 0-5 2-6 8-6 4 0 4 0 5 4zm-225 2l7 3-2 8c-2 8-1 8-12 6-13-4-27 0-33 8s-7 14-7 27c-1 19 4 29 16 35 5 2 6 3 17 2l15-1 5-1c1 0 3 14 2 15-3 3-28 6-38 4-23-5-37-25-37-53 0-27 13-47 35-54 7-1 23-1 32 1zm125 1l6 2c1 1-2 15-3 16l-6-2c-7-2-22-2-27 0-12 5-18 18-18 35 0 20 7 32 21 36 6 3 20 2 27 0l6-2c1 1 2 15 1 16-2 2-12 4-22 5-26 1-44-12-50-37-3-8-2-27 0-36 5-18 17-31 34-35 7-1 22-1 31 2zm-78 52v52h-18l-1-51v-52l10-1h9v52z" />
              <path d="M58 185c-3 0-6 3-8 5-3 3-3 4-3 9s0 7 2 10c4 5 9 7 22 7 18 0 16 2 16-16v-16h-3c-6-2-22-1-26 0zM306 142c-8 3-15 13-16 22l-1 4h48v-3c0-5-3-13-6-17-6-8-17-10-25-6z" />
              <path
                fill="#f40000"
                d="M301 302c-6 4-8 8-8 17 0 6 1 7 5 12l13 15 10 10 4-5 13-13c10-12 13-20 9-29-4-8-14-11-22-6-4 3-4 3-6 2l-12-5-6 2z"
              />
            </svg>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const GridCard = ({ title, text, icon, url = "#" }) => {
  return (
    <a href={url}>
      <div className="bg-white bg-customGrey w-full rounded-lg flex items-center justify-center text-ameciclo p-10">
        <div className="flex flex-col text-center">
          <CalendarIcon className="h-32 fill-current" />
          <h2 className="text-2xl font-bold text-ameciclo">{title}</h2>
          <p className="text-base font-medium">{text}</p>
        </div>
      </div>
    </a>
  );
};
