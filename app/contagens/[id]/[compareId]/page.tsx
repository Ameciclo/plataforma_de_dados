import { NavCover } from "../../../components/NavCover";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { CountingsComparision } from "./useclient";
import { COUNTINGS_DATA, COUNTINGS_PAGE_DATA } from "../../../../servers";

const fetchUniqueData = async (id: string, compareId: string) => {
  const res = await fetch(COUNTINGS_DATA + "/" + id);
  const { data } = await res.json();
  const resCompare = await fetch(COUNTINGS_DATA + "/" + id);
  const { dataCompare } = await res.json();
  return { data, dataCompare };
};

const fetchData = async () => {
  const pageDataRes = await fetch(COUNTINGS_PAGE_DATA, { cache: "no-cache" });
  const pageCover = await pageDataRes.json();
  return { pageCover };
};

export default async function Compare({ params }) {
  const { data, dataCompare } = await fetchUniqueData(
    params.id,
    params.compareId
  );
  const { pageCover } = await fetchData();
  let pageData = {
    title: data.name,
    src: pageCover.cover.url,
  };

  const crumb = {
    label: data.name,
    slug: dataCompare._id,
    routes: ["/", "/contagens", data._id, dataCompare._id],
  };

  return (
    <main className="flex-auto">
      <NavCover {...pageData} />
      <Breadcrumb {...crumb} />
    </main>
  );
}
