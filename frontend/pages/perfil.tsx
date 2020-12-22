import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import InfoCard from "../components/InfoCard";
import Select from "react-select";
import {
  Builder,
  BuilderFieldProps,
  BuilderComponentsProps,
  Strings,
} from "@vojtechportes/react-query-builder";
import BarChart from "../components/BarChart";

const strings: Strings = {
  group: {
    not: "Não",
    or: "Ou",
    and: "E",
    addRule: "Adicionar Condição",
    addGroup: "Adicionar agrupamento",
    delete: "Deletar",
  },
  component: {
    delete: "Deletar",
  },
  form: {
    selectYourValue: "Selecione um valor",
  },
  operators: {
    LARGER: "Maior",
    SMALLER: "Menor",
    LARGER_EQUAL: "Maior ou Igual",
    SMALLER_EQUAL: "Menor ou Igual",
    EQUAL: "Igual",
    NOT_EQUAL: "Diferente",
    ALL_IN: "Contem todos",
    ANY_IN: "Contem pelo menos um",
    NOT_IN: "Não contem",
    BETWEEN: "Entre",
    NOT_BETWEEN: "Não entre",
  },
};

const fields: BuilderFieldProps[] = [
  {
    field: "GENDER",
    label: "Gênero",
    type: "LIST",
    operators: ["EQUAL", "NOT_EQUAL"],
    value: [
      { value: "feminino", label: "Feminino" },
      { value: "masculino", label: "Masculino" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    field: "RACE",
    label: "Raça",
    type: "LIST",
    operators: ["EQUAL", "NOT_EQUAL"],
    value: [
      { value: "amarelo", label: "Amarelo" },
      { value: "branco", label: "Branco" },
      { value: "indigena", label: "Indígena" },
      { value: "pardo", label: "Pardo" },
      { value: "preto", label: "Preto" },
    ],
  },
  {
    field: "YEAR",
    label: "Ano da Pesquisa",
    type: "LIST",
    operators: ["EQUAL", "NOT_EQUAL"],
    value: [{ value: "2017", label: "2017" }],
  },
  {
    field: "AREA",
    label: "Área",
    type: "LIST",
    operators: ["EQUAL", "NOT_EQUAL"],
    value: [
      { value: "1", label: "Área 1 - Área Central" },
      { value: "2", label: "Área 2 - Área Intermediária" },
      { value: "3", label: "Área 3 - Área Periférica" },
    ],
  },
  {
    field: "AGE",
    label: "Idade",
    type: "NUMBER",
    operators: [
      "EQUAL",
      "NOT_EQUAL",
      "BETWEEN",
      "NOT_BETWEEN",
      "LARGER",
      "SMALLER",
      "LARGER_EQUAL",
      "SMALLER_EQUAL",
    ],
  },
];

const data: any = [
  // Initial query tree
];

const components: BuilderComponentsProps = {
  // Custom components configuration
};

const Perfil = ({ cyclistProfiles }) => {
  // let dataDays = cyclistProfiles.map((c) => {
  //   return { day: c.data.days_usage.total };
  // });

  let obj = {},
    dataDays = [],
    obj2 = {},
    dataYears = [];

  cyclistProfiles.forEach((c) => {
    if (!obj[c.data.days_usage.total]) {
      obj[c.data.days_usage.total] = {
        day: c.data.days_usage.total,
        quantity: 1,
      };
    } else {
      obj[c.data.days_usage.total].quantity++;
    }
  });

  cyclistProfiles.forEach((c) => {
    if (!obj2[c.data.years_using]) {
      obj2[c.data.years_using] = {
        years: c.data.years_using,
        quantity: 1,
      };
    } else {
      obj2[c.data.years_using].quantity++;
    }
  });

  dataDays = Object.values(obj);
  dataYears = Object.values(obj2);

  return (
    <Layout>
      <Head>
        <title>Plataforma de Dados | Perfil Ciclista</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0"
        style={{ height: "25vh" }}
      >
        <h1 className="text-4xl font-bold">Perfil Ciclista</h1>
      </div>
      <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
        <div className="container mx-auto">
          <Breadcrumb label="Perfil" slug="/perfil" routes={["/", "/perfil"]} />
        </div>
      </div>
      <section className="container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">O que é?</h1>
            <p>
              A pesquisa foi organizada pela Transporte Ativo e pelo
              LABMOB-UFRJ, e contou com uma extensa rede de organizações
              colaboradoras que levaram a campo, entre setembro de 2017 e abril
              de 2018 mais de 140 pesquisadores para realizar 7.644entrevistas.
              Devido a abrangência e a complexidade da pesquisa, a sua
              concretização só foi possível através da participação e
              engajamento de todos envolvidos, fruto de um grande esforço de
              ação coletivae voluntária.
            </p>
          </div>
          <div className="text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Para que serve?</h1>
            <p>
              Os resultados sintéticos apresentados aqui revelam as principais
              tendências do deslocamento por bicicleta em várias cidades
              brasileiras.Cabe ressaltar que não é possível uma comparação
              direta com a primeira edição da pesquisa – realizada em 2015
              –poisagoraadotamos outro método de amostragem, mais refinado e que
              resultou, em muitos casos, em amostras com tamanhos distintos. Os
              dados coletados e analisados nesta pesquisa fornecem subsídios
              para que gestores públicos, urbanistas e todos os envolvidoscom o
              tema, formulem uma agenda mais precisa e robusta de políticas
              públicas e ações de promoção do transporte cicloviário.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto shadow-md p-10">
        <h2 className="font-bold text-3xl mt-5">
          Monte sua consulta aos dados
        </h2>
        <Builder
          readOnly={false}
          fields={fields}
          data={data}
          strings={strings}
          components={components}
          onChange={(data) => console.log(data)}
        />
      </section>

      <section className="container mx-auto grid grid-cols-2 auto-rows-auto gap-10 my-10">
        <div
          className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
          style={{ height: "700px" }}
        >
          <h2 className="text-gray-600 text-3xl">
            Quantos dias da semana costuma utilizar a bicicleta como meio de
            transporte.
          </h2>
          <BarChart data={dataDays} keys={["quantity"]} index={"day"} />
        </div>
        <div
          className="shadow-2xl rounded p-10 text-center overflow-x-scroll"
          style={{ height: "700px" }}
        >
          <h2 className="text-gray-600 text-3xl">
            Há quanto tempo utiliza a bicicleta como meio de transporte.
          </h2>
          <BarChart data={dataYears} keys={["quantity"]} index={"years"} />
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.perfil.ameciclo.org/v1/cyclist-profile/`
  );

  const cyclistProfiles = await res.json();

  return { props: { cyclistProfiles: cyclistProfiles.data } };
}

export default Perfil;
