import { isRegularMember } from "@/actions/auth-actions";
import { getNewsroomList } from "@/actions/newsroom-actions";
import NewsroomLists from "@/components/newsroom/newsroom-lists";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q: string; page: number };
}

const NewsRoom = async ({ searchParams: { q, page } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const newsroomList = await getNewsroomList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="뉴스룸" />

      <section className="mb-[70px]">
        <SubTitle text="뉴스룸" className="mt-[30px]" />
      </section>

      <NewsroomLists newsroomList={newsroomList} />
    </div>
  );
};

export default NewsRoom;
