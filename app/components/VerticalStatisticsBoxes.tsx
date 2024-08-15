import React from "react";
import {
  IntlDateStr,
  IntlNumber1Digit,
  IntlNumberMax1Digit,
} from "../../utils";

export function VerticalStatisticsBoxes({ title, boxes }) {
  return (
    <section className="container mx-auto">
      <div className="mx-auto text-center my-12">
        <h3 className="text-4xl font-bold my-8">{title}</h3>
        <section
          className={`container mx-auto grid grid-cols-1 lg:grid-cols-${boxes.length} md:grid-cols-2 auto-rows-auto gap-10 my-10`}
        >
          {boxes.map((out_param: any, index: number) => (
            <VerticalBox key={`vt-st-links-box-${index}`} {...out_param} />
          ))}
        </section>
      </div>
    </section>
  );
}

function VerticalBox({ titulo, media, mediaType = "", color, parametros }) {
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
  return (
    <div className="container rounded shadow-2xl flex flex-col">
      <div
        className="flex flex-col justify-center font-bold text-2xl uppercase w-full p-6 text-center tracking-widest"
        style={{ background: color, flex: "1" }}
      >
        <h3>{titulo}</h3>
        <h3 className="text-4xl font-bold mt-2">{newMedia}</h3>
      </div>
      <div className="flex flex-col mx-4 md:mx-auto max-w-4xl divide-y divide-gray-200">
        {parametros.map((inner_param: any, index: number) => (
          <StatisticBox key={`stbx-links-box-${index}`} {...inner_param} />
        ))}
      </div>
    </div>
  );
}

function StatisticBox({ titulo, media, mediaType, maior, menor }) {
  let text_color = "text-gray-900";
  if (!(maior & menor)) {
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

  return (
    <div className="flex flex-col justify-center uppercase w-full p-6 text-center tracking-widest">
      <h3>{titulo}</h3>
      <p className={`text-4xl font-bold mt-2 ${text_color}`}>{newMedia}</p>
    </div>
  );
}