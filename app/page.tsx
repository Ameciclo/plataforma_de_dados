import { NavCover } from "./components/NavCover";
import { ExplanationBoxes } from "./components/ExplanationBox";
import { CardsSession } from "./components/CardsSession";
import { ImagesGrid } from "./components/ImagesGrid";
import { PLATAFORM_HOME_PAGE } from "../servers";
import { FEATURED_PAGES } from "./configuration";

const fetchData = async () => {
  const res = await fetch(PLATAFORM_HOME_PAGE, { cache: "no-cache" });
  const homePageData: any = await res.json();
  return homePageData;
};

export default async function Home() {
  const data = await fetchData();
  const { cover, description, partners } = data;
  const dataPartners = partners.map((p) => {
    return {
      src: p.image.url,
      alt: p.title,
      url: p.link,
    };
  });
  return (
    <div className="home-page">
      <main className="flex-1 w-full mx-auto main-padding-top">
        <NavCover title="Plataforma de dados" src={cover.url} />
        <ExplanationBoxes
          boxes={[{ title: "O que temos aqui?", description: description }]}
        />
        {/* <SessionImageText
          image={"/icons/home/research.svg"}
          text={description}
        /> */}
        <CardsSession
          title="Navegue por nossas pesquisas"
          cards={FEATURED_PAGES}
        />
        <ImagesGrid
          title="Outras plataformas de dados de parceiras"
          images={dataPartners}
        />
      </main>
    </div>
  );
}
