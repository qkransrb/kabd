import { getNewsDetails } from "@/actions/news-actions";
import NewsDetailsContent from "@/components/news/news-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const NewsDetails = async ({ params: { id } }: Props) => {
  const newsDetails = await getNewsDetails(id);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="학회소식" third="보도자료" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="보도자료"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-[58px]"
        />
      </section>

      <NewsDetailsContent newsDetails={newsDetails} />
    </div>
  );
};

export default NewsDetails;
