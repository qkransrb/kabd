import { isRegularMember } from "@/actions/auth-actions";
import { getNewsDetails } from "@/actions/news-actions";
import NewsDetailsContent from "@/components/news/news-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const NewsDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const newsDetails = await getNewsDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="보도자료" />

      <section className="mb-[105px]">
        <SubTitle text="보도자료" className="mt-[30px] mb-[58px]" />
      </section>

      <NewsDetailsContent newsDetails={newsDetails} />
    </div>
  );
};

export default NewsDetails;
