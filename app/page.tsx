import { NavCover } from "./components/NavCover";
import { SessionImageText } from "./components/SessionImageText";
import { CardsSession } from "./components/CardsSession";
import { ImagesGrid } from "./components/ImagesGrid";
import { PLATAFORM_HOME_PAGE, FEATURED_PAGES } from "../servers";
import { ExplanationBoxes } from "./components/ExplanationBox";

const fetchPlataformHomePage = async () => {
  const res = await fetch(PLATAFORM_HOME_PAGE, { cache: "no-cache" });
  const homePageData: any = await res.json();
  return homePageData;
};

async function fetchFeaturedPages() {
  const response = await fetch(FEATURED_PAGES, { cache: "no-cache" });
  const data: any[] = await response.json();
  return data;
}

export default async function Home() {
  const data = await fetchPlataformHomePage();
  const { cover, description, partners } = data;
  const dataPartners = partners.map((p) => {
    return {
      src: p.image.url,
      alt: p.title,
      url: p.link,
    };
  });
  const featuredPages = await fetchFeaturedPages();
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
          title="Navegue e visualize os dados"
          cards={featuredPages}
        />
        <ImagesGrid
          title="Outras plataformas de dados de parceiras"
          images={dataPartners}
        />
      </main>
    </div>
  );
}
