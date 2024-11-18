import { getNewsList } from "@/actions/news-actions";
import NewsTable from "@/components/news/news-table";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q: string; page: number };
}

const News = async ({ searchParams: { q, page } }: Props) => {
  const newsList = await getNewsList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="보도자료" />

      <section className="mb-[105px]">
        <SubTitle text="보도자료" className="mt-[30px] mb-[58px]" />
      </section>

      <NewsTable newsList={newsList} />
    </div>
  );
};

export default News;
