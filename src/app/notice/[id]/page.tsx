import { getNoticeDetails } from "@/actions/notice-actions";

import NoticeDetailsContent from "@/components/notice/notice-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const NoticeDetails = async ({ params: { id } }: Props) => {
  const noticeDetails = await getNoticeDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="공지사항" />

      <section className="mb-[105px]">
        <SubTitle text="공지사항" className="mt-[30px] mb-[58px]" />
      </section>

      <NoticeDetailsContent noticeDetails={noticeDetails} />
    </div>
  );
};

export default NoticeDetails;
