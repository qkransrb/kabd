import { redirect } from "next/navigation";

import { isRegularMember } from "@/actions/auth-actions";
import { getNoticeDetails } from "@/actions/notice-actions";

import NoticeDetailsContent from "@/components/notice/notice-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const NoticeDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const noticeDetails = await getNoticeDetails(id);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="학회소식" third="공지사항" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="공지사항"
          className="mt-[50px] lg:mt-[30px] mb-9 lg:mb-[58px]"
        />
      </section>

      <NoticeDetailsContent noticeDetails={noticeDetails} />
    </div>
  );
};

export default NoticeDetails;
