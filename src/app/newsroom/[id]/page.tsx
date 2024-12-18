import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import NewsroomDetailsContent from "@/components/newsroom/newsroom-details-content";
import { getNewsroomDetails } from "@/actions/newsroom-actions";
import { isRegularMember } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const NewsroomDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const newsroomDetails = await getNewsroomDetails(id);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="학회소식" third="뉴스룸" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="뉴스룸"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <NewsroomDetailsContent newsroomDetails={newsroomDetails} />
    </div>
  );
};

export default NewsroomDetails;
