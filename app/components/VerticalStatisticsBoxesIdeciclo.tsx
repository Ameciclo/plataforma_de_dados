import React from "react";
import {
  IntlDateStr,
  IntlNumber1Digit,
  IntlNumberMax1Digit,
} from "../../utils";

// IDECICLO
export function VerticalStatisticsBoxesIdeciclo({ title, boxes }) {
  return (
    <section className="container mx-auto mt-[-450px] md:mt-[-250px]">
      <div className="mx-auto text-center my-12 md:my-6">
        <h3 className="text-4xl font-bold p-6 my-8 mb-[100px] rounded-[40px] bg-[#6DBFAC] mx-auto w-[300px] md:w-[600px] lg:w-[700px]">{title}</h3>
        <section
          className={`container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${boxes.length} md:grid-cols-2 auto-rows-auto gap-10 my-10`}
        >
          {boxes.map((out_param: any, index: number) => (
            <VerticalBoxIdeciclo key={`vt-st-links-box-${index}`} {...out_param} />
          ))}
        </section>
      </div>
    </section>
  );
}

// caixa titulo estatistica (colorida)
function VerticalBoxIdeciclo({ titulo, media, mediaType = "", color, parametros }) {
  let newMedia = "N/A";
  switch (mediaType) {
    case "number":
      newMedia = IntlNumber1Digit(media);
      break;
    case "numberMax1Digit":
      newMedia = IntlNumberMax1Digit(media);
      break;
    case "date":
      newMedia = IntlDateStr(media);
      break;
    default:
      newMedia = media;
  }
  const getImageUrl = (titulo) => {
    switch (titulo) {
      case 'Qualidade do projeto':
        return '/ideciclo/icones/qualidade-do-projeto.svg';
      case 'Segurança viária':
        return '/ideciclo/icones/seguranca-viaria.svg';
      case 'Manutenção':
        return '/ideciclo/icones/manutencao.svg';
      case 'Urbanidade':
        return '/ideciclo/icones/urbanidade.svg';
      default:
        return '/ideciclo/icones/default-image.svg';
    }
  };

  // URL da imagem baseada no titulo
  const imageUrl = getImageUrl(titulo);
  
  return (
    <div className="container rounded flex flex-col gap-[80px]">
      <div
        className="flex flex-col rounded-[40px] justify-center font-semibold text-xl mx-auto uppercase w-[234px] mt-10 p-6 text-center tracking-widest shadow-md relative md:min-h-[150px]"
        style={{ background: color, flex: "0", boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Imagem posicionada no topo da caixa */}
        <img 
          src={imageUrl} 
          alt={`${titulo} image`} 
          className="absolute top-[-80px] left-1/2 transform -translate-x-1/2"
          style={{ height: '108px', width: '104px' }}
        />
        <h3>{titulo}</h3>
        <h3 className="text-4xl font-bold mt-1">{newMedia}</h3>
      </div>
      <div className="flex flex-col gap-[80px] mx-4 md:mx-auto max-w-4xl">
        {parametros.map((inner_param: any, index: number) => (
          <StatisticBoxIdeciclo key={`stbx-links-box-${index}`} color={color} {...inner_param} />
        ))}
      </div>
    </div>
  );
}

// caixa branca estatistica
function StatisticBoxIdeciclo({ titulo, media, mediaType, maior, menor, color }) {
  // Função para mapear o titulo para uma URL de imagem
  const getImageUrl = (titulo) => {
    switch (titulo) {
      case 'Qualidade do projeto':
        return '/ideciclo/icones/qualidade-do-projeto.svg';
      case 'Proteção contra a invasão':
        return '/ideciclo/icones/protecao-contra-invasao.svg';
      case 'Sinalização vertical':
        return '/ideciclo/icones/sinalizacao-vertical.svg';
      case 'Sinalização horizontal':
        return '/ideciclo/icones/sinalizacao-horizontal.svg';
      case 'Conforto da esturutra':
        return '/ideciclo/icones/conforto-da-estrutura.svg';
      case 'Segurança viária':
        return '/ideciclo/icones/seguranca-viaria.svg';
      case 'Controle de velocidade':
        return '/ideciclo/icones/controle-de-velocidade.svg';
      case 'Conflitos ao longo':
        return '/ideciclo/icones/conflitos-ao-longo.svg';
      case 'Conflitos nos cruzamentos':
        return '/ideciclo/icones/conflitos-nos-cruzamentos.svg';
      case 'Manutenção':
        return '/ideciclo/icones/manutencao.svg';
      case 'Tipo de pavimento':
        return '/ideciclo/icones/tipo-de-pavimento.svg';
      case 'Condição da sinalização horizontal':
        return '/ideciclo/icones/condicao-da-sinalizacao-horizontal.svg';
      case 'Situação da proteção':
        return '/ideciclo/icones/situacao-da-protecao.svg';
      case 'Urbanidade':
        return '/ideciclo/icones/urbanidade.svg';
      case 'Obstáculos':
        return '/ideciclo/icones/obstaculos.svg';
      case 'Sombreamento':
        return '/ideciclo/icones/sombreamento.svg';
      case 'Acesso da estrutura':
        return '/ideciclo/icones/acesso-da-estrutura.svg';
      case 'Iluminação':
        return '/ideciclo/icones/iluminacao.svg';
      default:
        return '/ideciclo/icones/default-image.svg';
    }
  };

  let text_color = "text-gray-900";
  if (!(maior && menor)) {
    if (maior) text_color = "text-ameciclo";
    if (menor) text_color = "text-red-500";
  }

  let newMedia = "N/A";

  switch (mediaType) {
    case "number":
      newMedia = IntlNumber1Digit(media);
      break;
    case "numberMax1Digit":
      newMedia = IntlNumberMax1Digit(media);
      break;
    case "date":
      newMedia = IntlDateStr(media);
      break;
    default:
      newMedia = media;
  }

  // URL da imagem baseada no titulo
  const imageUrl = getImageUrl(titulo);

  return (
    <div
      className="relative border-4 rounded-[40px] flex flex-col justify-center uppercase w-[234px] p-6 text-center tracking-widest mx-auto"
      style={{ borderColor: color, boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Imagem posicionada no topo da caixa */}
      <img 
        src={imageUrl} 
        alt={`${titulo} image`} 
        className="absolute top-[-80px] left-1/2 transform -translate-x-1/2"
        style={{ height: '108px', width: '104px' }}
      />
      <h3>{titulo}</h3>
      <p className={`text-4xl font-bold mt-1 ${text_color}`}>{newMedia}</p>
    </div>
  );
}


